# All Events Section + Events Routes

## Goal

Add an "All Events" horizontal carousel section directly below the `CountdownStrip` on the home page, plus a listing page and dynamic detail page routed off a shared events data file.

## Reference

- `public/event bg.webp` — background image (provided).
- Design previews: light gray cards with `LabsAmiga` headings, mono-feel numerals, `--orange` arrow chips, `--grey` hairlines, `--dark` text. The desktop preview shows an "All Projects 16" stat card wrapped with a black arrow chip; mobile collapses cards to a single column with a share/arrow chip.
- `src/app/page.tsx` currently renders `<CountdownStrip />` at line 667 inside `.hero-slider`. The new section goes immediately after that JSX node (still inside the page wrapper).
- Color tokens already in `src/app/webflow.css:2081-2106`: `--lightgrey #e4e4e4`, `--dark #0e0e0e`, `--darklighter #1b1b1b`, `--grey #9e9e9e`, `--orange #ff7120`.
- Fonts: `LabsAmiga` for headings, `RobotoMonoBold` for stats. Both already loaded by `webflow.css`.

## Data

Create `src/data/events.ts` exporting a single typed array `EVENTS` (6 items) with fields `slug`, `name`, `category`, `entryFee`, `teamSize`, `prizePool`, `slotsLeft`. Use 6 mock events themed to the existing site (AI/Web3 hackathons + games track). Example seed (final values at implementation time):

- `chain-reaction-ai` — Chain Reaction AI — Hackathon — $50 — 2–4 — $25,000 — 12
- `web3-game-jam` — Web3 Game Jam — Game Jam — $25 — 1–3 — $10,000 — 28
- `defi-builder-sprint` — DeFi Builder Sprint — Hackathon — $75 — 3–5 — $40,000 — 6
- `pixel-punk-battle` — Pixel Punk Battle — Game Jam — $0 — Solo — $5,000 — 80
- `onchain-art-fair` — Onchain Art Fair — Showcase — $30 — 1–2 — $15,000 — 40
- `agent-arena` — Agent Arena — Hackathon — $60 — 2–4 — $30,000 — 18

Export an `Event` TypeScript type alongside `EVENTS` so the carousel, listing, and detail page share the contract.

## Section on Home Page

Add a new Server Component `src/app/components/EventsCarousel.tsx` (Server Component, no `"use client"` — interactivity is limited to prev/next buttons which can be plain anchor scroll targets; if smooth scroll arrows are required, a tiny client wrapper `<EventsCarouselClient>` may wrap it, but the data and markup should live in a Server Component to keep the requirement).

Markup structure (replicates the "Our Incubations" pattern):

1. Section wrapper: `section.events-section` with `background-image: url('/event bg.webp')`, `background-size: cover`, `background-position: center`, padding `clamp(3rem, 6vw, 5rem) 0`, color `var(--darklighter)`.
2. Heading row: `■ All Events` kicker using `LabsAmiga`, uppercase, letter-spacing, border-bottom `1px solid var(--grey)`.
3. Stat card: a single `Link href="/events"` (Next `<Link>`) styled as a bordered card on the right (desktop) / top (mobile) reading `All Events` with a large number (count) and the black arrow chip — `<span class="arrow-chip">→</span>`.
4. Carousel track: a horizontal flex container of 6 event cards. Each card is a `Link` to `/events/[slug]`. Each card shows:
   - "Incubation" tag (top-left, outlined chip)
   - Event name (LabsAmiga, large)
   - `category · teamSize` line
   - 2×2 stat grid: `entryFee / Entry Fee`, `prizePool / Prize Pool`, `slotsLeft / Slots Left`, plus a fixed "TBA" placeholder for any missing field so the grid is balanced
   - Arrow chip bottom-right
5. Prev / Next buttons below the track (square bordered buttons with `<` `>`), left aligned, matching the preview.
6. Use CSS scroll-snap (`overflow-x: auto; scroll-snap-type: x mandatory;` on the track) for native horizontal scrolling. No JS state needed for the basic version — buttons can call `scrollBy` via a small inline `onClick` if desired; if so, extract a 30-line client subcomponent just for the arrow buttons (Server Component still owns the list).

Styling lives in `src/app/globals.css` under a new `.events-section` block. Reuse existing variables; do not introduce new tokens.

## Pages

### `src/app/events/page.tsx` (Server Component)

- Import `EVENTS` from `@/data/events`.
- Render a plain `<ul>` (or stacked `<div>`s) — no cards, no images, no extra styling beyond a small `<style>` block for spacing.
- Each row: event name as `<h2>` wrapped in `<Link href={\`/events/${event.slug}\`}>`, followed by a `<p>{event.name} — details coming soon.</p>`.

### `src/app/events/[slug]/page.tsx` (Server Component)

- Accept `params: { slug: string }` (Next 15: `params` is a Promise — await it per the project's Next.js docs at `node_modules/next/dist/docs/`). The implementation agent must confirm the exact signature from the docs before writing the file.
- `generateStaticParams()` returns `EVENTS.map(e => ({ slug: e.slug }))`.
- Look up the event; if missing, render `<h1>Event not found</h1>`.
- Otherwise render `<h1>{event.name}</h1><p>This is the {event.name} page — details coming soon.</p>`.

## Files to Create

- `src/data/events.ts`
- `src/components/EventsCarousel.tsx`
- `src/app/events/page.tsx`
- `src/app/events/[slug]/page.tsx`

## Files to Modify

- `src/app/page.tsx` — import `EventsCarousel` and render it directly after the `</div>` closing `.hero-slider` (after line 668). Keep `'use client'` at the top of the page; the carousel is a Server Component import (allowed inside a client tree as a child).
- `src/app/globals.css` — append `.events-section` styles + scroll-snap track + card + arrow chip + prev/next button rules.

## Risks / Open Questions

- Next.js dynamic params typing: the AGENTS.md warns this Next version has breaking changes. Implementation agent must read `node_modules/next/dist/docs/` for the current `[slug]` page contract (params may be async, `generateStaticParams` may have new signature) before writing the file.
- Prev/Next buttons: spec says "horizontal carousel" without mandating JS scroll. Default to native scroll-snap; only add a small client arrow component if visually required to match the reference.
- Background image: `event bg.webp` is in `public/`; reference as `"/event%20bg.webp"` or move/rename. Prefer referencing the literal filename via `url('/event bg.webp')` in CSS (Next serves `public/` at root, spaces in filenames work but URL-encoding is safer).

## Validation

1. `npm run lint` (or `tsc --noEmit`) passes.
2. `npm run build` succeeds and produces static pages for each of the 6 event slugs.
3. Manual: home page shows the carousel directly under the countdown timer with the `event bg.webp` background; the "All Events" card links to `/events`; each event card links to its `/events/[slug]` page; listing page shows 6 plain rows; detail page shows the event name.
