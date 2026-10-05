/**
 * ASTRA 2K26 - registration backend.
 * One tab per event, one row per team. Returns a sequential team code.
 * Driven by the Next.js site through src/app/api/register/route.ts.
 */

const SPREADSHEET_ID = '16ZHMLHirNJig6qRrM2bZjpPEx3C7U_WCIqFSHK0c5jQ';

// Keep in sync with src/data/registration.ts (memberSlots, codeTag)
// and src/data/events.ts (slug, name).
const EVENT_TABS = {
  'game-verse': {
    tab: 'Game Verse',
    memberSlots: 2,
    codeTag: 'GV',
  },
  '3minds-1mission': {
    tab: '3Minds 1Mission',
    memberSlots: 3,
    codeTag: '3M',
  },
  'see-it-prompt-it': {
    tab: 'See It, Prompt It',
    memberSlots: 1,
    codeTag: 'SP',
  },
  'logical-duo': {
    tab: 'Logical Duo',
    memberSlots: 2,
    codeTag: 'LD',
  },
  'error-404': {
    tab: 'ERROR 404',
    memberSlots: 1,
    codeTag: 'E4',
  },
  'slides-on-spot': {
    tab: 'Slides On Spot',
    memberSlots: 2,
    codeTag: 'SO',
  },
};

const FIXED_COLUMNS = 5;
const COLUMNS_PER_MEMBER = 6;

/**
 * Every POST carries a requestId minted by the browser. The tab maps it to the
 * registration code it produced, so a replayed request (the /api/register retry
 * after an Apps Script cold start, or a double-tapped submit button) returns the
 * original code instead of writing a second row.
 */
