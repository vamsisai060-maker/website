/**
 * ASTRA 2K26 - registration backend.
 * Appends one row per team to a Google Sheet and returns a team code.
 * Driven by the Next.js site through src/app/api/register/route.ts.
 */

var CONFIG = {
  SHEET_NAME: 'Registrations',
  MAX_MEMBERS: 3,

  // Must stay in sync with src/data/events.ts slugs and
  // src/data/registration.ts codeTag values.
  CODE_TAGS: {
    'game-verse': 'GV',
    '3minds-1mission': '3M',
    'see-it-prompt-it': 'SP',
    'logical-duo': 'LD',
    'error-404': 'E4',
    'slides-on-spot': 'SO'
  },

  EMAIL_RE: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_RE: /^\d{10}$/,
  CODE_ALPHABET: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', // no I/O/0/1
  CODE_SUFFIX_LEN: 4
};

/** 7 fixed columns + 5 columns per member slot. */
var HEADERS = (function () {
  var h = [
    'Timestamp',
    'Team Code',
    'Event Slug',
    'Event Name',
    'Team Name',
    'Team Size',
    'Campus'
  ];
  for (var i = 1; i <= CONFIG.MAX_MEMBERS; i++) {
    h.push(
      'Member ' + i + ' Name',
      'Member ' + i + ' Phone',
      'Member ' + i + ' Email',
      'Member ' + i + ' Branch',
      'Member ' + i + ' Year'
    );
  }
  return h;
})();

/* ------------------------------------------------------------------ *
 * Entry points
 * ------------------------------------------------------------------ */

function doPost(e) {
  var lock = null;
  try {
    var body = parseBody_(e);
    var checked = validate_(body);
    if (checked.error) {
      return json_({ ok: false, message: checked.error });
    }
    var data = checked.value;

    // Serialise writes so two people registering at once cannot both pass
    // the duplicate check and claim the same slot.
    lock = LockService.getScriptLock();
    lock.waitLock(20000);

    var sheet = getSheet_();

    if (findDuplicate_(sheet, data)) {
      return json_({
        ok: false,
        code: 'DUPLICATE',
        message:
          'This phone number or email is already registered for ' +
          data.eventName +
          '. Each person can register only once for this game.'
      });
    }

    var code = generateCode_(sheet, data.eventSlug);
    sheet.appendRow(buildRow_(data, code));

    return json_({ ok: true, code: code, message: 'Registered.' });
  } catch (err) {
    return json_({
      ok: false,
      message: String((err && err.message) || err || 'Submission failed')
    });
  } finally {
    if (lock) {
      lock.releaseLock();
    }
  }
}

/** Health check, so you can confirm the URL works before wiring it up. */
function doGet() {
  return json_({
    ok: true,
    message: 'ASTRA registration endpoint ready.',
    sheet: CONFIG.SHEET_NAME,
    columns: HEADERS.length,
    events: Object.keys(CONFIG.CODE_TAGS)
  });
}

/* ------------------------------------------------------------------ *
 * Request handling
 * ------------------------------------------------------------------ */

function parseBody_(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  if (!raw) {
    throw new Error('Empty request body.');
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error('Malformed JSON payload.');
  }
}

/** Returns { error } or { value } with every field trimmed and normalised. */
function validate_(d) {
  var out = {
    eventSlug: str_(d.eventSlug),
    eventName: str_(d.eventName),
    teamName: str_(d.teamName),
    teamSize: Number(d.teamSize) || 0,
    members: (Array.isArray(d.members) ? d.members : []).map(function (m) {
      return {
        name: str_(m && m.name),
        phone: str_(m && m.phone).replace(/\D/g, ''),
        email: str_(m && m.email).toLowerCase(),
        branch: str_(m && m.branch),
        year: str_(m && m.year),
        college: str_(m && m.college)
      };
    })
  };

  if (!out.eventSlug) {
    return { error: 'No event selected.' };
  }
  if (!out.eventName) {
    return { error: 'No event name supplied.' };
  }
  if (!out.members.length) {
    return { error: 'No team members supplied.' };
  }
  if (out.members.length > CONFIG.MAX_MEMBERS) {
    return {
      error: 'A team can have at most ' + CONFIG.MAX_MEMBERS + ' members.'
    };
  }
  if (out.teamSize && out.teamSize !== out.members.length) {
    return { error: 'Team size does not match the number of members.' };
  }

  var seenPhone = {};
  var seenEmail = {};
  for (var i = 0; i < out.members.length; i++) {
    var m = out.members[i];
    var who = 'Member ' + (i + 1);
    if (!m.name) {
      return { error: who + ': name is required.' };
    }
    if (!CONFIG.PHONE_RE.test(m.phone)) {
      return { error: who + ': enter a valid 10-digit phone number.' };
    }
    if (!CONFIG.EMAIL_RE.test(m.email)) {
      return { error: who + ': enter a valid email address.' };
    }
    if (!m.college) {
      return { error: who + ': campus is required.' };
    }
    // Catch two teammates sharing a number, otherwise they slip past the
    // duplicate check below and take two slots in the same team.
    if (seenPhone[m.phone] || seenEmail[m.email]) {
      return {
        error:
          who +
          ': another member on this team is already using the same phone number or email.'
      };
    }
    seenPhone[m.phone] = true;
    seenEmail[m.email] = true;
  }

  return { value: out };
}

