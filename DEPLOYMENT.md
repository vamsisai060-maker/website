# ASTRA 2K26 — deployment runbook

End-to-end: paste the registration backend, deploy it as a Google Apps Script Web App,
then build and ship the Next.js site to Cloudflare Workers.

Reference docs:

- `google-apps-script/Code.gs` — the backend script (plain file, safe to copy)
- `GOOGLE_APPS_SCRIPT.md` — script contract and sheet layout reference

---

## Part 1 — Google Apps Script backend

### 1.1 Paste the script

Create a project at [script.google.com](https://script.google.com) → **New project**.

Do **not** tick "TypeScript". Open `Code.gs`, select all, and replace its contents with
everything from `google-apps-script/Code.gs` in this repo.

> **If you hit `SyntaxError: Invalid or unexpected token line: 1`** — something non-JavaScript
> landed on line 1. Usually the markdown fence (```` ```javascript ````) got copied along, or
> prose from above the block. Check that line 1 is exactly `/**`. The repo file is pure ASCII
> and verified to parse, so copy from there rather than from the markdown.

Save with `Cmd/Ctrl + S`.

### 1.2 Deploy as a Web App

**Deploy → New deployment → gear icon → Web app**, then:

| Field | Value |
| --- | --- |
| Description | `ASTRA 2K26 registrations` |
| Execute as | **Me** |
| Who has access | **Anyone** |

Click **Deploy**, authorise, then copy the **Web app URL**.

> On Workspace accounts "Anyone" can be blocked by admin policy. If the deploy button refuses,
> ask the admin to allow anonymous web app deployments, or choose **Anyone within your
> organisation** as a fallback.

### 1.3 Use the `/exec` URL

Apps Script hands you a `/dev` URL while you are still editing. That URL changes on every
save and is heavily throttled — **only ever use the `/exec` URL** from the deployment you
just created.

### 1.4 Verify

Open the `/exec` URL in a browser. Expect:

```json
{
  "ok": true,
  "message": "ASTRA 2K26 registration backend is LIVE",
  "sheet": "16ZHMLHirNJig6qRrM2bZjpPEx3C7U_WCIqFSHK0c5jQ",
  "events": ["game-verse", "3minds-1mission", "see-it-prompt-it", "logical-duo", "error-404", "slides-on-spot"],
  "columns": 23
}
```

Then prove a write works — run it twice, the second must return `DUPLICATE`:

```bash
curl -X POST 'https://script.google.com/macros/s/AKfycb.../exec' \
  -H 'Content-Type: text/plain;charset=utf-8' \
  --data '{"eventSlug":"game-verse","eventName":"Game Verse","teamName":"Test","teamSize":2,"members":[{"name":"Test User","phone":"9876543210","email":"test@example.com","branch":"BCA","year":"2nd Year","college":"ADITYA DEGREE COLLEGE, Gopalapatnam"},{"name":"Test Two","phone":"9876543211","email":"t2@example.com","branch":"BCA","year":"2nd Year","college":"ADITYA DEGREE COLLEGE, Gopalapatnam"}]}'
```

Delete the test row from the sheet afterwards.

Each event writes to its **own tab**, created automatically on first registration.
Expect six tabs: `Game Verse`, `3Minds 1Mission`, `See It, Prompt It`, `Logical Duo`,
`ERROR 404`, `Slides On Spot`.

---

## Part 2 — Site environment variable

`src/app/api/register/route.ts` reads `process.env.GSHEET_WEB_APP_URL`. There are two ways to
supply it, and they are **not** equivalent.

### How the value actually reaches the Worker

OpenNext compiles your `.env*` files into `.open-next/cloudflare/next-env.mjs` at build time.
At runtime `.open-next/cloudflare/init.js` resolves it like this:

```js
// Cloudflare runtime vars + secrets win
for (const [key, value] of Object.entries(env)) process.env[key] = value;
// baked .env values are only a fallback
process.env[key] ??= nextEnvVars[mode][key];
```

So:

| Method | Change needs a rebuild? | Stored in git? |
| --- | --- | --- |
| `wrangler secret put` | **No** | No — encrypted at rest |
| `wrangler.jsonc` → `vars` | **No** | Yes — commits in plain text |
| `.env.local` | **Yes, rebuild required** | No — gitignored |

### Recommended: a Worker secret

Keeps the value out of the deployed bundle *and* lets you rotate it without a rebuild:

```bash
npx wrangler login
npx wrangler secret put GSHEET_WEB_APP_URL
# paste the /exec URL when prompted
```

### Alternative: `.env.local` for local development

Needed for `npm run dev` — the dev server does not read Cloudflare secrets:

```bash
GSHEET_WEB_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
```

`*.env*` is already in `.gitignore`, so this stays out of git. Keep in mind this value gets
compiled into the deployed worker, and rotating the Apps Script URL means rebuilding.

---

## Part 3 — Build and deploy the site

The site deploys to Cloudflare Workers through OpenNext. Config already in place:

- `open-next.config.ts` — `defineCloudflareConfig()`
- `wrangler.jsonc` — worker `astra2k26`, `nodejs_compat`, static assets binding
- `.open-next/` — build output (gitignored)

```bash
npm ci                 # if node_modules is missing
npm run deploy         # opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Then confirm what went live:

```bash
npx wrangler deployments list
```

### Preview against the real Worker locally

```bash
npm run preview        # opennextjs-cloudflare build && opennextjs-cloudflare preview
```

For `preview` to see the variable locally, keep it in `.env.local` (Part 2) — the preview
server runs the same baked `next-env.mjs`.

### Rollback

```bash
npx wrangler rollback          # back to the previous successful deployment
npx wrangler deployments list  # find the id to roll back to
```

---

## Part 4 — Post-deploy checklist

| # | Check | How |
| --- | --- | --- |
| 1 | Site responds | `curl -I https://astra2k26.<subdomain>.workers.dev` |
| 2 | Events list renders all six | visit `/events` |
| 3 | Event images resolve | `/error-404.png` and `/slides-on-spot.png` return `200` |
| 4 | Dropdown works | visit `/register`, open **Select Event**, pick each event |
| 5 | Member count follows the event | Error 404 → 1 block, others → 2 or 3 |
| 6 | Solo event hides team name | Error 404 shows no **Team Name** field |
| 7 | Equipment rows are right | Error 404 → *Laptop optional*, Slides On Spot → *Laptop required* |
| 8 | Registration writes through | submit the form, expect a team code on the success page |
| 9 | Duplicate is blocked | register the same person again, expect the inline duplicate error |
| 10 | Row landed in the right tab | the event's own tab gains a row, code in column 1, width matches its member count |

If step 8 returns *"Registration backend is not configured"*, the Worker cannot see
`GSHEET_WEB_APP_URL` — redo Part 2.

---

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `SyntaxError: Invalid or unexpected token line: 1` | Fence or prose pasted into `Code.gs` | Line 1 must be exactly `/**`; re-copy from `google-apps-script/Code.gs` |
| `Cannot find module` / `.ts` errors in Apps Script | Project created with TypeScript on | Untick TypeScript, delete `Code.ts`, use `Code.gs` |
| Curly quotes `'` `'` errors | Editor converted straight quotes | Replace with straight `'` |
| Deploy button greyed out for "Anyone" | Workspace admin policy | Admin must allow anonymous web apps, or use "Anyone within your organisation" |
| `doGet` returns HTML, not JSON | You opened the `/dev` URL | Use the `/exec` URL |
| Site says *"Registration backend is not configured"* | Variable missing in Worker | `npx wrangler secret put GSHEET_WEB_APP_URL` |
| Old `/exec` URL in production | Value was baked at build time | Re-run `npm run deploy`, or switch to a Worker secret |
| Rows appear but team codes clash | Two people registered simultaneously | Already guarded by `LockService`; check you redeployed the latest script |
| `Unknown event: <slug>` | `EVENT_TABS` has no entry for that slug | Add it, matching `src/data/events.ts` |
| `Game Verse takes at most 2 member(s)` | `EVENT_TABS.memberSlots` is lower than the site allows | Fix `memberSlots` in `Code.gs` to match `src/data/registration.ts` |
| Registration code repeats | A row was deleted, so the row count went backwards | Cosmetic only — codes are labels, not identity |
| `test is not a function` in Apps Script logs | You pressed Run on a non-function name | Harmless; the only entry points are `doGet` and `doPost` |