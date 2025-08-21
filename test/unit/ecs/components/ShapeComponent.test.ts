import { CanvasDevice, Rgb, DrawPrimitiveCommand, PrimitiveType, Renderer, ShapeComponent, BaseEntity, MaterialComponent, ShapeComponentProps, DrawImageCommand, DOMImageLoader } from "../../../../src";
import { BaseDrawableComponent } from "../../../../src/ecs/components/ BaseDrawableComponent";
import '../../__mocks__';
import { asyncTick } from '../../utils';

describe('ecs/components/ShapeComponent', () => {
    let renderer: Renderer;
    let shapeComponent = new ShapeComponent();

    const imageLoader = new DOMImageLoader();

    beforeEach(() => {
        renderer = new Renderer(new CanvasDevice(), { width: 1920, height: 1080 }, new CanvasRenderingContext2D());
        shapeComponent = new ShapeComponent();
    });

    it('Should extend BaseDrawableComponent', () => {
        expect(shapeComponent).toBeInstanceOf(BaseDrawableComponent);
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
            shapeComponent.draw(renderer, imageLoader);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
            )]);
        })

        it('Should push the current transform in the render command', () => {
            shapeComponent.transform.position.x = 3;
            shapeComponent.draw(renderer, imageLoader);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [3, 0],
                [0, 0]
            )]);
        })

        it('Should push the current material diffuse color in the render command', () => {
            const color = new Rgb(255, 0, 0);
            shapeComponent.material.diffuseColor = color;
            shapeComponent.draw(renderer, imageLoader);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
                1,
                expect.any(Boolean),
                'rgba(255, 0, 0, 1)'
            )]);
        });

        it('Should push the current material diffuse texture in the render command if present', (done) => {
            shapeComponent.material.diffuseTexturePath = 'test.png';
            shapeComponent.material.loadTexture(new DOMImageLoader());

            setTimeout(() => {
                shapeComponent.draw(renderer, imageLoader);

                expect(renderer.commandBuffer).toEqual(expect.arrayContaining([new DrawImageCommand(
                    shapeComponent.material.diffuseTexture?.media!,
                    [0, 0],
                    [0, 0]
                )]));

                done();
            }, 10)

        });

        it('Should load the material current diffuse texture if present', async () => {
            shapeComponent.material.diffuseTexturePath = 'test.png';
            shapeComponent.draw(renderer, imageLoader);

            await asyncTick();

            expect(shapeComponent.material.diffuseTexture).toBeDefined();
        })
    })

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
            shapeComponent.draw(renderer, imageLoader);

            expect(renderer.commandBuffer).toEqual([new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0],
                1,
                false
            )]);
        })
    })

    describe('.toJson()', () => {
        it('Should return the correct JSON representation', () => {
            const json = shapeComponent.toJson();

            expect(json).toEqual(expect.objectContaining({
                __type: 'ShapeComponent',
                shapeType: PrimitiveType.Rectangle,
                isWireframe: false
            }))
        })
    })

});
