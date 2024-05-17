import { CanvasDevice, Rgb, DrawPrimitiveCommand, PrimitiveType, Renderer, ShapeComponent, BaseEntity, TransformComponent, MaterialComponent, ShapeComponentProps, DrawImageCommand, ImageLoader } from "../../../../src";
import '../../__mocks__';

describe('ecs/components/ShapeComponent', () => {
    let renderer: Renderer;
    let shapeComponent = new ShapeComponent();
        
    beforeEach(() => {
        renderer = new Renderer(new CanvasDevice(), {width: 1920, height: 1080}, new CanvasRenderingContext2D());
        shapeComponent = new ShapeComponent();
    });

    describe('.constructor()', () => {
        // TODO: add default tests

        it('Should init the component with given props', () => {
            const init: ShapeComponentProps = {
                shapeType: PrimitiveType.Rectangle
            }

            expect(new ShapeComponent(init)).toEqual(expect.objectContaining(init))
        })
    })
    
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

        it('Should push the current material diffuse color in the render command', () => {
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
        });

        it('Should push the current material diffuse texture in the render command if present', (done) => {
            shapeComponent.material.diffuseTexturePath = 'test.png';
            shapeComponent.material.loadTexture(new ImageLoader());

            setTimeout(() => {
                shapeComponent.draw(renderer);
                
                expect(renderer.commandBuffer).toEqual(expect.arrayContaining([new DrawImageCommand(
                    shapeComponent.material.diffuseTexture?.media!,
                    [0, 0],
                    [0, 0]
                )]));

                done();
            }, 10)

        });
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
    });

    describe('.isWireframe', () => {
        it('Should not fill the entity during the draw pass when set to true', () => {
            shapeComponent.isWireframe = true;
            shapeComponent.draw(renderer);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
                false
            )]);
        })
    })

})