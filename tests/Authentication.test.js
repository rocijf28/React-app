import { test, expect } from '@playwright/test';

test('CheckIfChatsDoesNotShowWhenUserIsNotLoggedIn', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Chat' }).click();
  await expect(page.getByRole('heading'))
  .toHaveText('Beste gebruiker, login om toegang te krijgen tot je chats.');
});