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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

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

    const dup = findDuplicate_(data);
    if (dup) {
      return json_({
        ok: false,
        code: 'DUPLICATE',
        message:
          dup +
          ' is already registered for ' +
          cfg.tab +
          '. Each person can register only once for this game.',
      });
    }

    const sheet = getSheet_(cfg, data.members.length);
    const code = nextCode_(sheet, cfg);
    appendRow_(sheet, cfg, data, code);

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
 * A person may register once per event. Scoped to this event's tab, so the
 * same person is still free to sign up for a different game.
 * Returns the offending member's name, or null when the team is clear.
 */
function findDuplicate_(data) {
  const cfg = EVENT_TABS[data.eventSlug];
  const sheet = getSheet_(cfg, data.members.length);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const slots = cfg.memberSlots;
  const rows = sheet
    .getRange(2, 1, lastRow - 1, FIXED_COLUMNS + slots * COLUMNS_PER_MEMBER)
    .getValues();

  for (const row of rows) {
    for (let i = 0; i < slots; i++) {
      const base = FIXED_COLUMNS + i * COLUMNS_PER_MEMBER;
      const phone = str_(row[base + 1]);
      const email = str_(row[base + 2]).toLowerCase();
      for (const m of data.members) {
        if (m.phone && m.phone === phone) return m.name;
        if (m.email && m.email === email) return m.name;
      }
    }
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Sheet access
 * ------------------------------------------------------------------ */

function getSheet_(cfg, slots) {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(cfg.tab);
  if (!sheet) sheet = ss.insertSheet(cfg.tab);

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

function nextCode_(sheet, cfg) {
  const seq = sheet.getLastRow();
  const tag = cfg.codeTag ? cfg.codeTag + '-' : '';
  return 'ASTRA2K26-' + tag + String(seq).padStart(3, '0');
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function str_(v) {
  return v == null ? '' : String(v).trim();
}

function json_(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}