const REQUEST_TAB = '_requests';
const REQUEST_COLUMNS = ['Request ID', 'Event', 'Registration Code', 'Created At'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;
const REQUEST_ID_RE = /^[A-Za-z0-9-]{8,64}$/;

/* ------------------------------------------------------------------ *
 * Entry points
 * ------------------------------------------------------------------ */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(
      (e && e.postData && e.postData.contents) || ''
    );
    const cfg = EVENT_TABS[payload.eventSlug];
    if (!cfg) throw new Error('Unknown event: ' + payload.eventSlug);

    const data = normalise_(payload, cfg);
    const requestId = normaliseRequestId_(payload.requestId);

    // Replay of a request that already wrote a row: hand back the same code.
    if (requestId) {
      const existing = lookupRequest_(requestId);
      if (existing) {
        return json_({
          ok: true,
          code: existing,
          duplicate: true,
          message: 'Already registered.',
        });
      }
    }

    // One game per person, across every event tab. The same spreadsheet handle
    // is reused for the write below, so the file is only opened once.
    const ss = openSheet_();
    const taken = findExistingRegistration_(data, ss);
    if (taken) {
      return json_({
        ok: false,
        code: 'DUPLICATE',
        games: taken.games,
        message:
          taken.name +
          ' is already registered for ' +
          listGames_(taken.games) +
          '. Each person can register for only one game.',
      });
    }

    const sheet = getSheet_(cfg, data.members.length, ss);
    const code = nextCode_(sheet, cfg);
    appendRow_(sheet, cfg, data, code);
    if (requestId) recordRequest_(requestId, cfg, code);

    return json_({ ok: true, code: code, message: 'Registered.' });
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
 * Dry run. Flags every row that breaks the one-game-per-person rule:
 *   reason 'repeat'     - the person is registered again in the same game
 *   reason 'other-game' - the person already holds a spot in a different game
 * Pass true to include the 'other-game' rows.
 */
function findDuplicateRows(includeOtherGames) {
  return duplicateRows_(includeOtherGames);
}

/**
 * Keeps the first registration of every person and deletes the later rows.
 * Only 'repeat' rows are removed unless includeOtherGames is true, which also
 * drops the person from the game where they are already registered elsewhere.
 * Run findDuplicateRows() first to see what it would remove.
 */
function removeDuplicateRows(includeOtherGames) {
  const dupes = duplicateRows_(includeOtherGames);
  // Delete bottom-up so earlier row numbers stay valid while we go.
  const byTab = {};
  dupes.forEach(function (d) {
    if (!byTab[d.tab]) byTab[d.tab] = [];
    byTab[d.tab].push(d);
  });

  const summary = [];
  Object.keys(byTab).forEach(function (tab) {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(tab);
    if (!sheet) return;
    const rows = byTab[tab]
      .map(function (d) {
        return d.row;
      })
      .sort(function (a, b) {
        return b - a;
      });
    for (let i = 0; i < rows.length; i++) sheet.deleteRow(rows[i]);
    summary.push({ tab: tab, deleted: rows.length, rows: rows });
  });

  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

/**
 * Walks every event tab in order and flags registrations that break the
 * one-game-per-person rule. For every person the earliest registration is the
 * keeper; anything after it is a violation:
 *   reason 'repeat'     - registered again in the game they were already in
 *   reason 'other-game' - the person already holds a spot in a different game
 * Pass true to include the 'other-game' rows.
 */
function duplicateRows_(includeOtherGames) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const found = [];
  const seen = {};

  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const sheet = ss.getSheetByName(cfg.tab);
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const lastCol = sheet.getLastColumn();
    const slots = Math.max(
      cfg.memberSlots,
      Math.floor((lastCol - FIXED_COLUMNS) / COLUMNS_PER_MEMBER)
    );
    const rows = sheet
      .getRange(2, 1, lastRow - 1, lastCol)
      .getValues();

    rows.forEach(function (row, index) {
      const rowNumber = index + 2;
      const code = str_(row[0]);
      const rowKeys = [];
      let flagged = null;

      for (let i = 0; i < slots && !flagged; i++) {
        const base = FIXED_COLUMNS + i * COLUMNS_PER_MEMBER;
        if (base + 2 >= lastCol) break;
        const name = str_(row[base]);
        const phone = digits_(row[base + 1]);
        const email = str_(row[base + 2]).toLowerCase();
        if (!phone && !email) continue;

        const keys = [];
        if (phone) keys.push('p:' + phone);
        if (email) keys.push('e:' + email);

        for (let k = 0; k < keys.length; k++) {
          const key = keys[k];
          const rec = seen[key];

          if (!rec) {
            rowKeys.push(key);
            continue;
          }

          const inThisTab = rec.byTab[cfg.tab];
          flagged = {
            tab: cfg.tab,
            row: rowNumber,
            code: code,
            person: name || phone || email,
            reason: inThisTab ? 'repeat' : 'other-game',
            firstSeenTab: inThisTab ? cfg.tab : rec.firstTab,
            firstSeenRow: inThisTab ? inThisTab.row : rec.firstRow,
            firstSeenCode: inThisTab ? inThisTab.code : rec.firstCode,
            key: key,
          };
          break;
        }
      }

      if (!flagged) {
        remember_(seen, rowKeys, cfg, rowNumber, code);
        return;
      }

      // The clashing member is remembered too, so the next row that repeats
      // this person is reported as a repeat here rather than a fresh clash.
      remember_(seen, rowKeys.concat([flagged.key]), cfg, rowNumber, code);

      if (flagged.reason === 'repeat' || includeOtherGames) found.push(flagged);
    });
  });

  return found;
}

/** Records the first row each key was seen on, per tab. */
function remember_(seen, keys, cfg, rowNumber, code) {
  keys.forEach(function (key) {
    let rec = seen[key];
    if (!rec) {
      rec = { firstTab: cfg.tab, firstRow: rowNumber, firstCode: code, byTab: {} };
      seen[key] = rec;
    }
    if (!rec.byTab[cfg.tab]) rec.byTab[cfg.tab] = { row: rowNumber, code: code };
  });
}

/** Health check, so the URL can be confirmed before it is wired up. */
function doGet() {
  return json_({
    ok: true,
    message: 'ASTRA 2K26 registration backend is LIVE',
    sheet: SPREADSHEET_ID || 'active spreadsheet',
    events: Object.keys(EVENT_TABS),
    columns: FIXED_COLUMNS + 3 * COLUMNS_PER_MEMBER,
  });
}

