# ASTRA 2K26 — Google Apps Script registration backend

Copy the script below into a new Google Apps Script project, deploy it as a Web App,
then paste the `/exec` URL into `.env.local` as `GSHEET_WEB_APP_URL`.

The site already talks to this script server-side through `src/app/api/register/route.ts`,
so the browser never calls Google directly and **no CORS setup is needed**.

---

## 1. Contract (already implemented in `src/app/api/register/route.ts`)

`src/app/api/register/route.ts` forwards the form payload as a raw JSON body and
expects a JSON response.

**Request** — `POST`, `Content-Type: text/plain;charset=utf-8`

```json
{
  "eventSlug": "game-verse",
  "eventName": "Game Verse",
  "teamName": "Night Owls",
  "teamSize": 2,
  "members": [
    {
      "name": "Ada Lovelace",
      "phone": "9876543210",
      "email": "ada@example.com",
      "branch": "BCA",
      "year": "2nd Year",
      "college": "ADITYA DEGREE COLLEGE, Gopalapatnam"
    }
  ]
}
```

**Response** — the Next route treats the submission as successful only when
`ok` is truthy **and** `code` is truthy.

| Case | Body | Effect on the site |
| --- | --- | --- |
| Success | `{ "ok": true, "code": "GV-7K2Q", "message": "Registered." }` | Redirects to the success page showing `code` |
| Duplicate person | `{ "ok": false, "code": "DUPLICATE", "message": "..." }` | Shows the inline error |
| Validation error | `{ "ok": false, "message": "Member 1: enter a valid 10-digit phone number." }` | Shows the inline error |

> `code: "DUPLICATE"` is a sentinel, not a team code. The form matches on it
> exactly, so keep the spelling as-is.

---

## 2. The script

The script also lives on its own as **`google-apps-script/Code.gs`** — open that file,
select all, copy. That is the safest way to paste it, because there are no code fence
markers to include by accident.

If you copy from this document instead, take **only** what sits between the
` ```javascript ` and ` ``` ` lines below. Including the fence markers makes Apps Script
fail immediately with:

```
SyntaxError: Invalid or unexpected token   line: 1   file: Code.gs
```

Create a new project at [script.google.com](https://script.google.com) → **New project**,
then replace the contents of `Code.gs` with the whole script.

```javascript
/**
 * ASTRA 2K26 — registration backend.
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
```

---

## 3. Deploy

1. **Save** the project (the disk icon, or `Cmd/Ctrl + S`).
2. Click **Deploy → New deployment**.
3. Click the gear beside *Select type* → **Web app**.
4. Set:
   - **Description** — anything, e.g. `ASTRA 2K26 registrations`
   - **Execute as** — **Me**
   - **Who has access** — **Anyone**
5. Click **Deploy** and authorise. Copy the **Web app URL**.

> On Workspace accounts, "Anyone" may be restricted by admin policy. If the deploy
> step refuses, ask the admin to allow anonymous web app deployments, or set
> "Who has access" to **Anyone within your organisation**.

### Use the `/exec` URL, not `/dev`

Apps Script only gives you the `/dev` URL while you are editing. The `/dev` URL
changes on every save and is throttled — always use the `/exec` URL from the
deployment you created.

---

## 4. Verify before wiring it up

Open the `/exec` URL in a browser. You should get JSON back:

```json
{
  "ok": true,
  "message": "ASTRA registration endpoint ready.",
  "sheet": "Registrations",
  "columns": 22,
  "events": ["game-verse", "3minds-1mission", "see-it-prompt-it", "logical-duo", "error-404", "slides-on-spot"]
}
```

The `Registrations` sheet is created automatically on the first write. To create it
up front instead, run `setupSheet()` from the editor once.

### Optional: test a submission by hand

```bash
curl -X POST 'https://script.google.com/macros/s/AKfycb.../exec' \
  -H 'Content-Type: text/plain;charset=utf-8' \
  --data '{"eventSlug":"game-verse","eventName":"Game Verse","teamName":"Test Team","teamSize":1,"members":[{"name":"Test User","phone":"9876543210","email":"test@example.com","branch":"BCA","year":"2nd Year","college":"ADITYA DEGREE COLLEGE, Gopalapatnam"}]}'
```

Expect `{"ok":true,"code":"GV-XXXX",...}`. Run it twice — the second call should return
`code: "DUPLICATE"`, which proves the duplicate guard works. Delete the test row
afterwards.

---

## 5. Connect to the site

Add the URL to `.env.local`:

```bash
GSHEET_WEB_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Then restart the dev server — the value is read at server start:

```bash
npm run dev
```

For Cloudflare (`npm run preview` / `npm run deploy`), add the same variable in
`wrangler.jsonc` under `vars`.

---

## 6. Sheet layout

One row per team, 22 columns — 7 fixed columns, then a 5-column block per member
slot:

| # | Column | # | Column |
| ---: | --- | ---: | --- |
| 1 | Timestamp | 12 | Member 1 Year |
| 2 | Team Code | 13 | Member 2 Name |
| 3 | Event Slug | 14 | Member 2 Phone |
| 4 | Event Name | 15 | Member 2 Email |
| 5 | Team Name | 16 | Member 2 Branch |
| 6 | Team Size | 17 | Member 2 Year |
| 7 | Campus | 18 | Member 3 Name |
| 8 | Member 1 Name | 19 | Member 3 Phone |
| 9 | Member 1 Phone | 20 | Member 3 Email |
| 10 | Member 1 Email | 21 | Member 3 Branch |
| 11 | Member 1 Branch | 22 | Member 3 Year |

The per-member block is `Name, Phone, Email, Branch, Year`, so columns 8–12 are
Member 1. Every team occupies one row and unused member slots are left blank.
`Campus` is the team leader's campus, since the form keeps one campus per team.

> Phone numbers are stored as text strings, not numbers, so leading zeros are never
> stripped.

Filter by **Event Name** to get one list per event for the venue.

---

## 7. Keeping it in sync

Three places hold the same event list. Update all of them when you add an event:

| File | What to add |
| --- | --- |
| `src/data/events.ts` | the event object (`slug`, `name`, `category`, `session`, `teamSize`, `date`, …) |
| `src/data/registration.ts` | a `REGISTRATIONS` entry, including `codeTag` |
| this script | a `CODE_TAGS` entry with the matching `codeTag` |

If a `codeTag` is missing, the script falls back to `ASTRA-XXXX`, so registrations
still work — the codes just stop being event-prefixed.