import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test/visual',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Set timeouts */
    actionTimeout: 1000, // 1 second timeout for actions like waitForSelector
  },

  /* Global test timeout */
  timeout: 10000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use consistent viewport for CI
        viewport: { width: 1280, height: 720 },
      },
    },
  ],

  /* Expect configuration for visual tests */
  expect: {
    // Allow for slight differences between local and CI environments
    toHaveScreenshot: {
      threshold: process.env.CI ? 0.2 : 0.1,
      // Remove OS suffix from screenshot names - just use {testName}-{projectName}.png
      pathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',
    },
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run serve:examples',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes timeout for server startup
  },
});
