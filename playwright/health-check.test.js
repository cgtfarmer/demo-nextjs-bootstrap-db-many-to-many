// @ts-check
const { test, expect } = require('@playwright/test');

test('health check', async ({ request }) => {
  const response = await request.get('/api/health');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.status).toBe('Healthy');
});
