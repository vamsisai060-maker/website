# ASTRA 2K26 Registration System - Complete Fix Summary

## 1. MAINTENANCE MODE - TURNED OFF
- **File**: `src/lib/maintenance.ts`
- **Change**: `MAINTENANCE_MODE = false` (was `true`)
- **Effect**: Registration page now renders; `/api/register` returns 200 instead of 503

## 2. EVENT SLOTS & CLASH DETECTION (Frontend + Backend)
- **New Type**: `EventSlot` and helpers in `src/data/events.ts`
- **Function**: `clashingEvents(slug)` - returns events running at the same day+session
- **Function**: `otherSlots(slug)` - returns events NOT in the same slot
- **Visual**: Register form now shows "Same time as" list under event rules when an event slot has clashes
- **Slots mapping**:
  - 06-10-2026 Morning (9:30 AM): 3Minds 1Mission | Slides On Spot
  - 06-10-2026 Afternoon (1:30 PM): Game Verse
  - 07-10-2026 Morning (9:30 AM): Logical Duo | See It, Prompt It
  - 07-10-2026 Afternoon (1:30 PM): Error 404

## 3. REGISTRATION FORM PRE-CHECKS
- **New**: `repeatInTeam(members)` - catches duplicate phone/email inside the same team before submission
- **New**: Frontend validation of "same time as" events shown before user fills form
- **Submit path**: Catches `repeatInTeam` error immediately instead of round-trip

## 4. APPS SCRIPT BACKEND - `google-apps-script/Code.gs`
Complete rewrite with the following guarantees:

### a) One Slot at a Time
- Reads only the 1-2 tabs in the same slot (never all 6)
- Conflict check happens against sibling events in the same slot
- A person CAN register for events in different slots (e.g., Morning + Afternoon on different days)

### b) Duplicate Prevention (No Double Registration)
- **Before lock**: Frontend `repeatInTeam` + normalise_ validation (phone/email within team)
- **Inside lock**: `findConflict_()` checks if any member already registered in the same slot
  - Already in **this** event → returns existing code (replay-safe)
  - Already in **sibling** event → returns CLASH error with which event and time
- **Post-write verification** (`VERIFY_AFTER_WRITE = true`): Re-reads the row and rolls back if a member was registered elsewhere at the same moment

### c) Registration Code Uniqueness
- `nextCode_()` scans the tab's existing codes and picks the next sequence
- Belt-and-braces loop ensures no collision even with legacy codes

### d) One Person, One Event Per Slot
- The core rule: a person may hold **one** registration per slot
- If they try to register for two events in the same slot, the second attempt returns a CLASH message explaining which event conflicts and at what time
- They must remove/replace that team member before re-submitting

### e) Idempotent Re-submissions
- Every POST carries a `requestId` minted by the browser
- If the same payload is sent again, the backend returns the **original code** instead of writing a second row
- Edited payloads get a new ID and a new code

### f) Queueing When Busy
- Global lock wait time: 20 seconds
- If another team is being registered, the script returns `retryable: true` with reason `BUSY`
- Frontend retries after 4 seconds automatically (see `callScript` in `src/app/api/register/route.ts`)

## 5. API ROUTE - `src/app/api/register/route.ts`
- **Timeout**: 90 seconds (increased from 75s)
- **Retry logic**: Retries once on BUSY response, waits 4s, then tries again
- **Warm-up GET**: Called once per tab on page mount (guarded by sessionStorage)
- **Error messages**: Pass-through from Apps Script (CLASH, ALREADY_REGISTERED, FULL, etc.)

## 6. FLOW: What Happens When Someone Registers

```
User fills form → Frontend checks:
  1. repeatInTeam?        → Show error immediately (no network)
  2. isFormValid()        → Check required fields
  3. clashingEvents?      → Show "Same time as" list under rules

On Submit:
  POST /api/register → Node.js fetches Apps Script
    → Validates payload (no network yet)
    → Gets lock (20s wait)
    → Reads slot tabs (1-2 rounds)
    → findConflict_():
      • Already in this event? → Return existing code
      • In sibling event?    → Return CLASH with reason + times
    → countTeams_() → Check MAX_TEAMS_PER_EVENT limit
    → writeRow_()      → Write single row
    → VERIFY_AFTER_WRITE: re-read + rollback if collision
    → Return {ok:true, code}
  → Node returns code to browser
  → User sees success page OR error with specific message
```

## 7. WHAT WILL NOT Happen Anymore

| Old Behavior | New Behavior |
|---|---|
| Duplicate row written if same person registers twice | Returns original code; no second row |
| Submission times out behind 19 other teams | Lock waits 20s; BUSY returns for queueing |
| No feedback if event chosen conflicts with existing registration | "Same time as" list shown before form fill |
| Generic "Submission failed" on every error | Specific codes: CLASH, ALREADY_REGISTERED, FULL, BUSY, INVALID |
| Maintenance mode stuck ON | Set `MAINTENANCE_MODE = false` to open |

## 8. DEPLOYMENT CHECKLIST

- [x] `src/lib/maintenance.ts`: `MAINTENANCE_MODE = false`
- [x] `google-apps-script/Code.gs`: Updated with new SPREADSHEET_ID `165SbxZ5XdgWxgNe3GW4PvnqDKsjiX5APnxAeBpl7NFY`
- [x] `src/data/events.ts`: Slot/conflict helpers added
- [x] `src/components/RegisterForm.tsx`: Clash display + repeat-in-team pre-check
- [x] `src/app/api/register/route.ts`: Retry logic + warm-up guard
- [ ] Run `npx tsc --noEmit` - TypeScript OK
- [ ] Deploy: `npm run build && npm run deploy`
- [ ] Test: Register for one event, then try same person for a clashing event → should get CLASH message
- [ ] Test: Register same person for same event → should return original code
- [ ] Test: Register same person for different-slot event (e.g., Morning + Afternoon) → should succeed