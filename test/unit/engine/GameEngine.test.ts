import { GameEngine, Scene } from "../../../src";

describe('/game/GameEngine', () => {
    let engine: GameEngine;

    beforeEach(() => {
        engine = new GameEngine({
            context: new CanvasRenderingContext2D(),
            framerate: 30,
            resolution: { width: 1920, height: 1080 }
        });
    })

    describe('.createScene()', () => {
        it('Should create a new scene', () => {
            const scene = engine.createScene();
            expect(scene).toBeInstanceOf(Scene);
        })

        it('Should track the new scene in the engine scene list', () => {
            const scene = engine.createScene();
            expect(engine.scenes).toContain(scene);
        })

        it('Should set the newly created scene for drawing if it is the first scene in the list', () => {
            engine.createScene();
            expect(engine.scenes[0].shouldDraw).toBeTruthy();
        });

        it('Should not set the newly created scene for drawing if it is not the first scene in the list', () => {
            engine.createScene();
            engine.createScene();
            expect(engine.scenes[1].shouldDraw).toBeFalsy();
        });

        it('Should set the newly created scene for drawing if requested', () => {
            const scene = engine.createScene(true);
            expect(scene.shouldDraw).toBeTruthy();
        });
    });
})