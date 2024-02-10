// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve stores', async ({ request }) => {
  const response = await request.get('/api/stores');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('create store', async ({ request }) => {
  const response = await request.post('/api/stores', {
    data: {
      name: 'TestMart',
      logoUrl: '/walmart-logo.png',
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.id).toBeGreaterThanOrEqual(0);
});

test('retrieve store', async ({ request }) => {
  const createStoreBody = await PwHelpers.createDefaultStore(request);

  const newStoreId = createStoreBody.id;

  // Retrieve Store
  const getStoreResponse = await request.get(`/api/stores/${newStoreId}`);

  expect(getStoreResponse.ok()).toBeTruthy();

  const getStoreBody = await getStoreResponse.json();
  expect(getStoreBody.id).toBe(newStoreId);
});

test('update store', async ({ request }) => {
  const createStoreBody = await PwHelpers.createDefaultStore(request);

  const inputData = {
    id: createStoreBody.id,
    name: 'TestMart2',
    logoUrl: '/walmart-logo.png'
  };

  // Update Store
  const response = await request.put(`/api/stores/${inputData.id}`, { data: inputData });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(parseInt(body.id)).toBe(inputData.id);
  expect(body.name).toBe(inputData.name);
  expect(body.logoUrl).toBe(inputData.logoUrl);
});

test('destroy store', async ({ request }) => {
  const createStoreBody = await PwHelpers.createDefaultStore(request);

  const newStoreId = createStoreBody.id;

  // Destroy Store
  const destroyStoreResponse = await request.delete(`/api/stores/${newStoreId}`);

  expect(destroyStoreResponse.ok()).toBeTruthy();

  const destroyStoreBody = await destroyStoreResponse.json();
  expect(destroyStoreBody.msg).toBe('Deleted successfully');
});
