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
        const renderSystem = new RenderSystem(new Renderer(new CanvasDevice()));

        it('Should draw renderable object', () => {
            const drawSpy = jest.spyOn(ShapeComponent.prototype, 'draw');

            renderSystem.registerComponent(new ShapeComponent());
            renderSystem.registerComponent(new ShapeComponent());

            renderSystem.update();

            expect(drawSpy).toHaveBeenCalledTimes(2);
        });

        it.todo('Should render objects based on their depthIndex in reverse order (0 rendered last)')

        it.todo('Should render object based on their transparency (transparent last)')
    })
})