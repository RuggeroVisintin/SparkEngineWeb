import { BaseSystem, GameEngine, RenderSystem } from "../../../src";
import { fakeSystemClock } from "../__mocks__/FakeSystemClock";

window.requestAnimationFrame = jest.fn((callback) => {
    // callback(0);
    return 0;
});

jest.mock("../../../src/ecs/systems/BaseSystem", () => {
    return {
        BaseSystem: jest.fn().mockImplementation(() => {
            return {
                update: jest.fn()
            }
        })
    }
});

jest.mock("../../../src/renderer/Renderer", () => {
    return {
        Renderer: jest.fn().mockImplementation(() => {
            return {
                update: jest.fn(),
                endFrame: jest.fn()
            }
        })
    }
});

describe('/engine/GameEngine', () => {
    let gameEngine: GameEngine;

    beforeEach(() => {
        fakeSystemClock.reset();
        gameEngine = new GameEngine({
            framerate: 60,
            resolution: { width: 800, height: 600 },
            context: new CanvasRenderingContext2D(),
            additionalRenderSystems: (renderer, imageLoader) => {
                return [new RenderSystem(renderer, imageLoader)];
            }
        });
    });

    describe('.run()', () => {
        it('Should update the frame based on the target framerate', () => {
            fakeSystemClock.frameTimes = [0, 16.67];

            gameEngine.run();
            gameEngine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.update).toHaveBeenCalled();
            }); 
            expect(gameEngine.inputSystem.update).toHaveBeenCalled();
            expect(gameEngine.physicsSystem.update).toHaveBeenCalled();
            expect(gameEngine.hierarchySystem.update).toHaveBeenCalled();
            expect(gameEngine.animationSystem.update).toHaveBeenCalled();
            expect(gameEngine.soundSystem.update).toHaveBeenCalled();
        });

        it('Should not update the frame when elapsed time is less than the target frametime', () => {
            fakeSystemClock.frameTimes = [0, 8.33];

            gameEngine.run();
            gameEngine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.update).not.toHaveBeenCalled();
            });
            expect(gameEngine.inputSystem.update).not.toHaveBeenCalled();
            expect(gameEngine.physicsSystem.update).not.toHaveBeenCalled();
            expect(gameEngine.hierarchySystem.update).not.toHaveBeenCalled();
            expect(gameEngine.animationSystem.update).not.toHaveBeenCalled();
            expect(gameEngine.soundSystem.update).not.toHaveBeenCalled();
        });

        it('Should end the frame after all systems have been updated on all renderers', () => {
            fakeSystemClock.frameTimes = [0, 16.67];

            gameEngine.run();
            gameEngine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.update).toHaveBeenCalled();
                expect(renderSystem.renderer.endFrame).toHaveBeenCalled();
            });
        });
    })
})