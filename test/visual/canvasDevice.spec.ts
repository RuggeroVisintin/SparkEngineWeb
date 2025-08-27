import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('CanvasDevice Visual Tests via Examples', () => {
    const triggerNextFrames = async (page, count = 1) => {
        for (let i = 0; i < count; i++) {
            await page.evaluate(async () => {
                if ((window as any).triggerFrame) {
                    (window as any).triggerFrame();
                }
            });
        }

        page.waitForTimeout(100);
    }

    test.beforeEach(async ({ page }) => {
        // Mock the rendering loop to be manually controlled
        await page.addInitScript(() => {
            let frameId = 0;
            let frameCallbacks: Array<(time: number) => void> = [];

            // Store original functions
            (window as any).originalRequestAnimationFrame = window.requestAnimationFrame;
            (window as any).originalSetInterval = window.setInterval;

            // Override requestAnimationFrame to store callbacks instead of executing them
            window.requestAnimationFrame = (callback) => {
                frameId++;
                frameCallbacks.push(callback);
                return frameId;
            };

            // Override setInterval for game loops
            (window as any).setInterval = (callback, interval) => {
                frameId++;
                frameCallbacks.push(() => callback());
                return frameId;
            }

            // Provide a function to manually trigger frame rendering
            (window as any).triggerFrame = () => {
                const currentTime = performance.now();
                const callbacks = [...frameCallbacks];
                frameCallbacks = []; // Clear callbacks after capturing them
                callbacks.forEach(callback => {
                    try {
                        callback(currentTime);
                    } catch (e) {
                        console.error('Frame callback error:', e);
                    }
                });
            };
        });
    });

    test('simpleRect example - basic rectangle rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleRect/index.html`, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-rect.png');
    });

    test('simpleShapeColored example - filled shapes with colors', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeColored/index.html`);

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-colored.png');
    });

    test('simpleShapeComponent example - component-based rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeComponent/index.html`);

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-component.png');
    });

    test('simpleShapeTransparent example - opacity and transparency', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeTransparent/index.html`);

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-transparent.png');
    });

    test('simpleShapeDepthIndex example - layering and depth', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeDepthIndex/index.html`);

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-depth.png');
    });

    test('imageExample - image rendering with CanvasDevice', async ({ page }) => {
        await page.goto(`${BASE_URL}/imageExample/index.html`);

        await page.waitForSelector('#canvas');
        // Give more time for image loading
        await page.waitForTimeout(2000);
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('image-example.png');
    });

    test('animations example - specific frame testing', async ({ page }) => {
        await page.goto(`${BASE_URL}/animations/index.html`);

        await page.waitForSelector('#canvas');
        await page.locator('#canvas').focus();

        await page.waitForTimeout(1000); // Wait for animation setup
        await triggerNextFrames(page);

        await expect(page.locator('#canvas')).toHaveScreenshot('animations-idle-state.png');

        await page.keyboard.down('p');
        await triggerNextFrames(page, 3); // Advance several frames

        // Check play state
        await expect(page.locator('#canvas')).toHaveScreenshot('animations-play-state.png');
    });

    test('cameraMovement example - transform and camera operations', async ({ page }) => {
        await page.goto(`${BASE_URL}/cameraMovement/index.html`);

        await page.waitForSelector('#canvas');
        await page.locator('#canvas').focus();
        await triggerNextFrames(page);

        await page.keyboard.down('w');
        await triggerNextFrames(page, 10);
        await page.keyboard.up('w');
        await expect(page.locator('#canvas')).toHaveScreenshot('camera-movement.png');

        // Test zoom in
        await page.keyboard.down('z');
        await triggerNextFrames(page, 10);
        await page.keyboard.up('z');
        await expect(page.locator('#canvas')).toHaveScreenshot('camera-zoom-in.png');


        // Test zoom out
        await page.keyboard.down('x');
        await triggerNextFrames(page, 10);
        await page.keyboard.up('x');
        await expect(page.locator('#canvas')).toHaveScreenshot('camera-zoom-out.png');
    });

    test('simpleCollision example - complex scene rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleCollision/index.html`);

        await page.waitForSelector('#canvas');
        await triggerNextFrames(page, 5000);

        await expect(page.locator('#canvas')).toHaveScreenshot('simple-collision.png');
    });

    test('pushTheObject example - object pushing and collision', async ({ page }) => {
        await page.goto(`${BASE_URL}/pushTheObject/index.html`);

        await page.waitForSelector('#canvas');

        // Focus the canvas to ensure it receives key events
        await page.locator('#canvas').focus();

        // Trigger initial frame to set up the scene
        await triggerNextFrames(page);
        await page.keyboard.down('s');

        await triggerNextFrames(page, 5000);

        // Trigger a few more frames to show the final collision state
        await triggerNextFrames(page);

        // allow a small margin of error for pixel differences due to physx simulation instability
        await expect(page.locator('#canvas')).toHaveScreenshot('push-the-object.png', { maxDiffPixelRatio: 0.01 });
    });
});
