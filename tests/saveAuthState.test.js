const { test } = require('@playwright/test');

test('Save Auth State', async ({ page }) => {
  // Ga naar de applicatie
  await page.goto('http://localhost:3000/');

  // Wacht op de popup die door Google login geopend wordt
  const popupPromise = page.waitForEvent('popup');

  // Klik op de login-knop om de popup te openen
  await page.getByRole('button', { name: 'Login' }).click();
  const popup = await popupPromise;

  // Vul de Google login gegevens in
  await popup.getByLabel('Email or phone').fill('pieterspiet466@gmail.com');
  await popup.getByRole('button', { name: 'Next' }).click();
  await popup.getByLabel('Enter your password').fill('Admin123.');
  await popup.getByLabel('Enter your password').press('Enter');

  // Wacht tot we terugkeren naar de hoofdpagina
  await page.waitForURL('http://localhost:3000/');

  // **Toevoeging: wacht tot de app meldt dat we ingelogd zijn**
  await page.waitForSelector('text=Piet Pieters');

  // Sla dan de sessiestatus op
  await page.context().storageState({ path: 'auth.json' });
  console.log('Sessie opgeslagen in auth.json');
});