import { CanvasDevice, DrawPrimitiveCommand, PrimitiveType, Renderer, ShapeComponent } from "../../../../src";

describe('ecs/components/ShapeComponent', () => {
    describe('.draw()', () => {
        const shapeComponent = new ShapeComponent();
        const renderer = new Renderer(new CanvasDevice());

        it('Should push the right draw command to the renderer', () => {
            shapeComponent.draw(renderer);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
            )]);
        })
    })
})