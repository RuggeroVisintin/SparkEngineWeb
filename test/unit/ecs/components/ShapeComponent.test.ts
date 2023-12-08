import { CanvasDevice, Rgb, DrawPrimitiveCommand, PrimitiveType, Renderer, ShapeComponent, BaseEntity, TransformComponent, MaterialComponent } from "../../../../src";

describe('ecs/components/ShapeComponent', () => {
    let renderer = new Renderer(new CanvasDevice());
    let shapeComponent = new ShapeComponent();
        
    afterEach(() => {
        renderer = new Renderer(new CanvasDevice());
        shapeComponent = new ShapeComponent();
    });
    
    describe('.draw()', () => {
        it('Should push the right draw command to the renderer', () => {
            shapeComponent.draw(renderer);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
            )]);
        })

        it('Should push the current transform in the render command', () => {
            shapeComponent.transform.position.x = 3;
            shapeComponent.draw(renderer);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [3, 0],
                [0, 0]
            )]);
        })

        it('Should push the current material in the render command', () => { 
            const color = new Rgb(255, 0, 0);
            shapeComponent.material.diffuseColor = color;
            shapeComponent.draw(renderer);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
                expect.any(Boolean),
                'rgba(255, 0, 0, 1)'
            )]);
        })
    })

    describe('.transform', () => {
        it('Should retrieve the component default transform when no container entity is defined', () => {
            shapeComponent.transform.depthIndex = 2;

            expect(shapeComponent.transform).toEqual(expect.objectContaining({
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 },
                depthIndex: 2
            }))
        })

        it('Should retrieve the transform from container entity when defined', () => {
            const transformComponent = new TransformComponent();
            transformComponent.depthIndex = 4;

            const shapeComponent = new ShapeComponent();
            const entity = new BaseEntity()
            entity.addComponent(shapeComponent);
            entity.addComponent(transformComponent);

            expect(shapeComponent.transform).toEqual(expect.objectContaining({
                depthIndex: 4
            }))
        })
    });

    describe('.material', () => {
        it('Should retrieve the component default material when no container entity is defined', () => {
            const color = new Rgb(255, 0, 0);
            shapeComponent.material.diffuseColor = color;

            expect(shapeComponent.material).toEqual(expect.objectContaining({
                diffuseColor: color
            }))
        });

        it('Should retrieve the material from container entity when defined', () => {
            const materialComponent = new MaterialComponent();
            materialComponent.opacity = 40;

            const shapeComponent = new ShapeComponent();
            const entity = new BaseEntity()
            entity.addComponent(shapeComponent);
            entity.addComponent(materialComponent);

            expect(shapeComponent.material).toEqual(expect.objectContaining({
                opacity: 40
            }))
        });
    })

})