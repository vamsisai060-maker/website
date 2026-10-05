import { test, expect } from '@playwright/test';
import { EVENTS } from '../src/data/events';
import { REGISTRATIONS } from '../src/data/registration';

const validMembers = [
  {
    name: 'Test User One',
    phone: '9876543210',
    email: 'test1@example.com',
    branch: 'BCA',
    year: '3rd Year',
    college: 'ADITYA DEGREE CO-ED CAMPUS, GWK',
  },
  {
    name: 'Test User Two',
    phone: '9876543211',
    email: 'test2@example.com',
    branch: 'BSC-DATA SCIENCE',
    year: '2nd Year',
    college: 'ADITYA DEGREE CO-ED CAMPUS, GWK',
  },
  {
    name: 'Test User Three',
    phone: '9876543212',
    email: 'test3@example.com',
    branch: 'BSC-CHEMISTRY',
    year: '1st Year',
    college: 'ADITYA DEGREE CO-ED CAMPUS, GWK',
  },
];

async function fillMember(page: any, index: number, member: typeof validMembers[0]) {
  await page.fill(`[name="member-${index}-name"]`, member.name);
  await page.fill(`[name="member-${index}-phone"]`, member.phone);
  await page.fill(`[name="member-${index}-email"]`, member.email);
  
  await page.click(`#member-${index}-branch`);
  await page.waitForSelector(`.form-field-select-panel .form-field-select-option`, { state: 'visible', timeout: 10000 });
  await page.click(`.form-field-select-panel .form-field-select-option:has-text("${member.branch}")`);
  await page.waitForSelector('.form-field-select-panel', { state: 'hidden', timeout: 5000 }).catch(() => {});
  
  await page.click(`#member-${index}-year`);
  await page.waitForSelector(`.form-field-select-panel .form-field-select-option`, { state: 'visible', timeout: 10000 });
  await page.click(`.form-field-select-panel .form-field-select-option:has-text("${member.year}")`);
  await page.waitForSelector('.form-field-select-panel', { state: 'hidden', timeout: 5000 }).catch(() => {});
  
  await page.click(`#member-${index}-college`);
  await page.waitForSelector(`.form-field-select-panel .form-field-select-option`, { state: 'visible', timeout: 10000 });
  await page.click(`.form-field-select-panel .form-field-select-option:has-text("${member.college}")`);
  await page.waitForSelector('.form-field-select-panel', { state: 'hidden', timeout: 5000 }).catch(() => {});
}

async function submitFormAndExpectSuccess(page: any, teamName?: string) {
  await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
  await page.waitForURL(/\/register\/.*\/success/, { timeout: 120000 });
  const code = await page.textContent('[data-testid="reg-code"]');
  expect(code).toBeTruthy();
  if (teamName) {
    const displayedTeam = await page.textContent('[data-testid="team-name"]');
    expect(displayedTeam?.toUpperCase()).toContain(teamName.toUpperCase());
  }
}

