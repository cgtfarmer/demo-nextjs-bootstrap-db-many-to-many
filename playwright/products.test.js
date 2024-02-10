// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve products', async ({ request }) => {
  await PwHelpers.createDefaultProduct(request);

  const response = await request.get('/api/products');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThanOrEqual(1);
});
