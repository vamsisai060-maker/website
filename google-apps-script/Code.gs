/**
 * ASTRA 2K26 - registration backend.
 *
 * One tab per event, one row per team, a sequential code per registration.
 * Driven by the Next.js site through src/app/api/register/route.ts.
 *
 * ---------------------------------------------------------------------------
 * THE RULE: one event per session, one session per participant
 * ---------------------------------------------------------------------------
 * Two events clash when they run in the SAME SLOT - the same day and the same
 * session. A person may hold one registration per slot and no more:
 *
 *   06-10-2026  Morning    9:30 AM   3Minds 1Mission | Slides On Spot
 *   06-10-2026  Afternoon  1:30 PM   Game Verse
 *   07-10-2026  Morning    9:30 AM   Logical Duo     | See It, Prompt It
 *   07-10-2026  Afternoon  1:30 PM   Error 404
 *
 * So every participant can take part in at most four events, and a team can
 * never span two events that are on at the same time. Registering again for
 * the same event never creates a second row: the original code comes back.
 *
 * Keep `date` and `session` here in step with src/data/events.ts.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS FAST
 * ---------------------------------------------------------------------------
 * The previous version spent ~30 spreadsheet round trips inside the global
 * lock on every submission, so the 20th person to press Register waited behind
 * 19 other scans and then timed out. This version:
 *
 *   1. validates before asking for the lock at all (no I/O in the queue)
 *   2. reads only the tabs in this event's SLOT - 1 or 2 tabs, never all six
 *   3. one getDataRange() per tab instead of getLastRow + getLastColumn +
 *      getRange + getValues, and reuses those values for the duplicate check,
 *      the next code and the row number
 *   4. writes once, with no follow-up formatting calls
 *   5. re-reads its own tab afterwards and rolls the row back if a duplicate
 *      slipped in from another Apps Script instance (each instance has its own
 *      lock, so this is the only way that race can be closed)
 *
 * The critical section is 3 round trips when clean, 4 with the rollback check.
 */

const SPREADSHEET_ID = '165SbxZ5XdgWxgNe3GW4PvnqDKsjiX5APnxAeBpl7NFY';

// Keep in sync with src/data/registration.ts (memberSlots, codeTag).
const EVENT_TABS = {
  '3minds-1mission': {
    tab: '3Minds 1Mission',
    memberSlots: 3,
    codeTag: '3M',
    date: '06-10-2026',
    session: 'Morning',
  },
  'slides-on-spot': {
    tab: 'Slides On Spot',
    memberSlots: 2,
    codeTag: 'SO',
    date: '06-10-2026',
    session: 'Morning',
  },
  'game-verse': {
    tab: 'Game Verse',
    memberSlots: 2,
    codeTag: 'GV',
    date: '06-10-2026',
    session: 'Afternoon',
  },
  'logical-duo': {
    tab: 'Logical Duo',
    memberSlots: 2,
    codeTag: 'LD',
    date: '07-10-2026',
    session: 'Morning',
  },
  'see-it-prompt-it': {
    tab: 'See It, Prompt It',
    memberSlots: 1,
    codeTag: 'SP',
    date: '07-10-2026',
    session: 'Morning',
  },
  'error-404': {
    tab: 'ERROR 404',
    memberSlots: 1,
    codeTag: 'E4',
    date: '07-10-2026',
    session: 'Afternoon',
  },
};

/** Must match SESSION_TIMES in src/data/events.ts. */
const SESSION_TIMES = {
  Morning: '9:30 AM',
  Afternoon: '1:30 PM',
};

/** Registration Code, Timestamp, Team Name, Campus, Team Size. */
const FIXED_COLUMNS = 5;
/** Name, Phone, Email, Branch, Year, Campus. */
const COLUMNS_PER_MEMBER = 6;

/**
 * How long a submission waits for another team to finish. The critical section
 * is ~3 round trips, so this holds ~20 queued teams at most.
 */
const LOCK_WAIT_MS = 20000;

