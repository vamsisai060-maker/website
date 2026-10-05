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

async function fillMember(page: any, index: number, member: (typeof validMembers)[0]) {
  await page.fill(`[name="member-${index}-name"]`, member.name);
  await page.fill(`[name="member-${index}-phone"]`, member.phone);
  await page.fill(`[name="member-${index}-email"]`, member.email);
  
  // Select branch
  await page.click(`#member-${index}-branch`);
  await page.waitForSelector(`.form-field-select-panel .form-field-select-option`, { state: 'visible', timeout: 10000 });
  await page.click(`.form-field-select-panel .form-field-select-option:has-text("${member.branch}")`);
  await page.waitForSelector('.form-field-select-panel', { state: 'hidden', timeout: 5000 }).catch(() => {});
  
  // Select year
  await page.click(`#member-${index}-year`);
  await page.waitForSelector(`.form-field-select-panel .form-field-select-option`, { state: 'visible', timeout: 10000 });
  await page.click(`.form-field-select-panel .form-field-select-option:has-text("${member.year}")`);
  await page.waitForSelector('.form-field-select-panel', { state: 'hidden', timeout: 5000 }).catch(() => {});
  
  // Select college
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

test.describe('All game registrations', () => {
  test.setTimeout(180000);
  for (const event of EVENTS) {
    test(`should successfully register for ${event.name} (${event.slug})`, async ({ page }) => {
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
    });
  }
});
