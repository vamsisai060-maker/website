/**
 * ASTRA 2K26 — Registration -> Google Sheets (one spreadsheet, one TAB per game)
 *
 * Receives a team registration via HTTP POST and writes it to the tab for that
 * event inside a single spreadsheet. Tabs are created automatically (with
 * headers) on first registration for each event.
 *
 * Setup:
 *  1. Open the Apps Script project, paste this file as Code.gs, save.
 *  2. If SPREADSHEET_ID below is empty, this script must be bound to the
 *     spreadsheet (Extensions > Apps Script inside the sheet).
 *  3. Deploy -> New deployment -> Web app:
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Copy the /exec URL into the website env:
 *       NEXT_PUBLIC_GSHEET_WEB_APP_URL="https://script.google.com/macros/s/.../exec"
 *
 * Redeploy (New deployment) every time you change this code.
 */

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

// --- helpers --------------------------------------------------------------

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