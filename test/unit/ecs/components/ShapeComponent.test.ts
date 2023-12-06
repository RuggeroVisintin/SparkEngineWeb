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

    describe('.transform', () => {
        it('Should retrieve the component default transform when no container entity is defined', () => {
            const shapeComponent = new ShapeComponent();
            shapeComponent.transform.depthIndex = 2;

            expect(shapeComponent.transform).toEqual({
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 },
                depthIndex: 2
            })
        
        })

        it.todo('Should retrieve the transform from container entity when defined')
    });

    describe('.material', () => {
        it('Should retrieve the component default material when no container entity is defined', () => {
            const shapeComponent = new ShapeComponent();
            shapeComponent.material.diffuseColor = 'red';

            expect(shapeComponent.material).toEqual({
                diffuseColor: 'red'
            })
        });

        it.todo('Should retrieve the material from container entity when defined');
    })

})