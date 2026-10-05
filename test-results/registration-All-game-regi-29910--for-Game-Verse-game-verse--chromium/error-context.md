# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> All game registrations >> should successfully register for Game Verse (game-verse)
- Location: tests/registration.spec.ts:70:9

# Error details

```
Error: Channel closed
```

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#member-1-college')

```

```
Error: browserContext.close: Target page, context or browser has been closed
```