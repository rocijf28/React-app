import { test, expect } from '@playwright/test';

// Laad de opgeslagen sessie
test.use({ storageState: 'auth.json' });

test('Chat component is zichtbaar', async ({ page }) => {
  // Ga direct naar de applicatie
  await page.goto('http://localhost:3000/');

  // Controleer of de gebruiker is ingelogd door naar de Chat-pagina te navigeren
  const chatLink = page.getByRole('link', { name: 'Chat' });
  await expect(chatLink).toBeVisible(); // Controleer dat de Chat-link zichtbaar is
  await chatLink.click();

  // Controleer of het chatcomponent zichtbaar is
  const chatComponent = page.locator('.chat-component');
  await expect(chatComponent).toBeVisible();
});