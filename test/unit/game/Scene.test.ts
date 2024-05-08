import { fetchMockData } from "../__mocks__/Fetch";
import { AnimationSystem, CanvasDevice, HierarchySystem, InputComponent, InputSystem, KeyboardDevice, PhysicsSystem, Physx, PrimitiveType, RenderSystem, Renderer, Rgb, Scene, SoundComponent, SoundLoader, SoundSystem, StaticObject, TransformComponent, Vec2 } from "../../../src"
import { defaultEntitiesScene, entitiesWithComponents } from "../__mocks__/scenes";


describe('/game/Scene', () => {
    let scene: Scene;

    beforeEach(() => {
        scene = new Scene(
            new RenderSystem(new Renderer(new CanvasDevice(), { width: 1024, height: 720 }, new CanvasRenderingContext2D())),
            new PhysicsSystem(new Physx()),
            new InputSystem(new KeyboardDevice()),
            new HierarchySystem(),
            new SoundSystem(),
            new AnimationSystem(),
        );
    })

    describe('.registerEntity()', () => {
        it('Should register the entity into the scene', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);
            
            expect(scene.entities).toContain(entity);
        });

        it('Should register entity shape components into its render system', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);

            expect(scene.renderSystem.components).toContain(entity.shape);
        });

        it('Should register entity physics components into its physics system', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);

            expect(scene.physicsSystem.components).toContain(entity.boundingBox);
        });

        it('Should register entity input components into its input system', () => {
            const entity = new StaticObject();
            const inputComponent = new InputComponent();
            entity.addComponent(inputComponent);

            scene.registerEntity(entity);

            expect(scene.inputSystem.components).toContain(inputComponent);
        })

        it('Should register entity transform components into its hierarchy system', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);

            expect(scene.hierarchySystem.components).toContain(entity.transform);
        })

        it('Should register entity sound components into its sound system', () => {
            const entity = new StaticObject();
            const soundComponent = new SoundComponent({
                filePath: 'test.mp3'
            });
            entity.addComponent(soundComponent);

            scene.registerEntity(entity);

            expect(scene.soundSystem.components).toContain(soundComponent);
        });
    });

    describe('.unregisterEntity()', () => {
        let entity: StaticObject;
        let inputComponent: InputComponent;
        let soundComponent: SoundComponent;

        beforeEach(() => {
            entity = new StaticObject();
            inputComponent = new InputComponent();
            soundComponent = new SoundComponent({filePath: 'test.mp3'});

            entity.addComponent(inputComponent);
            entity.addComponent(soundComponent);

            scene.registerEntity(entity);
        })

        it('Should remove the entity from the scene', () => {            
            scene.unregisterEntity(entity.uuid);
            expect(scene.entities).not.toContain(entity);
        });

        it('Should not throw if entity is not found', () => {
            expect(
                () => scene.unregisterEntity(new StaticObject().uuid)
            ).not.toThrow();

            expect(scene.entities).toEqual([entity]);
        });

        it('Should unregister entity shape components into its render system', () => {
            scene.unregisterEntity(entity.uuid)

            expect(scene.renderSystem.components).not.toContain(entity.shape);
        });

        it('Should unregister entity physics components into its physics system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(scene.physicsSystem.components).not.toContain(entity.boundingBox);
        });

        it('Should unregister entity input components into its input system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(scene.inputSystem.components).not.toContain(inputComponent);
        })

        it('Should unregister entity transform components into its hierarchy system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(scene.hierarchySystem.components).not.toContain(entity.transform);
        })

        it('Should unregister entity sound components into its sound system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(scene.soundSystem.components).not.toContain(soundComponent);
        });
    })

    describe('.load()', () => {
        it('Should load all entities from the scene', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(defaultEntitiesScene),
            });
            
            await scene.load('test.scene.json');

            expect(scene.entities).toEqual([
                expect.objectContaining({
                    __type: 'GameObject',
                    _name: 'testEntity1',
                }),
                expect.objectContaining({
                    __type: 'GameObject',
                    _name: 'testEntity2',
                })
            ]);
        })

        it('Should load the entities configuration as well', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(entitiesWithComponents),
            });

            await scene.load('test.scene.json');

            expect(scene.entities).toEqual([
                expect.objectContaining({
                    __type: 'GameObject',
                    _name: 'testEntity5',
                    transform: expect.objectContaining({
                        position: new Vec2(1, 2),
                        size: { width: 100, height: 50 }
                    }),
                    shape: expect.objectContaining({
                        shapeType: PrimitiveType.Rectangle
                    })
                }),
                expect.objectContaining({
                    __type: 'GameObject',
                    _name: 'testEntity6',
                    transform: expect.objectContaining({
                        position: new Vec2(10, 20),
                        size: { width: 100, height: 50 }
                    }),
                    shape: expect.objectContaining({
                        shapeType: PrimitiveType.Rectangle
                    }),
                    material: expect.objectContaining({
                        diffuseColor: new Rgb(255)
                    })
                })
            ]);
        });

        it('Should load the entities name when loading a scene', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve({
                    entities: {
                        testEntity15: {
                            __type: 'BaseEntity'
                        },
                        testEntity16: {
                            __type: 'BaseEntity'
                        },
                    }
                }),
            });

            await scene.load('test.scene.json');

            expect(scene.entities[0].name).toEqual('testEntity15');
            expect(scene.entities[1].name).toEqual('testEntity16');
        })
    })
})