/** Not used - the site proxies through /api/register, so no CORS is needed. */
function doOptions() {
  return ContentService.createTextOutput('').setMimeType(
    ContentService.MimeType.TEXT
  );
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
    (m) => ({
      name: str_(m && m.name),
      phone: str_(m && m.phone).replace(/\D/g, ''),
      email: str_(m && m.email).toLowerCase(),
      branch: str_(m && m.branch),
      year: str_(m && m.year),
      college: str_(m && m.college),
    })
  );

  if (!members.length) throw new Error('No team members supplied.');
  if (members.length !== cfg.memberSlots) {
    throw new Error(
      cfg.tab + ' requires exactly ' + cfg.memberSlots + ' member(s). All team members must be registered.'
    );
  }

  const seenPhone = {};
  const seenEmail = {};
  members.forEach((m, i) => {
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
    eventSlug: payload.eventSlug,
    eventName: str_(payload.eventName) || cfg.tab,
    teamName: str_(payload.teamName),
    teamSize: Number(payload.teamSize) || members.length,
    members: members,
  };
}

/**
 * A person may register for exactly one game, so every event tab is scanned -
 * not just this event's. Holds good across sessions too: a morning slot does
 * not free up an afternoon one.
 * Returns { name, games: ['Game Verse', ...] } for the first member who already
 * holds a spot anywhere, or null when the whole team is clear.
 */
function findExistingRegistration_(data, ss) {
  const taken = indexRegisteredPeople_(ss || openSheet_());
  for (const m of data.members) {
    const games = [];
    if (m.phone && taken.phone[m.phone]) {
      taken.phone[m.phone].forEach(function (t) {
        if (games.indexOf(t) === -1) games.push(t);
      });
    }
    if (m.email && taken.email[m.email]) {
      taken.email[m.email].forEach(function (t) {
        if (games.indexOf(t) === -1) games.push(t);
      });
    }
    if (games.length) return { name: m.name, games: games };
  }
  return null;
}

/**
 * phone/email -> the event tabs that person already appears in. Phones come back
 * as numbers from Sheets, so they are compared digits only.
 */
function indexRegisteredPeople_(ss) {
  const index = { phone: {}, email: {} };

  Object.keys(EVENT_TABS).forEach(function (slug) {
    const cfg = EVENT_TABS[slug];
    const sheet = ss.getSheetByName(cfg.tab);
    if (!sheet) return;

    // One call per tab, not getLastRow + getLastColumn + getRange: Apps Script
    // charges a network round trip for each, and the scan is on the critical
    // path of every submission.
    const all = sheet.getDataRange().getValues();
    if (all.length < 2) return;

    // Skip the header row and read every column the tab actually has: a tab
    // written with more member slots than the current config must still be
    // checked.
    const rows = all.slice(1);
    const lastCol = all[0].length;
    const slots = Math.max(
      cfg.memberSlots,
      Math.floor((lastCol - FIXED_COLUMNS) / COLUMNS_PER_MEMBER)
    );

    rows.forEach(function (row) {
      for (let i = 0; i < slots; i++) {
        const base = FIXED_COLUMNS + i * COLUMNS_PER_MEMBER;
        if (base + 2 >= lastCol) break;
        const phone = digits_(row[base + 1]);
        const email = str_(row[base + 2]).toLowerCase();
        if (phone && !index.phone[phone]) index.phone[phone] = [cfg.tab];
        else if (phone) index.phone[phone].push(cfg.tab);
        if (email && !index.email[email]) index.email[email] = [cfg.tab];
        else if (email) index.email[email].push(cfg.tab);
      }
    });
  });

  return index;
}

/** "Game Verse" / "Game Verse and Slides On Spot" */
function listGames_(games) {
  if (!games.length) return '';
  if (games.length === 1) return games[0];
  if (games.length === 2) return games[0] + ' and ' + games[1];
  return games.slice(0, -1).join(', ') + ' and ' + games[games.length - 1];
}

/* ------------------------------------------------------------------ *
 * Sheet access
 * ------------------------------------------------------------------ */

/** The registration spreadsheet, opened once per request. */
function openSheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_(cfg, slots, ss) {
  const book = ss || openSheet_();

  let sheet = book.getSheetByName(cfg.tab);
  if (!sheet) sheet = book.insertSheet(cfg.tab);

  ensureHeaders_(sheet, cfg, cfg.memberSlots);
  return sheet;
}

