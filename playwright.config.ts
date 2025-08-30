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
  outputDir: 'test-results/visual/test-output',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  reporter: [
    ['html', {
      outputFolder: 'test-results/visual/reports/html',
      open: process.env.CI ? 'never' : 'on-failure'
    }],
    ...(process.env.CI ? [['list', {}] as const] : [])
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 1000, // 1 second timeout for actions like waitForSelector
    launchOptions: {
      args: [
        '--disable-gpu-sandbox',
        '--disable-software-rasterizer',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--force-gpu-mem-available-mb=1024',
      ]
    }
  },
  timeout: 20000,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use consistent viewport for CI
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  expect: {
    toHaveScreenshot: {
      pathTemplate: process.env.CI
        ? 'test-results/visual/snapshots/{testFileDir}/{testFileName}-ci-snapshots/{arg}{ext}'
        : 'test-results/visual/snapshots/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',
    },
  },

  webServer: {
    command: 'npm run serve:examples',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 20000
  },
});
