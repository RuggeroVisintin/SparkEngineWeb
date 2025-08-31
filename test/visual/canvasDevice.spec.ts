import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('CanvasDevice Visual Tests via Examples', () => {
    const triggerNextFrames = async (page, count = 1) => {
        await page.evaluate(() => {
            window['isLastFrame'] = false;
        });

        for (let i = 0; i < count; i++) {

            if (i === count - 1) {
                await page.evaluate(() => {
                    window['isLastFrame'] = true;

                    if ((window as any).triggerFrame) {
                        console.log('Triggering last frame...', window['isLastFrame']);
                        (window as any).triggerFrame();
                    }

                    window['isLastFrame'] = false;
                });
            } else {
                await page.evaluate(async () => {
                    if ((window as any).triggerFrame) {
                        console.log('Triggering frame...');
                        (window as any).triggerFrame();
                    }
                });
            }


        }

        await page.waitForTimeout(100);
    }

    const waitReady = async (page) => {
        await page.waitForSelector('#canvas');
        await page.waitForFunction(() => window['__engineReady'] === true, { timeout: 5000 });
        await page.waitForTimeout(1000);
    }

    test.beforeEach(async ({ page }) => {
        // Mock the rendering loop to be manually controlled
        await page.addInitScript(() => {
            let engineTick: (time: number) => void;
            let fakeTime = performance.now();
            window.performance.now = () => {
                return fakeTime;
            };

            window.requestAnimationFrame = (callback) => {
                engineTick = function (time) { callback(time) };
                return 1;
            };

            (window as any).setInterval = (callback, interval) => {
                engineTick = function (time) { callback(time) };
                return 1;
            }

            // Provide a function to manually trigger frame rendering
            (window as any).triggerFrame = () => {
                // Ensure enough fake time has passed
                fakeTime += 1000;
                engineTick(fakeTime);
            };

            window['isLastFrame'] = false;

            function initRendererMock() {
                const sparkEngine: any = window['SparkEngine'];

                if (typeof sparkEngine !== 'undefined' && !!sparkEngine.Renderer) {
                    // Mock SparkEngine.Renderer.prototype.endFrame unless window.__ALLOW_REAL_ENDFRAME__ is true
                    const originalFn = sparkEngine.Renderer?.prototype?.pushRenderCommand;

                    sparkEngine.Renderer.prototype.pushRenderCommand = function (...args) {
                        if (window['isLastFrame'] === true) {
                            return originalFn.apply(this, args);
                        }
                    };


                    window['__engineReady'] = true; // Set ready flag
                } else {
                    setTimeout(initRendererMock, 10); // Try again in 10ms
                }
            }

            initRendererMock();
        });

    });

    test('simpleRect example - basic rectangle rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleRect/index.html`);
        await waitReady(page);

        await triggerNextFrames(page);
        await expect(page.locator('#canvas')).toHaveScreenshot('simple-rect.png');
    });

    test('simpleShapeColored example - filled shapes with colors', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeColored/index.html`);
        await waitReady(page);

        await triggerNextFrames(page);
        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-colored.png');
    });

    test('simpleShapeComponent example - component-based rendering', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeComponent/index.html`);
        await waitReady(page);

        await triggerNextFrames(page);
        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-component.png');
    });

    test('simpleShapeTransparent example - opacity and transparency', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeTransparent/index.html`);
        await waitReady(page);

        await triggerNextFrames(page);
        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-transparent.png');
    });

    test('simpleShapeDepthIndex example - layering and depth', async ({ page }) => {
        await page.goto(`${BASE_URL}/simpleShapeDepthIndex/index.html`);
        await waitReady(page);

        await triggerNextFrames(page);
        await expect(page.locator('#canvas')).toHaveScreenshot('simple-shape-depth.png');
    });

    test('animations example - specific frame testing', async ({ page }) => {
        await page.goto(`${BASE_URL}/animations/index.html`);
        await waitReady(page);

        await page.waitForTimeout(1000); // Wait for animation setup
        await triggerNextFrames(page);

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
        await waitReady(page);

        await triggerNextFrames(page);

        await page.keyboard.down('w');
        await triggerNextFrames(page, 60);
        await page.keyboard.up('w');
        await expect(page.locator('#canvas')).toHaveScreenshot('camera-movement.png');

        // Test zoom in
        await page.keyboard.down('z');
        await triggerNextFrames(page, 30);
        await page.keyboard.up('z');

        await expect(page.locator('#canvas')).toHaveScreenshot('camera-zoom-in.png');

        // Test zoom out
        await page.keyboard.down('x');
        await triggerNextFrames(page, 30);
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
        await waitReady(page);

        // Trigger initial frame to set up the scene
        await triggerNextFrames(page);
        await page.keyboard.down('s');

        await triggerNextFrames(page, 5000);

        // allow a small margin of error for pixel differences due to physx simulation instability
        await expect(page.locator('#canvas')).toHaveScreenshot('push-the-object.png', { maxDiffPixelRatio: 0.01 });
    });
});
