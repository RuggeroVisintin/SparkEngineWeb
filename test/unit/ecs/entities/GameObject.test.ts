import { ComponentProps, GameObject, GameObjectProps, IComponent, MaterialComponent, MaterialComponentProps, PrimitiveType, Rgb, ShapeComponent, ShapeComponentProps, TransformComponent, TransformComponentProps, Vec2, WithType } from "../../../../src"

describe('ecs/entities/GameObject', () => {
    let gameObject: GameObject;

    beforeEach(() => {
        gameObject = new GameObject();
    })

    describe('.constructor()', () => {
        it('Should have a transform by default', () => {
            expect(gameObject.transform).toBeDefined();
        });

        it('Should register the transform to the entity', () => {
            expect(gameObject.transform.getContainer()).toBe(gameObject);
        });

        it('Should have a material by default', () => {
            expect(gameObject.material).toBeDefined();
        });

        it('Should register the transform to the entity', () => {
            expect(gameObject.material.getContainer()).toBe(gameObject);
        });

        it('Should have a shape by default', () => {
            expect(gameObject.shape).toBeDefined();
        });

        it('Should register the transform to the entity', () => {
            expect(gameObject.shape.getContainer()).toBe(gameObject);
        });

        it('Should create a transform with given configuration', () => {
            const transformConfig: TransformComponentProps = {
                size: { width: 10, height: 10 },
                position: new Vec2(10, 10),
                depthIndex: 3
            };

            const gameObject = new GameObject({
                transform: transformConfig
            })

            expect(gameObject.transform).toContainEntries(Object.entries(transformConfig))
        });

        it('Should create a shape with given configuration', () => {
            const shapeConfig: ShapeComponentProps = {
                shapeType: PrimitiveType.Rectangle
            };

            const gameObject = new GameObject({
                shape: shapeConfig
            })

            expect(gameObject.shape).toContainEntries(Object.entries(shapeConfig))
        });

        it('Should create a material with given configuration', () => {
            const materialConfig: MaterialComponentProps = {
                diffuseColor: new Rgb(255, 0, 0),
                opacity: 100
            };

            const gameObject = new GameObject({
                material: materialConfig
            })

            expect(gameObject.material).toEqual(expect.objectContaining(materialConfig))
        });

        it('Should support dynamic components registration', () => {
            const transformComponent = new TransformComponent({
                position: new Vec2(10, 10),
            });

            const gameObject = new GameObject({
                components: [
                    transformComponent.toJson(),
                ]
            });

            expect(gameObject.getComponent<TransformComponent>('TransformComponent')?.toJson()).toEqual(transformComponent.toJson());
        });

        it.each([
            { transform: new TransformComponent().toJson() },
            { material: new MaterialComponent().toJson() },
            { shape: new ShapeComponent().toJson() }
        ])('Should register the same component only once', (partialConfig: Partial<GameObjectProps>) => {
            let config = {
                ...partialConfig,
                components: Object.values(partialConfig).map(c => c as WithType<ComponentProps>)
            };

            const gameObject = new GameObject(config);

            expect(gameObject.toJson().components).toHaveLength(3); // transform, material, shape
        });
    })

    describe('.toJson()', () => {
        it('Should return a json representation of the game object', () => {
            const gameObject = new GameObject();

            const json = gameObject.toJson();

            expect(json).toEqual({
                __type: 'GameObject',
                name: gameObject.name,
                components: expect.arrayContaining([
                    gameObject.transform.toJson(),
                    gameObject.material.toJson(),
                    gameObject.shape.toJson()
                ])
            })
        });
    })
})