/* ------------------------------------------------------------------ *
 * Sheet access
 * ------------------------------------------------------------------ */

/** Finds the sheet, creating it with headers the first time. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    writeHeaders_(sheet);
  }
  return sheet;
}

/** Safe to run from the editor to create/prepare the sheet by hand. */
function setupSheet() {
  var sheet = getSheet_();
  SpreadsheetApp.getUi().alert(
    'Sheet "' + CONFIG.SHEET_NAME + '" is ready with ' + HEADERS.length + ' columns.'
  );
  return sheet.getName();
}

function writeHeaders_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#eeeeee');
  sheet.setFrozenRows(1);
}

/**
 * A person may register once per event. Returns the offending member name,
 * or null when the team is clear.
 */
function findDuplicate_(sheet, data) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return null;
  }

  var slugCol = HEADERS.indexOf('Event Slug');
  var rows = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.length)
    .getValues();

  for (var r = 0; r < rows.length; r++) {
    var row = rows[r];
    if (str_(row[slugCol]) !== data.eventSlug) {
      continue;
    }
    for (var slot = 1; slot <= CONFIG.MAX_MEMBERS; slot++) {
      var base = memberBase_(slot);
      var phone = str_(row[base + 1]);
      var email = str_(row[base + 2]).toLowerCase();
      for (var i = 0; i < data.members.length; i++) {
        var m = data.members[i];
        if (m.phone && m.phone === phone) {
          return m.name;
        }
        if (m.email && m.email === email) {
          return m.name;
        }
      }
    }
  }
  return null;
}

/** 0-based index of a member slot's Name column inside a getValues() row. */
function memberBase_(slot) {
  return 7 + (slot - 1) * 5;
}

/** e.g. GV-7K2Q. Retries if the code is already taken. */
function generateCode_(sheet, eventSlug) {
  var tag = CONFIG.CODE_TAGS[eventSlug] || 'ASTRA';
  var used = {};

  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var existing = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (var i = 0; i < existing.length; i++) {
      used[str_(existing[i][0])] = true;
    }
  }

  for (var attempt = 0; attempt < 50; attempt++) {
    var suffix = '';
    for (var c = 0; c < CONFIG.CODE_SUFFIX_LEN; c++) {
      suffix += CONFIG.CODE_ALPHABET.charAt(
        Math.floor(Math.random() * CONFIG.CODE_ALPHABET.length)
      );
    }
    var code = tag + '-' + suffix;
    if (!used[code]) {
      return code;
    }
  }

  // Practically unreachable fallback.
  return tag + '-' + new Date().getTime().toString(36).toUpperCase().slice(-5);
}

function buildRow_(data, code) {
  var row = [
    new Date(),
    code,
    data.eventSlug,
    data.eventName,
    data.teamName,
    data.members.length,
    data.members[0] ? data.members[0].college : ''
  ];

  for (var slot = 1; slot <= CONFIG.MAX_MEMBERS; slot++) {
    var m = data.members[slot - 1] || {
      name: '',
      phone: '',
      email: '',
      branch: '',
      year: '',
      college: ''
    };
    row.push(m.name, m.phone, m.email, m.branch, m.year);
  }

  return row;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function str_(v) {
  return v == null ? '' : String(v).trim();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
