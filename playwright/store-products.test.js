// @ts-check
const { test, expect } = require('@playwright/test');
const PwHelpers = require('./pw-helpers');

test('retrieve store products', async ({ request }) => {
  const createStoreBody1 = await PwHelpers.createDefaultStore(request);

  await PwHelpers.createDefaultProductWithStoreId(request, createStoreBody1.id);

  await PwHelpers.createDefaultProductWithStoreId(request, createStoreBody1.id);

  const createStoreBody2 = await PwHelpers.createDefaultStore(request);

  await PwHelpers.createDefaultProductWithStoreId(request, createStoreBody2.id);

  const response = await request.get(`/api/stores/${createStoreBody1.id}/products`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBe(2);

  const allProductsResponse = await request.get('/api/products');
  const allProductsBody = await allProductsResponse.json();

  expect(allProductsBody.length).toBeGreaterThan(2);
});

test('create store product', async ({ request }) => {
  const createStoreBody = await PwHelpers.createDefaultStore(request);

  const inputData = {
    name: 'Apple',
    weight: 0.9,
    color: 'red',
    imageUrl: '/apple.png'
  };

  const response = await request.post(
    `/api/stores/${createStoreBody.id}/products`,
    { data: inputData }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();
  expect(body.id).toBeGreaterThan(0);
  expect(body.name).toBe(inputData.name);
  expect(body.weight).toBe(inputData.weight);
  expect(body.color).toBe(inputData.color);
  expect(body.imageUrl).toBe(inputData.imageUrl);
  expect(body.storeId).toBeUndefined();
});

test('retrieve store product', async ({ request }) => {
  const createProductBody = await PwHelpers.createDefaultProduct(request);
  const newProductId = createProductBody.id;

  const response = await request.get(
    `/api/stores/${createProductBody.storeId}/products/${createProductBody.id}`
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(Number.isInteger(body.id)).toBeTruthy();

  expect(body.id).toBe(newProductId);
});

test('update store product', async ({ request }) => {
  const createProductBody = await PwHelpers.createDefaultProduct(request);

  const inputData = {
    id: createProductBody.id,
    name: 'Apple',
    weight: 0.9,
    color: 'red',
    imageUrl: '/apple.png'
  };

  const response = await request.put(
    `/api/stores/${createProductBody.storeId}/products/${createProductBody.id}`,
    { data: inputData }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(parseInt(body.id)).toBe(inputData.id);
  expect(body.name).toBe(inputData.name);
  expect(body.weight).toBe(inputData.weight);
  expect(body.color).toBe(inputData.color);
  expect(body.imageUrl).toBe(inputData.imageUrl);
  expect(body.storeId).toBeUndefined();
});

test('destroy store product', async ({ request }) => {
  const createProductBody = await PwHelpers.createDefaultProduct(request);
  const newProductId = createProductBody.id;

  const response = await request.delete(
    `/api/stores/${createProductBody.id}/products/${newProductId}`
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.msg).toBe('Deleted successfully');
});
