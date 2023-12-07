import { CanvasDevice, RenderSystem, Renderer, ShapeComponent } from "../../../../src";

describe('systems/RenderSystem', () => {


    describe('.registerComponent()', () => {
        const renderSystem = new RenderSystem(new Renderer(new CanvasDevice()));
        const myTestShape = new ShapeComponent();

        it('Should register the component into the RenderSystem components list', () => {
            renderSystem.registerComponent(myTestShape);

            expect(renderSystem.components).toContain(myTestShape);
        })
    })

    describe('.update()', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        })

        it('Should draw renderable object', () => {
            const renderSystem = new RenderSystem(new Renderer(new CanvasDevice()));
            const drawSpy = jest.spyOn(ShapeComponent.prototype, 'draw');

            renderSystem.registerComponent(new ShapeComponent());
            renderSystem.registerComponent(new ShapeComponent());

            renderSystem.update();

            expect(drawSpy).toHaveBeenCalledTimes(2);
            drawSpy.mockRestore();
        });

        it('Should render objects based on their depthIndex in reverse order (0 rendered last)', () => {
            const renderSystem = new RenderSystem(new Renderer(new CanvasDevice()));
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

        it('Should render object based on their transparency (transparent last)', () => {
            const renderSystem = new RenderSystem(new Renderer(new CanvasDevice()));
            const transparentComponent = new ShapeComponent();
            transparentComponent.material.opacity = 75;
            const component = new ShapeComponent();
            const component2 = new ShapeComponent();
            const component3 = new ShapeComponent();
            
            component2.transform.depthIndex = 1;

            renderSystem.registerComponent(transparentComponent);
            renderSystem.registerComponent(component);
            renderSystem.registerComponent(component2);
            renderSystem.registerComponent(component3);

            const drawSpyTransparent = jest.spyOn(transparentComponent, 'draw');
            const drawSpy3 = jest.spyOn(component3, 'draw');

            renderSystem.update();
            
            expect(drawSpyTransparent).toHaveBeenCalledAfter(drawSpy3);
        });
    })
})