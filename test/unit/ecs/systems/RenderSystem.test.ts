import { CanvasDevice, RenderSystem, Renderer, ShapeComponent, DOMImageLoader, CameraComponent, SetTransformMatrixCommand } from "../../../../src";

describe('systems/RenderSystem', () => {
    let renderSystem: RenderSystem;
    let renderer: Renderer;

    beforeEach(() => {
        renderer = new Renderer(new CanvasDevice(), { width: 1920, height: 1080 }, new CanvasRenderingContext2D());
        renderSystem = new RenderSystem(renderer, new DOMImageLoader());
    })


    describe('.update()', () => {
        it('Should draw renderable object', () => {
            const drawSpy = jest.spyOn(ShapeComponent.prototype, 'draw');

            renderSystem.registerComponent(new ShapeComponent());
            renderSystem.registerComponent(new ShapeComponent());

            renderSystem.update();

            expect(drawSpy).toHaveBeenCalledTimes(2);
            drawSpy.mockRestore();
        });

        it('Should render objects based on their depthIndex in reverse order (0 rendered last)', () => {
            const component = new ShapeComponent();
            const component2 = new ShapeComponent();

            component2.transform.depthIndex = 1;

            renderSystem.registerComponent(component);
            renderSystem.registerComponent(component2);

            const drawSpy = jest.spyOn(component, 'draw');
            const drawSpy2 = jest.spyOn(component2, 'draw');

            renderSystem.update();

            expect(drawSpy2).toHaveBeenCalledBefore(drawSpy);
        });

        it('Should render the camera first', () => {
            const component = new ShapeComponent();

            const drawSpy = jest.spyOn(component, 'draw');
            const cameraSpy = jest.spyOn(renderSystem.camera, 'draw');

            renderSystem.registerComponent(component);
            renderSystem.update();

            expect(cameraSpy).toHaveBeenCalled();

            expect(cameraSpy).toHaveBeenCalledBefore(drawSpy);
        });

        it('Should use the registered camera if available', () => {
            const camera = new CameraComponent();

            const component = new ShapeComponent();
            const cameraSpy = jest.spyOn(camera, 'draw');

            renderSystem.registerComponent(camera);
            renderSystem.registerComponent(component);

            renderSystem.update();
            expect(cameraSpy).toHaveBeenCalled();
        });

        it('Should use the default camera if no camera is registered', () => {
            const component = new ShapeComponent();
            const cameraSpy = jest.spyOn(renderSystem.camera, 'draw');

            renderSystem.registerComponent(component);
            renderSystem.update();

            expect(cameraSpy).toHaveBeenCalled();
        });

        // it('Should use the default camera if the registered camera is not set to draw', () => { 
        //     const camera = new CameraComponent();
        //     camera.shouldDraw = false;

        //     const component = new ShapeComponent();
        //     const cameraSpy = jest.spyOn(camera, 'draw');

        //     renderSystem.registerComponent(camera);
        //     renderSystem.registerComponent(component);

        //     renderSystem.update();

        //     expect(cameraSpy).not.toHaveBeenCalled();
        // })
    });

    describe('.registerComponent()', () => {
        it('Should register a component', () => {
            const component = new ShapeComponent();
            renderSystem.registerComponent(component);

            expect(renderSystem.components).toContain(component);
        });

        it('Should override the default camera if a CameraComponent is registered', () => {
            const cameraComponent = new CameraComponent();

            renderSystem.registerComponent(cameraComponent);

            expect(renderSystem.camera).toBe(cameraComponent);
        });
    });

    describe('.camera', () => {
        it('Should return the current camera', () => {
            const camera = new CameraComponent();
            renderSystem.registerComponent(camera);

            expect(renderSystem.camera).toBe(camera);
        });

        it('Should return the default camera if no camera is registered', () => {
            expect(renderSystem.camera).toBeInstanceOf(CameraComponent);
        });
    });
})