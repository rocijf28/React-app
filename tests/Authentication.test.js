import { test, expect } from '@playwright/test';

test('CheckIfChatsDoesNotShowWhenUserIsNotLoggedIn', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Chat' }).click();
  await expect(page.getByRole('heading'))
  .toHaveText('Beste gebruiker, login om toegang te krijgen tot je chats.');
});

test('Test of ingelogde gebruiker de chat component kan zien', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Login' }).click();
  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded');

  await page1.getByRole('button', { name: 'Add new account' }).click();
  await page1.getByRole('button', { name: 'Auto-generate user information' }).click();
  await page1.getByRole('button', { name: 'Sign in with Google.com' }).click();
  await page.getByRole('link', { name: 'Chat' }).click();

  await expect(page.getByRole('link', { name: 'Chat' })).toBeVisible();
  await page.getByRole('link', { name: 'Chat' }).click();

  await expect(page.getByTestId('chat-component')).toBeVisible();
});