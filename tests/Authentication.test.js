import { test, expect } from '@playwright/test';

test('CheckIfChatsDoesNotShowWhenUserIsNotLoggedIn', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Chat' }).click();
  await expect(page.getByRole('heading'))
  .toHaveText('Beste gebruiker, login om toegang te krijgen tot je chats.');
});

test('Test of ingelogde gebruiker de chat component kan zien', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // Wacht op popup-event
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Login' }).click();
  const page1 = await page1Promise;

  // Wacht tot de popup volledig geladen is
  await page1.waitForLoadState('domcontentloaded');

  // Controleer of de tekst zichtbaar is voordat je klikt
  await expect(page1.getByText('Otter Orange')).toBeVisible();
  await page1.getByText('Otter Orange').click();

  // Wacht op de link om zichtbaar te zijn voordat je klikt
  await expect(page.getByRole('link', { name: 'Chat' })).toBeVisible();
  await page.getByRole('link', { name: 'Chat' }).click();
});