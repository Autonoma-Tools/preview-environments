// Example playwright.config.ts — copy this to your repo root (as
// playwright.config.ts) and adapt the test directory / projects to your setup.
//
// The important bit for preview-environment testing is `use.baseURL`, which
// reads from BASE_URL injected by .github/workflows/preview-e2e.yml.
//
// When running locally you can point it at your dev server:
//   BASE_URL=http://localhost:3000 npx playwright test
//
// In CI the workflow sets BASE_URL to the live preview deployment URL, so the
// exact same tests run against the exact commit your provider just deployed.

import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  // Retry in CI to tolerate transient network blips against a fresh preview.
  retries: process.env.CI ? 2 : 0,
  // Fail the run if someone accidentally left `test.only` in a file.
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
