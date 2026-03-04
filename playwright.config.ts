import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  // HTML report for local + CI (uploaded as artifact in GitHub Actions)
  reporter: [['html', { open: 'never' }]],

  // CI stability
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',

    // Artifacts on failure (required by the task)
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure', 
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});