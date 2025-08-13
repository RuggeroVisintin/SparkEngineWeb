import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('CanvasDevice Visual Tests via Examples', () => {
    const frameTime = 1000;

    const waitForNextFrame = async (page) => {
        await page.waitForTimeout(frameTime + 100);
    }

    test.beforeEach(async ({ page }) => {
        // mocks the rendering loop to control frame rates
        await page.addInitScript(() => {
            let frameId = 0;
            (window as any).originalRequestAnimationFrame = window.requestAnimationFrame;
            window.requestAnimationFrame = (callback) => {
                frameId++;
                return setTimeout(() => callback(performance.now()), 1000) as unknown as number;
            };

            (window as any).setInterval = (callback, interval) => {
                frameId++;
                return setTimeout(() => callback(performance.now()), 1000) as unknown as number;
            }
        });
    });

    test('simpleRect example - basic rectangle rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleRect/index.html`, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('#canvas');
        await page.waitForTimeout(1100);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-rect.png');
    });

    test('simpleShapeColored example - filled shapes with colors', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeColored/index.html`);

        await page.waitForSelector('#canvas');
        await page.waitForTimeout(1100); // Wait for one slow frame

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-colored.png');
    });

    test('simpleShapeComponent example - component-based rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeComponent/index.html`);

        await page.waitForSelector('#canvas');
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-component.png');
    });

    test('simpleShapeTransparent example - opacity and transparency', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeTransparent/index.html`);

        await page.waitForSelector('#canvas');
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-transparent.png');
    });

    test('simpleShapeDepthIndex example - layering and depth', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeDepthIndex/index.html`);

        await page.waitForSelector('#canvas');
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-depth.png');
    });

    test('imageExample - image rendering with CanvasDevice', async ({ page }) => {
        await page.goto(`${BASE_URL}/imageExample/index.html`);

        await page.waitForSelector('#canvas');
        // Give more time for image loading
        await page.waitForTimeout(2000);
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('image-example.png');
    });

    test('animations example - specific frame testing', async ({ page }) => {
        await page.goto(`${BASE_URL}/animations/index.html`);

        await page.waitForSelector('#canvas');
        await page.waitForTimeout(3000);
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('animations-idle-state.png');
    });

    test('cameraMovement example - transform and camera operations', async ({ page }) => {
        await page.goto(`${BASE_URL}/cameraMovement/index.html`);

        await page.waitForSelector('#canvas');
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('camera-movement.png');
    });

    test('simpleCollision example - complex scene rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleCollision/index.html`);

        await page.waitForSelector('#canvas');
        await waitForNextFrame(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-collision.png');
    });
});
