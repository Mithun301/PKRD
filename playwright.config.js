// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  /* Maximum time one test can run */
  timeout: 30 * 1000,

  /* Expect assertion timeout */
  expect: {
    timeout: 5000
  },

  /* Run tests in parallel */
  fullyParallel: false,

  /* Fail build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter configuration */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'reports/report.json' }]
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: 'https://wallet.pkrdcoin.com/',
   // 'https://www.pkrdcoin.com/',

    headless: false,

    launchOptions: {
      slowMo: 500, 
    },
  
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 10 * 1000,
    navigationTimeout: 60 * 1000,
  },

  /* Project configurations */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