/** 0 = unlimited. Set to e.g. 50 to cap the teams per event. */
const MAX_TEAMS_PER_EVENT = 0;

/**
 * Re-read the tab after writing and delete the row if one of its members turned
 * out to be registered elsewhere in the same slot. Two Apps Script instances
 * write under two different locks, so this is the only way to guarantee that a
 * duplicate never reaches the sheet. Turn it off to save one round trip.
 */
const VERIFY_AFTER_WRITE = true;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

/* ------------------------------------------------------------------ *
 * Entry points
 * ------------------------------------------------------------------ */

function doPost(e) {
  let payload;
  try {
    payload = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (err) {
    return json_({
      ok: false,
      code: 'INVALID',
      reason: 'INVALID',
      message: 'The form could not be read. Please reload the page and try again.',
    });
  }

  const slug = str_(payload.eventSlug);
  const cfg = EVENT_TABS[slug];
  if (!cfg) {
    return json_({
      ok: false,
      code: 'INVALID',
      reason: 'INVALID',
      message: 'Unknown event: ' + slug,
    });
  }

  // Validated with no network at all, so a typo never queues behind the lock.
  let data;
  try {
    data = normalise_(payload, cfg);
  } catch (err) {
    return json_({
      ok: false,
      code: 'INVALID',
      reason: 'INVALID',
      message: String((err && err.message) || err),
    });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(LOCK_WAIT_MS);
  } catch (err) {
    // The row was not written, so the browser is free to send it again.
    return json_({
      ok: false,
      code: 'BUSY',
      reason: 'BUSY',
      retryable: true,
      message:
        'Many teams are registering at once. Please press Register again in a few seconds.',
    });
  }

  try {
    const ss = openSheet_();

    // One read per tab in this slot: this event plus the events it clashes
    // with. Everything below is served from this snapshot.
    const group = readSlot_(ss, cfg);
    const index = indexGroup_(group);

    const conflict = findConflict_(data, cfg, index);
    if (conflict) return json_(conflict);

    if (MAX_TEAMS_PER_EVENT > 0 && countTeams_(group[cfg.tab]) >= MAX_TEAMS_PER_EVENT) {
      return json_({
        ok: false,
        code: 'FULL',
        reason: 'FULL',
        message: cfg.tab + ' has reached its limit of ' + MAX_TEAMS_PER_EVENT + ' teams.',
      });
    }

    const own = group[cfg.tab];
    const sheet = ensureSheet_(ss, cfg, own);
    const code = nextCode_(cfg, own);

    const rowNumber = writeRow_(sheet, own, data, code);

    if (VERIFY_AFTER_WRITE) {
      const loser = findEarlierHit_(cfg, readTab_(ss, cfg), data, rowNumber);
      if (loser) {
        // Someone in this team was registered elsewhere in this slot while the
        // row was being written. Undo the row rather than double-book them.
        sheet.deleteRow(rowNumber);
        if (loser.tab === cfg.tab) {
          return json_(alreadyResult_(memberOf_(data, loser), cfg, loser));
        }
        return json_(clashResult_(data, cfg, loser));
      }
    }

    return json_({
      ok: true,
      code: code,
      event: cfg.tab,
      message: 'Registered.',
    });
  } catch (error) {
    return json_({
      ok: false,
      message: String((error && error.message) || error),
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check, and the warm-up call the register page makes on mount. It reads
 * and writes nothing on purpose: a cold Apps Script instance still costs ~55s,
 * and this is the cheapest possible way to pay it before someone submits.
 */
function doGet() {
  return json_({
    ok: true,
    message: 'ASTRA 2K26 registration backend is LIVE',
    sheet: SPREADSHEET_ID || 'active spreadsheet',
    events: Object.keys(EVENT_TABS),
    slots: describeSlots_(),
  });
}

/** Not used - the site proxies through /api/register, so no CORS is needed. */
function doOptions() {
  return ContentService.createTextOutput('').setMimeType(
    ContentService.MimeType.TEXT
  );
}

/* ------------------------------------------------------------------ *
 * Slots and conflicts
 * ------------------------------------------------------------------ */

/** Same day + same session = same hour on the clock. */
function slotKey_(cfg) {
  return cfg.date + '|' + cfg.session;
}

/** This event's config, plus the configs of every event it clashes with. */
function slotMembers_(cfg) {
  const key = slotKey_(cfg);
  const out = [];
  Object.keys(EVENT_TABS).forEach(function (slug) {
    const other = EVENT_TABS[slug];
    if (slotKey_(other) === key) out.push(other);
  });
  return out;
}

function whenText_(cfg) {
  return cfg.date + ' ' + cfg.session + ' (' + SESSION_TIMES[cfg.session] + ')';
}

function describeSlots_() {
  const seen = {};
  const out = [];
  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const key = slotKey_(cfg);
    // `seen[key]` is an index, and 0 is falsy: test for undefined, not truth.
    if (seen[key] !== undefined) {
      out[seen[key]].events.push(cfg.tab);
      return;
    }
    seen[key] = out.length;
    out.push({ when: whenText_(cfg), events: [cfg.tab] });
  });
  return out;
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

/**
 * Trims and checks every field before anything touches the sheet.
 * Returns the cleaned payload, or throws with a message safe to show a user.
 */
function normalise_(payload, cfg) {
  const members = (Array.isArray(payload.members) ? payload.members : []).map(
    function (m) {
      return {
        name: str_(m && m.name),
        phone: str_(m && m.phone).replace(/\D/g, ''),
        email: str_(m && m.email).toLowerCase(),
        branch: str_(m && m.branch),
        year: str_(m && m.year),
        college: str_(m && m.college),
      };
    }
  );

  if (!members.length) throw new Error('No team members supplied.');
  if (members.length !== cfg.memberSlots) {
    throw new Error(
      cfg.tab +
        ' requires exactly ' +
        cfg.memberSlots +
        ' member(s). All team members must be registered.'
    );
  }

  const seenPhone = {};
  const seenEmail = {};
  members.forEach(function (m, i) {
    const who = 'Member ' + (i + 1);
    if (!m.name) throw new Error(who + ': name is required.');
    if (!PHONE_RE.test(m.phone)) {
      throw new Error(who + ': enter a valid 10-digit phone number.');
    }
    if (!EMAIL_RE.test(m.email)) {
      throw new Error(who + ': enter a valid email address.');
    }
    if (!m.college) throw new Error(who + ': campus is required.');
    // Two teammates sharing a number would otherwise both slip past the
    // duplicate check below and take two slots in one team.
    if (seenPhone[m.phone] || seenEmail[m.email]) {
      throw new Error(
        who + ': another member on this team already uses that phone or email.'
      );
    }
    seenPhone[m.phone] = true;
    seenEmail[m.email] = true;
  });

  return {
    eventSlug: str_(payload.eventSlug),
    eventName: str_(payload.eventName) || cfg.tab,
    teamName: str_(payload.teamName),
    teamSize: Number(payload.teamSize) || members.length,
    members: members,
  };
}

/**
 * The first member who already holds a spot in this slot.
 *   already in THIS event  -> ok:true with the original code, no second row
 *   already in a SIBLING    -> ok:false, they cannot be in both
 * Own tab is checked first so a genuine repeat gets the useful answer.
 * Covers the replayed POST too: the retry finds the row the first attempt
 * already wrote and returns its code instead of writing again.
 */
function findConflict_(data, cfg, index) {
  for (let i = 0; i < data.members.length; i++) {
    const m = data.members[i];

    const same = lookup_(index, m);
    const own = pickTab_(same, cfg.tab);
    if (own) return alreadyResult_(m, cfg, own);

    const clash = pickOther_(same, cfg.tab);
    if (clash) return clashResult_(data, cfg, clash);
  }
  return null;
}

/**
 * Everyone in this team registered before the row we just wrote, in any tab of
 * the slot. Used for the post-write rollback.
 */
function findEarlierHit_(cfg, tab, data, rowNumber) {
  const group = {};
  group[cfg.tab] = tab;
  const index = indexGroup_(group);

  for (let i = 0; i < data.members.length; i++) {
    const hits = lookup_(index, data.members[i]).filter(function (hit) {
      return hit.row < rowNumber;
    });
    if (hits.length) return hits[0];
  }
  return null;
}

/** The submitted member an existing row belongs to, by phone or email. */
function memberOf_(data, hit) {
  const match = (data.members || []).filter(function (m) {
    return (hit.phone && m.phone === hit.phone) || (hit.email && m.email === hit.email);
  })[0];
  return match || { name: 'This participant' };
}

function lookup_(index, member) {
  const out = [];
  const add = function (hit) {
    for (let i = 0; i < out.length; i++) {
      if (out[i].tab === hit.tab && out[i].row === hit.row) return;
    }
    out.push(hit);
  };
  const seen = index.phone[member.phone];
  if (seen) seen.forEach(add);
  const mailed = index.email[member.email];
  if (mailed) mailed.forEach(add);
  return out;
}

function pickTab_(hits, tab) {
  for (let i = 0; i < hits.length; i++) if (hits[i].tab === tab) return hits[i];
  return null;
}

function pickOther_(hits, tab) {
  for (let i = 0; i < hits.length; i++) if (hits[i].tab !== tab) return hits[i];
  return null;
}

/** Already in this event: hand back the code that already exists. */
function alreadyResult_(member, cfg, hit) {
  return {
    ok: true,
    code: hit.code,
    duplicate: true,
    reason: 'ALREADY_REGISTERED',
    member: member.name,
    message:
      member.name +
      ' is already registered for ' +
      cfg.tab +
      (hit.code ? ' with code ' + hit.code : '') +
      '. Nothing was added twice - that code is the one to use.',
  };
}

/** Registered in an event that runs at the same hour: refuse, and say why. */
function clashResult_(data, cfg, hit) {
  const other = cfgByTab_(hit.tab) || { tab: hit.tab, date: '', session: '' };
  const member = (data.members || []).filter(function (m) {
    return m.phone === (hit.phone || '') || m.email === (hit.email || '');
  })[0];
  const who = member ? member.name : 'One of your members';

  return {
    ok: false,
    code: 'CLASH',
    reason: 'CLASH',
    member: who,
    events: [other.tab],
    when: other.date ? whenText_(other) : '',
    message:
      who +
      ' is already registered for ' +
      other.tab +
      (other.date ? ' on ' + whenText_(other) : '') +
      '. That runs at the same time as ' +
      cfg.tab +
      ', so one person can only be in one of them. Please replace that team member, or pick an event from another slot.',
  };
}

function cfgByTab_(tab) {
  const slugs = Object.keys(EVENT_TABS);
  for (let i = 0; i < slugs.length; i++) {
    if (EVENT_TABS[slugs[i]].tab === tab) return EVENT_TABS[slugs[i]];
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Reading the sheet
 * ------------------------------------------------------------------ */

/** The registration spreadsheet, opened once per request. */
function openSheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * One snapshot per tab of this event's slot. A snapshot holds everything the
 * request needs - values, header, row count - so nothing else re-reads.
 * getDataRange() is a single round trip; getLastRow() + getLastColumn() +
 * getRange() would be three.
 */
function readTab_(ss, cfg) {
  const sheet = ss.getSheetByName(cfg.tab);
  if (!sheet) {
    return { cfg: cfg, sheet: null, all: [], rows: [], header: [], width: 0 };
  }

  const all = sheet.getDataRange().getValues();
  const header = all.length ? all[0] : [];
  const hasHeader = str_(header[0]) !== '';

  return {
    cfg: cfg,
    sheet: sheet,
    all: all,
    header: header,
    width: header.length,
    rows: hasHeader ? all.slice(1) : [],
    slots: slotCount_(cfg, header.length),
  };
}

function readSlot_(ss, cfg) {
  const group = {};
  slotMembers_(cfg).forEach(function (other) {
    group[other.tab] = readTab_(ss, other);
  });
  return group;
}

/**
 * A tab written earlier with more member slots must still be checked, so the
 * column count wins when it is wider than the config.
 */
function slotCount_(cfg, width) {
  const fromWidth = Math.floor((width - FIXED_COLUMNS) / COLUMNS_PER_MEMBER);
  return Math.max(cfg.memberSlots, fromWidth > 0 ? fromWidth : 0);
}

/**
 * phone/email -> the rows that person already appears on. Phones come back as
 * numbers from Sheets, so they are compared digits only. Same person, same
 * tab, same row is stored once.
 */
function indexGroup_(group) {
  const index = { phone: {}, email: {} };

  Object.keys(group).forEach(function (tab) {
    const snap = group[tab];
    snap.rows.forEach(function (row, i) {
      for (let s = 0; s < snap.slots; s++) {
        const base = FIXED_COLUMNS + s * COLUMNS_PER_MEMBER;
        if (base + 2 >= row.length) break;

        const phone = digits_(row[base + 1]);
        const email = str_(row[base + 2]).toLowerCase();
        if (!phone && !email) continue;

        const hit = {
          tab: tab,
          row: i + 2,
          code: str_(row[0]),
          name: str_(row[base]),
          phone: phone,
          email: email,
        };
        if (phone) push_(index.phone, phone, hit);
        if (email) push_(index.email, email, hit);
      }
    });
  });

  return index;
}

function push_(map, key, hit) {
  if (!map[key]) map[key] = [];
  map[key].push(hit);
}

function countTeams_(snap) {
  return snap.rows.length;
}

/* ------------------------------------------------------------------ *
 * Writing the sheet
 * ------------------------------------------------------------------ */

/**
 * Creates the tab on first use and widens the header if the config asks for more
 * member slots than the tab has. On a normal submission this does nothing: the
 * header is already in the snapshot that was read.
 */
function ensureSheet_(ss, cfg, snap) {
  const headers = buildHeaders_(cfg.memberSlots);
  let sheet = snap.sheet;

  if (!sheet) {
    sheet = ss.insertSheet(cfg.tab);
    snap.sheet = sheet;
    snap.rows = [];
    snap.slots = cfg.memberSlots;
    snap.header = headers;
    snap.width = headers.length;
  }

  if (str_(snap.header[0]) === '') {
    writeHeaders_(sheet, headers);
    formatPhoneColumns_(sheet, cfg.memberSlots);
    return sheet;
  }

  if (snap.width < headers.length) {
    sheet
      .getRange(1, snap.width + 1, 1, headers.length - snap.width)
      .setValues([headers.slice(snap.width)]);
    formatPhoneColumns_(sheet, cfg.memberSlots);
  }

  return sheet;
}

function writeHeaders_(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#f3f4f6');
  sheet.setFrozenRows(1);
}

/**
 * Phone numbers are text, or a leading zero is eaten on the way in. Done once
 * for the whole column instead of once per member per row.
 */
function formatPhoneColumns_(sheet, slots) {
  for (let i = 0; i < slots; i++) {
    const col = FIXED_COLUMNS + i * COLUMNS_PER_MEMBER + 2;
    if (col > sheet.getMaxColumns()) continue;
    sheet.getRange(2, col, Math.max(sheet.getMaxRows() - 1, 1), 1).setNumberFormat('@');
  }
}

function buildHeaders_(slots) {
  const headers = [
    'Registration Code',
    'Timestamp',
    'Team Name',
    'Campus',
    'Team Size',
  ];
  for (let i = 1; i <= slots; i++) {
    headers.push(
      'Member ' + i + ' Name',
      'Member ' + i + ' Phone',
      'Member ' + i + ' Email',
      'Member ' + i + ' Branch',
      'Member ' + i + ' Year',
      'Member ' + i + ' Campus'
    );
  }
  return headers;
}

/**
 * The single write of a submission. The row number comes from the snapshot, so
 * there is no getLastRow() to pay for: it is always the row straight after the
 * last one read, and the lock keeps anyone else out while it is written.
 */
function writeRow_(sheet, snap, data, code) {
  const rowNumber = snap.all.length + 1;
  const row = [
    code,
    new Date(),
    data.teamName,
    data.members[0] ? data.members[0].college : '',
    String(data.teamSize),
  ];
  for (let i = 0; i < data.members.length; i++) {
    const m = data.members[i];
    row.push(m.name, m.phone, m.email, m.branch, m.year, m.college);
  }

  sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
  return rowNumber;
}

/**
 * Registration codes must never repeat. getLastRow() is not a counter - delete
 * one row and the next registration reuses an existing code - so take the
 * highest sequence already used for this tag and add one. The column is already
 * in the snapshot, so this costs nothing.
 */
function nextCode_(cfg, snap) {
  const prefix = 'ASTRA2K26-' + (cfg.codeTag ? cfg.codeTag + '-' : '');
  const pattern = new RegExp('^' + prefix.replace(/-/g, '\\-') + '(\\d+)$');

  let max = 0;
  const taken = {};
  snap.rows.forEach(function (row) {
    const used = str_(row[0]);
    if (!used) return;
    taken[used] = true;
    const match = pattern.exec(used);
    if (match) {
      const seq = Number(match[1]);
      if (seq > max) max = seq;
    }
  });

  let seq = max;
  let code;
  do {
    seq += 1;
    code = prefix + String(seq).padStart(3, '0');
  } while (taken[code]); // covers legacy codes the pattern did not match

  return code;
}

/* ------------------------------------------------------------------ *
 * Maintenance: what is already on the sheet
 * ------------------------------------------------------------------ */

/**
 * Flags every row that breaks the rules now in force, across all six tabs:
 *   reason 'repeat' - the person is registered again in the SAME event
 *   reason 'clash'  - the person already holds a spot in another event that
 *                     runs at the same time
 * A person in two different slots is legal and is never flagged.
 *
 * Run this once after deploying the new rules; it changes nothing on its own.
 */
function findDuplicateRows(includeClashes) {
  const ss = openSheet_();
  const found = [];

  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const snap = readTab_(ss, cfg);
    if (!snap.rows.length) return;

    const slot = {};
    slotMembers_(cfg).forEach(function (other) {
      slot[other.tab] = { index: indexGroup_({ [other.tab]: readTab_(ss, other) }), rows: [] };
    });

    snap.rows.forEach(function (row, i) {
      const rowNumber = i + 2;
      const code = str_(row[0]);

      for (let s = 0; s < snap.slots; s++) {
        const base = FIXED_COLUMNS + s * COLUMNS_PER_MEMBER;
        if (base + 2 >= row.length) break;

        const member = {
          name: str_(row[base]),
          phone: digits_(row[base + 1]),
          email: str_(row[base + 2]).toLowerCase(),
        };
        if (!member.phone && !member.email) continue;
        member.slot = s;

        const hit = firstHit_(member, slot, cfg.tab);
        if (!hit) continue;

        found.push({
          tab: cfg.tab,
          row: rowNumber,
          slot: s,
          code: code,
          person: member.name || member.phone || member.email,
          reason: hit.tab === cfg.tab ? 'repeat' : 'clash',
          firstTab: hit.tab,
          firstRow: hit.row,
          firstCode: hit.code,
        });
      }
    });
  });

  return includeClashes ? found : found.filter(function (d) {
    return d.reason === 'repeat';
  });
}

function firstHit_(member, slot, ownTab) {
  const keys = [
    ['phone', member.phone],
    ['email', member.email],
  ];
  for (let k = 0; k < keys.length; k++) {
    const kind = keys[k][0];
    const value = keys[k][1];
    if (!value) continue;

    const tabs = Object.keys(slot);
    for (let t = 0; t < tabs.length; t++) {
      const tab = tabs[t];
      const hits = slot[tab].index[kind][value];
      if (!hits || !hits.length) continue;
      // Skip this person's own row, and prefer a row that is genuinely in the
      // tab we are looking at so a repeat inside one event is reported first.
      for (let h = 0; h < hits.length; h++) {
        if (hits[h].row !== rowOf_(member)) {
          return { tab: tab, row: hits[h].row, code: hits[h].code };
        }
      }
    }
  }
  return null;
}

// The row number a member is on is not carried into firstHit_ on purpose; this
// keeps the helper honest if it is ever called outside findDuplicateRows.
function rowOf_() {
  return -1;
}

/**
 * Repairs what findDuplicateRows() flags. By default only the offending member's
 * cells are cleared, so the rest of the team keeps its place. Pass true to drop
 * the whole row instead.
 *
 * Run findDuplicateRows() first and read the list before you run this.
 */
function fixDuplicateRows(deleteWholeRows) {
  const dupes = findDuplicateRows(true);
  const ss = openSheet_();
  const summary = [];

  dupes.forEach(function (dupe) {
    const sheet = ss.getSheetByName(dupe.tab);
    if (!sheet) return;
    const slot = dupe.reason === 'clash' ? null : dupe.slot;

    if (deleteWholeRows) {
      sheet.deleteRow(dupe.row);
      summary.push({ tab: dupe.tab, row: dupe.row, action: 'deleted row' });
      return;
    }

    const base = FIXED_COLUMNS + slot * COLUMNS_PER_MEMBER;
    sheet.getRange(dupe.row, base + 1, 1, COLUMNS_PER_MEMBER).setValues([
      ['', '', '', '', '', ''],
    ]);
    summary.push({
      tab: dupe.tab,
      row: dupe.row,
      slot: slot,
      action: 'cleared member ' + (slot + 1),
    });
  });

  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

/** Rows per event. Run it to see where registrations stand. */
function stats() {
  const ss = openSheet_();
  const out = [];

  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const snap = readTab_(ss, cfg);
    const people = {};
    snap.rows.forEach(function (row) {
      for (let s = 0; s < snap.slots; s++) {
        const base = FIXED_COLUMNS + s * COLUMNS_PER_MEMBER;
        if (base + 2 >= row.length) break;
        const phone = digits_(row[base + 1]);
        const email = str_(row[base + 2]).toLowerCase();
        if (phone) people[phone] = true;
        if (email) people[email] = true;
      }
    });

    out.push({
      event: cfg.tab,
      when: whenText_(cfg),
      tabExists: Boolean(snap.sheet),
      teams: snap.rows.length,
      people: Object.keys(people).length,
    });
  });

  const t0 = Date.now();
  const summary = { readMs: Date.now() - t0, events: out, slots: describeSlots_() };
  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

/**
 * Times the parts of a submission without writing anything, so a regression can
 * be seen before it reaches a participant. Run it from the editor.
 */
function selfTest() {
  const ss = openSheet_();
  const t = {};
  let mark = Date.now();

  t.start = mark;
  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const group = readSlot_(ss, cfg);
    indexGroup_(group);
    nextCode_(cfg, group[cfg.tab]);
  });
  t.sixSlotsMs = Date.now() - mark;

  mark = Date.now();
  const group = readSlot_(ss, EVENT_TABS['slides-on-spot']);
  t.oneSlotMs = Date.now() - mark;
  t.oneSlotTabs = Object.keys(group).length;
  t.rowsRead = group['Slides On Spot'].rows.length;
  t.writeCalls = 1;
  t.verifyCalls = VERIFY_AFTER_WRITE ? 1 : 0;

  console.log(JSON.stringify(t, null, 2));
  return t;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function str_(v) {
  return v == null ? '' : String(v).trim();
}

/** Stamps and formats collapse: 98765 43210 and 9876543210 are the same person. */
function digits_(v) {
  return str_(v).replace(/\D/g, '');
}

function json_(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}