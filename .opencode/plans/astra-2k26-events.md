# Plan: Replace EVENTS with 5 ASTRA 2K26 external games

## Scope
Edit only `src/data/events.ts` — replace the contents of the `EVENTS` array. Do NOT change the `Event` type, exports, or data shape. Keep `teamSize` as a string. Keep `EVENT_ENTRY_FEE` and `EVENT_PRIZE_POOL`. Keep `'Internal'` in `EventCategory`/`EVENT_CATEGORIES` (still used by `EventsListing.tsx`).

## Research findings
- Placeholder slugs exist only in `src/data/events.ts`; no hardcoded links elsewhere.
- Consumers read `EVENTS` dynamically: `src/app/page.tsx`, `src/app/events/[slug]/page.tsx`, `src/components/EventsCarousel.tsx`, `src/components/EventsListing.tsx`.
- `EventCategory` + `EVENT_CATEGORIES` still used: `EventsListing.tsx:75` (tabs), `EventsListing.tsx:64` (state type).
- `events/[slug]/page.tsx:6` `generateStaticParams` maps `EVENTS`; old slugs disappear at build.
- Docs read: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`.
- Scripts: `lint` = `eslint`, `build` = `next build --webpack`.

## New EVENTS array (order, category `External`, date `30-09-2026`)
1. `game-verse` / `Game Verse` / `2` — "A competitive gaming challenge for teams of two. Laptop required, and teammates from the same college are not allowed."
2. `3minds-1mission` / `3Minds 1Mission` / `3` — "A three-member team challenge built on collaboration and problem-solving. Exactly three members are compulsory, at least one laptop is required, and the team leader registers all members."
3. `see-it-prompt-it` / `See It, Prompt It` / `TBD` (+ `// teamSize unconfirmed`) — "A team prompt-engineering challenge where participants turn what they see into effective prompts. Laptop required."
4. `logical-duo` / `Logical Duo` / `2` — "A two-member logical thinking challenge that tests teamwork and reasoning. No laptop required, but a team leader is required."
5. `error-404` / `ERROR 404` / `TBD` (+ `// teamSize unconfirmed`) — "A wrong-answers challenge where teams give unexpected answers. No laptop required."

No "Solo"/single-participant wording anywhere.

## UI behavior changes (report, do not silently change)
- `/events` (`EventsListing`): "Internal" filter tab becomes permanently empty → shows existing "No events match that filter." empty state. Leave tab + type + `EVENT_CATEGORIES` as-is per instruction; flag to user.
- Homepage `page.tsx`: count 8 → 5; only 5 external games in slider.
- `EventsCarousel`: badge 8 → 5; 5 cards.
- `events/[slug]`: 5 pages generated; old placeholder URLs now `notFound()` (404).
- Cards show `TBD` as Team Size for the two unconfirmed events (existing display logic).

## Verification
Run `npm run lint`, then `npm run build`; fix anything broken. Report touched files + UI behavior changes.

## Files touched
- `src/data/events.ts` (only)