/**
 * Adds any missing headers without touching what is already there, so a tab
 * created earlier with fewer member slots widens itself instead of losing data.
 */
function ensureHeaders_(sheet, cfg, slots) {
  const headers = buildHeaders_(cfg.memberSlots);
  const width = headers.length;
  const hasHeaderRow = str_(sheet.getRange(1, 1).getValue()) !== '';

  if (!hasHeaderRow) {
    sheet.getRange(1, 1, 1, width).setValues([headers]);
    sheet.getRange(1, 1, 1, width).setFontWeight('bold');
    sheet.getRange(1, 1, 1, width).setBackground('#f3f4f6');
    sheet.setFrozenRows(1);
    return;
  }

  const lastCol = sheet.getLastColumn();
  if (lastCol < width) {
    sheet.getRange(1, lastCol + 1, 1, width - lastCol).setValues([
      headers.slice(lastCol),
    ]);
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

function appendRow_(sheet, cfg, data, code) {
  const rowNumber = sheet.getLastRow() + 1;
  const row = [
    code,
    new Date(),
    data.teamName,
    data.members[0] ? data.members[0].college : '',
    String(data.teamSize),
  ];
  for (const m of data.members) {
    row.push(m.name, m.phone, m.email, m.branch, m.year, m.college);
  }

  sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);

  // Store numbers as text so a leading zero survives.
  for (let i = 0; i < data.members.length; i++) {
    sheet
      .getRange(rowNumber, FIXED_COLUMNS + i * COLUMNS_PER_MEMBER + 2)
      .setNumberFormat('@');
  }
}

/**
 * Registration codes must never repeat. getLastRow() is not a counter - delete
 * one row and the next registration reuses an existing code - so take the
 * highest sequence already used for this tag and add one.
 */
function nextCode_(sheet, cfg) {
  const prefix = 'ASTRA2K26-' + (cfg.codeTag ? cfg.codeTag + '-' : '');
  const pattern = new RegExp('^' + prefix.replace(/-/g, '\\-') + '(\\d+)$');
  const lastRow = sheet.getLastRow();

  let max = 0;
  if (lastRow >= 2) {
    const codes = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (const row of codes) {
      const match = pattern.exec(str_(row[0]));
      if (match) {
        const seq = Number(match[1]);
        if (seq > max) max = seq;
      }
    }
  }

  const seq = max + 1;
  let code = prefix + String(seq).padStart(3, '0');
  // Belt and braces: never hand out a code that is already in the column.
  let bump = seq;
  while (codeExists_(sheet, code)) {
    bump += 1;
    code = prefix + String(bump).padStart(3, '0');
  }
  return code;
}

function codeExists_(sheet, code) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const codes = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (const row of codes) {
    if (str_(row[0]) === code) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Request log (idempotency)
 * ------------------------------------------------------------------ */

function normaliseRequestId_(value) {
  const id = str_(value);
  return REQUEST_ID_RE.test(id) ? id : '';
}

function getRequestSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(REQUEST_TAB);
  if (!sheet) sheet = ss.insertSheet(REQUEST_TAB);
  if (str_(sheet.getRange(1, 1).getValue()) !== REQUEST_COLUMNS[0]) {
    sheet.getRange(1, 1, 1, REQUEST_COLUMNS.length).setValues([REQUEST_COLUMNS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Returns the registration code this requestId already produced, or ''. */
function lookupRequest_(requestId) {
  const sheet = getRequestSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return '';

  // Columns A (Request ID) and C (Registration Code) - B is the event tab.
  const rows = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  for (const row of rows) {
    if (str_(row[0]) === requestId) return str_(row[2]);
  }
  return '';
}

function recordRequest_(requestId, cfg, code) {
  const sheet = getRequestSheet_();
  const rowNumber = sheet.getLastRow() + 1;
  sheet
    .getRange(rowNumber, 1, 1, REQUEST_COLUMNS.length)
    .setValues([[requestId, cfg.tab, code, new Date()]]);
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
