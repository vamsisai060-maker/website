PRD — Campus Games Fest Registration Site
Summary
A Next.js website for a college gaming event with 6 free-to-enter games. Visitors browse the games on a landing page (same dark, neon-accent, card-driven visual language as the reference ChainGPT Labs pages), then register for one or more games through a form. Every registration is written to a Google Sheet in real time and triggers an automated confirmation email via Resend.
Goals


Let students discover the 6 games and register in under 2 minutes, no login required.

Give organizers a live, no-code view of registrations (Google Sheets) — no separate admin panel needed for v1.

Confirm every registration instantly by email so students trust it went through.

Reuse the layout/visual rhythm of the three reference pages (hero → feature/portfolio-style grid → proof/stats → FAQ → footer) rebuilt as original code for this event, not the source site's literal content or branding.

Non-goals (v1)


Payments (all games are free).

Login/accounts — registration is a stateless form per student.

Custom admin dashboard (Sheet is the dashboard for v1).

Team-vs-team bracket/scheduling logic — this site only handles registration, not tournament management.

Users


Student (registrant): browses games, registers, gets a confirmation email.

Organizer: shares the site link, monitors registrations in Google Sheets, emails updates manually or via the same Resend setup later.

Site map & pages



Page

Purpose

Reference-page analog


/ Landing

Hero, event info, 6-game grid, how-it-works, FAQ, footer

Fund/Incubate landing page


/games/[game] (or in-page anchor)

Individual game detail — format, rules, slots left, "Register" CTA

Portfolio page's project detail treatment


/register?game=slug

Registration form (name, email, phone, college/dept, year, game, team info if squad)

Apply-to-Labs form page


/register/success

Confirmation screen after successful submit

—

Landing page sections (in order)


Hero — event name (placeholder), one-line pitch, dates, "6 games · free entry" stat strip, primary CTA scrolling to games grid.

Games grid — 6 cards (2×3 / 3×2), each: game name, format (solo/duo/squad), slots left, short blurb, Register button.

How it works — 3-step real sequence: Register → Get confirmation email → Show up & play.

Stats / social proof — e.g. total slots, past-edition turnout (placeholder numbers, editable).

FAQ accordion — eligibility, is it free, team size, what to bring, deadline.

Footer — organizer contact, socials, college name.

Registration flow


Student clicks "Register" on a game card → lands on /register with that game pre-selected.

Form fields: full name, email, phone, college ID/roll no., department & year, game (dropdown, pre-filled), team name + teammate names/emails (shown only if the selected game is duo/squad).

Client-side validation (required fields, email format, phone format).

On submit → POST /api/register:


Validates payload server-side.

Appends a row to the Google Sheet (one sheet, one tab per game, or one tab with a "Game" column — see §9).

Sends a confirmation email via Resend to the registrant (event name, game, next steps).

Returns success → client redirects to /register/success.

Errors (sheet write fails, duplicate email+game, etc.) show inline, form is not lost.

Integrations


Google Sheets: service-account auth (googleapis npm package), one spreadsheet shared with the service account's email as Editor. Server-side only — no credentials in client code.

Resend: transactional email from a verified sender/domain, triggered from the same API route after a successful Sheets write.

Data model (Google Sheet — one tab, append-only)



Column

Notes


Timestamp

server-generated


Full Name




Email




Phone




College ID / Roll No.




Department & Year




Game

slug + display name


Team Name

blank if solo


Teammates (name, email)

blank if solo


Status

default "Registered" (organizers can edit manually, e.g. "Checked in")

Design direction


Same structural/visual language as the reference pages: near-black background, single warm-orange neon accent, monospace labels for data (slot counts, dates), grotesque/geometric display font for headlines, card-based grid with restrained hover states, one deliberate motion moment (not fade-up-everything).

Rebuilt as original Tailwind/CSS for this project — not the reference site's literal CSS, copy, or branding.

Placeholder content (event name, game names/blurbs, stats) clearly marked for easy swap-in.

Tech stack


Next.js 14 (App Router) + TypeScript + Tailwind CSS.

googleapis for Sheets, resend for email.

Deployable to Vercel; env vars for all secrets (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID, RESEND_API_KEY, RESEND_FROM_EMAIL).

Open items / assumptions (flag before/while building)


Event & college name: placeholder until provided.

6 games' actual names/formats/rules: placeholder ("Game 1"–"Game 6", editable in one data file) until provided.

Google Cloud service account & Resend account: neither exists yet — README will include step-by-step setup for both.

Registration deadline / capacity per game: placeholder (editable), confirm real numbers later.

Duplicate-registration handling (same email registers twice for same game): v1 will just flag it in the Sheet rather than hard-block, unless you want a hard block.

Milestones


Scaffold Next.js project, design tokens, landing page with placeholder content. (next step)

Registration form + /api/register route (validation only, no integrations yet).

Wire Google Sheets write.

Wire Resend confirmation email.

README with full setup + deploy instructions; swap in real event/game content.