test.describe('ASTRA 2K26 Registration - All Scenarios', () => {
  test.setTimeout(180000);

  // SCENARIO 1: Successful registrations for all 6 events
  test('should successfully register for all 6 events with valid data', async ({ page }) => {
    for (const event of EVENTS) {
      await page.goto(`/register/${event.slug}`);
      const config = REGISTRATIONS[event.slug];
      const slots = config.memberSlots;
      
      if (slots > 1) {
        await page.fill('[name="team-name"]', `Test Team ${event.slug}`);
      }
      
      for (let i = 0; i < slots; i++) {
        await fillMember(page, i, validMembers[i]);
      }
      
      await submitFormAndExpectSuccess(page, slots > 1 ? `Test Team ${event.slug}` : validMembers[0].name);
    }
  });

  // SCENARIO 2: Clash detection - same slot events cannot both be registered
  test('should block registration for clashing events (same slot)', async ({ page }) => {
    // 3Minds 1Mission and Slides On Spot both run Morning 06-10-2026
    // Register for 3Minds 1Mission first
    await page.goto('/register/3minds-1mission');
    await page.fill('[name="team-name"]', 'Test Team');
    await fillMember(page, 0, validMembers[0]);
    await fillMember(page, 1, validMembers[1]);
    await fillMember(page, 2, validMembers[2]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/3minds-1mission\/success/, { timeout: 60000 });
    
    // Now try to register for Slides On Spot (clashes - same slot)
    await page.goto('/register/slides-on-spot');
    await page.fill('[name="team-name"]', 'Test Team 2');
    await fillMember(page, 0, validMembers[1]);
    await fillMember(page, 1, validMembers[2]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    
    // Should show error about clash
    await page.waitForSelector('.w-form-fail', { timeout: 10000 });
    const errorText = await page.textContent('.w-form-fail') || '';
    expect(errorText.toLowerCase().toLowerCase().includes('clash') || errorText.toLowerCase().includes('same time')).toBeTruthy();
  });

  // SCENARIO 3: Duplicate prevention - same person can't register twice for same event
  test('should handle duplicate registration for same event', async ({ page }) => {
    // Register first time
    await page.goto('/register/game-verse');
    await page.fill('[name="team-name"]', 'Duplicate Test Team');
    await fillMember(page, 0, validMembers[0]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/game-verse\/success/, { timeout: 60000 });
    const firstCode = await page.textContent('[data-testid="reg-code"]');
    expect(firstCode).toBeTruthy();
    
    // Try registering again with same details - backend returns original code for replayed requests
    await page.goto('/register/game-verse');
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    const pageContent = await page.textContent('body') || '';
    // The backend should either return the original code or indicate already registered
    expect(pageContent.includes(firstCode || '') || pageContent.toLowerCase().includes('already') || pageContent.toLowerCase().includes('duplicate')).toBeTruthy();
  });

  // SCENARIO 4: Cross-slot registration - can register for events across different days/sessions
  test('should allow registration for events across different slots and days', async ({ page }) => {
    // Register for Game Verse (Afternoon 06-10)
    await page.goto('/register/game-verse');
    await page.fill('[name="team-name"]', 'Cross-Slot Team');
    await fillMember(page, 0, validMembers[0]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/game-verse\/success/, { timeout: 60000 });
    const gameCode = await page.textContent('[data-testid="reg-code"]');
    expect(gameCode).toBeTruthy();
    
    // Register for Logical Duo (Morning 07-10 - different slot, different day)
    await page.goto('/register/logical-duo');
    await page.fill('[name="team-name"]', 'Cross-Slot Team 2');
    await fillMember(page, 0, validMembers[1]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/logical-duo\/success/, { timeout: 60000 });
    const logicalCode = await page.textContent('[data-testid="reg-code"]');
    expect(logicalCode).toBeTruthy();
    
    // Register for Error 404 (Afternoon 07-10 - different session slot than Game Verse)
    await page.goto('/register/error-404');
    await page.fill('[name="team-name"]', 'Cross-Slot Team 3');
    await fillMember(page, 0, validMembers[2]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/error-404\/success/, { timeout: 60000 });
    const e4Code = await page.textContent('[data-testid="reg-code"]');
    expect(e4Code).toBeTruthy();
    
    // All three are in different slots, should all succeed
    expect(gameCode && logicalCode && e4Code).toBeTruthy();
  });

  // SCENARIO 5: Morning clash pair - 3Minds 1Mission vs Slides On Spot
  test('should block Morning slot clash between 3Minds 1Mission and Slides On Spot', async ({ page }) => {
    // Register for 3Minds 1Mission first
    await page.goto('/register/3minds-1mission');
    await page.fill('[name="team-name"]', 'Morning Test');
    await fillMember(page, 0, validMembers[0]);
    await fillMember(page, 1, validMembers[1]);
    await fillMember(page, 2, validMembers[2]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/3minds-1mission\/success/, { timeout: 60000 });
    
    // Now try Slides On Spot (same Morning slot - should clash)
    await page.goto('/register/slides-on-spot');
    await page.fill('[name="team-name"]', 'Afternoon Test');
    await fillMember(page, 0, validMembers[1]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    
    // Should show error about clash
    await page.waitForSelector('.w-form-fail', { timeout: 10000 });
    const errorText = await page.textContent('.w-form-fail') || '';
    expect(errorText.toLowerCase().includes('clash') || errorText.toLowerCase().includes('same time') || errorText.toLowerCase().includes('simultaneous')).toBeTruthy();
  });

  // SCENARIO 6: Afternoon single event - Game Verse has no clash
  test('should allow standalone Afternoon event registration (Game Verse)', async ({ page }) => {
    await page.goto('/register/game-verse');
    await page.fill('[name="team-name"]', 'Afternoon Only Team');
    await fillMember(page, 0, validMembers[0]);
    await page.click('button[type="submit"]:has-text("SUBMIT REGISTRATION")');
    await page.waitForURL(/\/register\/game-verse\/success/, { timeout: 60000 });
    const code = await page.textContent('[data-testid="reg-code"]');
    expect(code).toBeTruthy();
  });

  // SCENARIO 7: Verify session times exist on each event page
  test('should have session information for each event', async ({ page }) => {
    for (const event of EVENTS) {
      await page.goto(`/register/${event.slug}`);
      // Page should load without error and have some session/date info
      expect(page).toHaveURL(`/register/${event.slug}`);
      // The form should have date and session displayed
      const dateFound = await page.locator(`text=${event.date}`).first();
      const sessionFound = await page.locator(`text=${event.session}`).first();
      await expect(dateFound).toBeVisible({ timeout: 5000 });
      await expect(sessionFound).toBeVisible({ timeout: 5000 });
    }
  });
});