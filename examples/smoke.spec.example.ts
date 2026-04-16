// Example smoke test — copy to `tests/smoke.spec.ts` and adapt.
//
// This is the bare minimum to prove the preview-environment CI gate works:
// load the homepage and assert a 200, plus check one element that should
// always be present. In a real repo you'd add login flows, checkout flows,
// or whatever critical paths your blog post talked about as Level 3 coverage.
//
// Notice there's no hardcoded URL here. Playwright's baseURL comes from
// BASE_URL in CI (injected by the preview-e2e workflow) or from
// playwright.config.ts locally.

import { expect, test } from '@playwright/test';

test('homepage responds and renders', async ({ page }) => {
  const response = await page.goto('/');
  expect(response, 'page.goto returned no response').not.toBeNull();
  expect(response!.status(), `unexpected status from ${response!.url()}`).toBeLessThan(400);

  // Replace with a selector that's always present on your homepage.
  await expect(page.locator('body')).toBeVisible();
});

test('health endpoint returns 2xx', async ({ request }) => {
  // Many apps expose /health or /api/health for uptime checks. If yours doesn't,
  // delete this test — the smoke test above is enough to prove the CI wiring.
  const res = await request.get('/health', { failOnStatusCode: false });
  // Accept either a healthy 2xx or a 404 (endpoint simply doesn't exist yet).
  // Anything 5xx means the preview is actually broken.
  expect([200, 204, 404]).toContain(res.status());
});
