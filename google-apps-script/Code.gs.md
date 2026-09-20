const SPREADSHEET_ID = '16ZHMLHirNJig6qRrM2bZjpPEx3C7U_WCIqFSHK0c5jQ';

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
    memberSlots: 3,
    codeTag: 'SP',
  },
  'logical-duo': {
    tab: 'Logical Duo',
    memberSlots: 2,
    codeTag: 'LD',
  },
  'error-404': {
    tab: 'ERROR 404',
    memberSlots: 3,
    codeTag: 'ER',
  },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(e.postData.contents);
    const cfg = EVENT_TABS[payload.eventSlug];
    if (!cfg) throw new Error('Unknown event: ' + payload.eventSlug);

    const sheet = getSheet_(cfg);

    const duplicate = findDuplicate_(sheet, cfg, payload);
    if (duplicate) {
      return json_({ ok: false, code: 'DUPLICATE', message: duplicate });
    }

    const code = nextCode_(sheet, cfg);
    appendRow_(sheet, payload, code);

    return json_({ ok: true, code: code });
  } catch (error) {
    return json_({ ok: false, message: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(
    'ASTRA 2K26 registration backend is LIVE'
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doOptions() {
  return ContentService.createTextOutput('').setMimeType(
    ContentService.MimeType.TEXT
  );
}

function getSheet_(cfg) {
  let ss;
  if (SPREADSHEET_ID) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  let sheet = ss.getSheetByName(cfg.tab);
  if (!sheet) {
    sheet = ss.insertSheet(cfg.tab);
    const headers = buildHeaders_(cfg.memberSlots);
    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight('bold')
      .setBackground('#f3f4f6');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function buildHeaders_(memberSlots) {
  const headers = [
    'Registration Code',
    'Timestamp',
    'Team Name',
    'Campus',
    'Team Size',
  ];
  for (let i = 1; i <= memberSlots; i++) {
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

function nextCode_(sheet, cfg) {
  const seq = sheet.getLastRow();
  const tag = cfg.codeTag ? cfg.codeTag + '-' : '';
  return 'ASTRA2K26-' + tag + String(seq).padStart(3, '0');
}

function appendRow_(sheet, payload, code) {
  const rowNumber = sheet.getLastRow() + 1;
  const row = [
    code,
    new Date(),
    payload.teamName || '',
    payload.members[0]?.college || '',
    String(payload.teamSize ?? payload.members.length),
  ];
  for (let i = 0; i < payload.members.length; i++) {
    const member = payload.members[i] || {};
    row.push(
      member.name || '',
      String(member.phone || ''),
      member.email || '',
      member.branch || '',
      member.year || '',
      member.college || ''
    );
  }
  sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
  for (let i = 0; i < payload.members.length; i++) {
    const phoneCol = 5 + i * 6 + 2;
    sheet.getRange(rowNumber, phoneCol).setNumberFormat('@');
  }
}

function json_(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}

// --- duplicate / multiple-registration guard -----------------------------

function normalizePhone_(value) {
  return String(value || '').trim().replace(/\D/g, '');
}

function normalizeEmail_(value) {
  return String(value || '').trim().toLowerCase();
}

function findDuplicate_(sheet, cfg, payload) {
  const phoneCols = [];
  const emailCols = [];
  for (let i = 0; i < cfg.memberSlots; i++) {
    phoneCols.push(5 + i * 6 + 2);
    emailCols.push(5 + i * 6 + 3);
  }

  const existingPhones = new Set();
  const existingEmails = new Set();
  const last = sheet.getLastRow();
  if (last > 1) {
    const minCol = Math.min.apply(null, phoneCols.concat(emailCols));
    const maxCol = Math.max.apply(null, phoneCols.concat(emailCols));
    const values = sheet
      .getRange(2, minCol, last - 1, maxCol - minCol + 1)
      .getValues();
    values.forEach((row) => {
      phoneCols.forEach((c) => {
        const v = normalizePhone_(row[c - minCol]);
        if (v) existingPhones.add(v);
      });
      emailCols.forEach((c) => {
        const v = normalizeEmail_(row[c - minCol]);
        if (v) existingEmails.add(v);
      });
    });
  }

  const seenPhones = new Set();
  const seenEmails = new Set();
  const members = payload.members || [];
  for (let i = 0; i < members.length; i++) {
    const member = members[i] || {};
    const label = 'Member ' + (i + 1);
    const phone = normalizePhone_(member.phone);
    if (phone && (existingPhones.has(phone) || seenPhones.has(phone))) {
      return (
        'This phone number is already registered for ' +
        cfg.tab +
        ' (' +
        label +
        ': ' +
        phone +
        '). Each person can register only once per event.'
      );
    }
    seenPhones.add(phone);
    const email = normalizeEmail_(member.email);
    if (email && (existingEmails.has(email) || seenEmails.has(email))) {
      return (
        'This email address is already registered for ' +
        cfg.tab +
        ' (' +
        label +
        ': ' +
        email +
        '). Each person can register only once per event.'
      );
    }
    seenEmails.add(email);
  }
  return null;
}

// Run manually from the Apps Script editor (no redeploy needed).
// Deletes all data rows in every game tab, keeping the headers only.
function cleanTestData() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  let cleared = 0;
  Object.values(EVENT_TABS).forEach((cfg) => {
    const sheet = ss.getSheetByName(cfg.tab);
    if (!sheet) return;
    const last = sheet.getLastRow();
    if (last > 1) {
      sheet.getRange(2, 1, last - 1, sheet.getLastColumn()).deleteCells(
        SpreadsheetApp.Dimension.ROWS
      );
      cleared += last - 1;
    }
  });
  return 'Cleared rows: ' + cleared;
}