# ASTRA 2K26 — Google Apps Script registration backend

The script lives in **`google-apps-script/Code.gs`** — copy that file into a Google
Apps Script project, deploy it as a Web App, then paste the `/exec` URL into
`.env.local` as `GSHEET_WEB_APP_URL`.

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
| Success | `{ "ok": true, "code": "ASTRA2K26-GV-001", "message": "Registered." }` | Redirects to the success page showing `code` |
| Duplicate person | `{ "ok": false, "code": "DUPLICATE", "message": "..." }` | Shows the inline error |
| Validation error | `{ "ok": false, "message": "Member 1: enter a valid 10-digit phone number." }` | Shows the inline error |

> `code: "DUPLICATE"` is a sentinel, not a team code. The form matches on it
> exactly, so keep the spelling as-is.

> Apps Script's `ContentService` cannot set an HTTP status code, so `doPost` always
> answers HTTP 200. The route relies on the `ok` / `code` fields instead, which is
> why those two must stay accurate.

---

## 2. The script

See **`google-apps-script/Code.gs`**. Do not copy the code out of markdown — the
file is plain, ASCII-only, and has no fences to trip over.

A wrong paste shows up as `SyntaxError: Invalid or unexpected token line: 1`. Line 1
must be exactly `/**`.

### What it does

- Opens the spreadsheet bound at `SPREADSHEET_ID`
- Picks the tab for `payload.eventSlug` from `EVENT_TABS`, creating it with headers
  the first time it is used
- Validates and normalises every field **before** anything is written
- Rejects the team if any member's phone or email already appears on that tab
- Writes one row per team and returns a sequential code `ASTRA2K26-<TAG>-<NNN>`

### Why one tab per event

Each tab is a ready-made list for its venue coordinator — no filtering, no
accidental cross-event totals. Tabs are created on first registration, so a
partially-used sheet is normal and safe.

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
  "message": "ASTRA 2K26 registration backend is LIVE",
  "sheet": "16ZHMLHirNJig6qRrM2bZjpPEx3C7U_WCIqFSHK0c5jQ",
  "events": [
    "game-verse",
    "3minds-1mission",
    "see-it-prompt-it",
    "logical-duo",
    "error-404",
    "slides-on-spot"
  ],
  "columns": 23
}
```

### Test a submission by hand

```bash
curl -X POST 'https://script.google.com/macros/s/AKfycb.../exec' \
  -H 'Content-Type: text/plain;charset=utf-8' \
  --data '{"eventSlug":"game-verse","eventName":"Game Verse","teamName":"Test Team","teamSize":2,"members":[{"name":"Test One","phone":"9876543210","email":"t1@example.com","branch":"BCA","year":"2nd Year","college":"ADITYA DEGREE COLLEGE"},{"name":"Test Two","phone":"9876543211","email":"t2@example.com","branch":"BCA","year":"2nd Year","college":"ADITYA DEGREE COLLEGE"}]}'
```

Expect `{"ok":true,"code":"ASTRA2K26-GV-001",...}`. Run it again unchanged — the
second call must return `code: "DUPLICATE"`, which proves the duplicate guard works.
Delete the test rows afterwards.

> The sequence number counts rows, so deleting a test row makes the next code reuse
> that number. Codes are display labels, not identity — the row is what matters.

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

For Cloudflare, prefer a Worker secret so the URL stays out of the deployed bundle
and can be rotated without a rebuild:

```bash
npx wrangler secret put GSHEET_WEB_APP_URL
```

See `DEPLOYMENT.md` for how OpenNext resolves that against the baked `.env` values.

---

## 6. Sheet layout

One row per team. Five fixed columns, then a six-column block per member slot:

| # | Column | # | Column |
| ---: | --- | ---: | --- |
| 1 | Registration Code | 14 | Member 2 Phone |
| 2 | Timestamp | 15 | Member 2 Email |
| 3 | Team Name | 16 | Member 2 Branch |
| 4 | Campus | 17 | Member 2 Year |
| 5 | Team Size | 18 | Member 2 Campus |
| 6 | Member 1 Name | 19 | Member 3 Name |
| 7 | Member 1 Phone | 20 | Member 3 Phone |
| 8 | Member 1 Email | 21 | Member 3 Email |
| 9 | Member 1 Branch | 22 | Member 3 Branch |
| 10 | Member 1 Year | 23 | Member 3 Year |
| 11 | Member 1 Campus | | |
| 12 | Member 2 Name | | |
| 13 | | | |

The per-member block is `Name, Phone, Email, Branch, Year, Campus`, so columns 6–11
are Member 1. Column 4 `Campus` repeats Member 1's campus, kept so the top of each
tab reads well.

> Phone numbers are stored as text strings, not numbers, so leading zeros are never
> stripped.

### Tabs and widths

Width is set by the event, so solo events have a narrow tab:

| Slug | Tab | Slots | Columns | Code prefix |
| --- | --- | ---: | ---: | --- |
| `game-verse` | Game Verse | 2 | 17 | `GV` |
| `3minds-1mission` | 3Minds 1Mission | 3 | 23 | `3M` |
| `see-it-prompt-it` | See It, Prompt It | 1 | 11 | `SP` |
| `logical-duo` | Logical Duo | 2 | 17 | `LD` |
| `error-404` | ERROR 404 | 1 | 11 | `E4` |
| `slides-on-spot` | Slides On Spot | 2 | 17 | `SO` |

`ensureHeaders_` only ever *adds* columns. A tab created earlier with more member
slots than the table above (for instance the old 3-wide `See It, Prompt It`) keeps
its extra columns and its existing rows rather than being rewritten, so narrowing
an event in the site config never destroys data.

---

## 7. Keeping it in sync

`EVENT_TABS` in `Code.gs` must agree with the site on three fields per event.

| Field | Source of truth |
| --- | --- |
| `slug` | `src/data/events.ts` |
| `memberSlots` | `src/data/registration.ts` |
| `codeTag` | `src/data/registration.ts` |

| File | What to check |
| --- | --- |
| `src/data/events.ts` | every `slug` has an `EVENT_TABS` entry, or the form throws `Unknown event` |
| `src/data/registration.ts` | `memberSlots` matches the `EVENT_TABS` value; the form sends exactly that many members |
| `src/components/RegisterForm.tsx` | sends `eventSlug`, `eventName`, `teamName`, `teamSize`, and one object per member with `name, phone, email, branch, year, college` |
| `src/app/api/register/route.ts` | needs `ok` **and** a truthy `code` on success, and `code: "DUPLICATE"` to surface the inline error |

A mismatch on `memberSlots` is the dangerous one: if the site allows more members
than `EVENT_TABS` declares, the script rejects the submission with
*"takes at most N member(s)"* and the student cannot register.
