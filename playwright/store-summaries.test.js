// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve store summaries', async ({ request }) => {
  const createProductBody = await PwHelpers.createDefaultProduct(request);

  await PwHelpers.createDefaultProductWithStoreId(request, createProductBody.storeId);

  await PwHelpers.createDefaultProduct(request);

  const storeSummaryResponse = await request.get('/api/stores/summary');

  expect(storeSummaryResponse.ok()).toBeTruthy();

  const body = await storeSummaryResponse.json();

  expect(body.length).toBeGreaterThanOrEqual(2);
});

test('retrieve store summary', async ({ request }) => {
  const createProductBody = await PwHelpers.createDefaultProduct(request);

  const storeId = createProductBody.storeId;

  await PwHelpers.createDefaultProductWithStoreId(request, storeId);

  await PwHelpers.createDefaultProduct(request);

  const storeSummaryResponse = await request.get(`/api/stores/${storeId}/summary`);

  expect(storeSummaryResponse.ok()).toBeTruthy();

  const storeSummaryBody = await storeSummaryResponse.json();
  expect(storeSummaryBody.id).toBe(storeId);
  expect(storeSummaryBody.name).toBe('TestMart');
  expect(storeSummaryBody.logoUrl).toBe('/walmart-logo.png');
  expect(storeSummaryBody.population).toBe(2);
  expect(parseInt(storeSummaryBody.avgAge)).toBe(35);
  expect(parseInt(storeSummaryBody.avgWeight)).toBe(150);
  expect(parseInt(storeSummaryBody.avgIncome)).toBe(45000);
});
