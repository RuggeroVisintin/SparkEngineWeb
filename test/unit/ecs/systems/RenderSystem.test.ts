import { CanvasDevice, RenderSystem, Renderer, ShapeComponent, DOMImageLoader } from "../../../../src";

describe('systems/RenderSystem', () => {
    let renderSystem: RenderSystem;

    describe('.update()', () => {

        beforeEach(() => {
            renderSystem = new RenderSystem(new Renderer(new CanvasDevice(), {width: 1920, height: 1080}, new CanvasRenderingContext2D()), new DOMImageLoader())
        })

        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        })

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
    })
})