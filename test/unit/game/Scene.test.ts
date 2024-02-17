import { fetchMockData } from "../__mocks__/Fetch";
import { CanvasDevice, GameObject, HierarchySystem, InputComponent, InputSystem, KeyboardDevice, PhysicsSystem, Physx, PrimitiveType, RenderSystem, Renderer, Rgb, Scene, SoundComponent, SoundLoader, SoundSystem, StaticObject, Vec2 } from "../../../src"
import { defaultEntitiesScene, entitiesWithComponents } from "../__mocks__/scenes";

jest.mock('uuid', () => ({
    v4: () => 'test-uuid'
}))


describe('/game/Scene', () => {
    let scene: Scene;

    beforeEach(() => {
        scene = new Scene(
            new RenderSystem(new Renderer(new CanvasDevice(), { width: 1024, height: 720 }, new CanvasRenderingContext2D())),
            new PhysicsSystem(new Physx()),
            new InputSystem(new KeyboardDevice()),
            new HierarchySystem(),
            new SoundSystem()
        );
    })

    describe('.createEntity()', () => {
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

            expect(scene.hierarchySystem.world).toContain(entity.transform);
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

    describe('.load()', () => {
        it('Should load all entities from the scene', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(defaultEntitiesScene),
            });
            
            await scene.load('test.scene.json');

            expect(scene.entities).toEqual([
                expect.objectContaining(new GameObject()),
                expect.objectContaining(new GameObject())
            ]);
        })

        it('Should load the entities configuration as well', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(entitiesWithComponents),
            });

            await scene.load('test.scene.json');

            expect(scene.entities).toEqual([
                expect.objectContaining(new GameObject({
                    transform: {
                        position: new Vec2(1, 2),
                        size: { width: 100, height: 50 }
                    },
                    shape: {
                        shapeType: PrimitiveType.Rectangle
                    }
                })),
                expect.objectContaining(new GameObject({
                    transform: {
                        position: new Vec2(10, 20),
                        size: { width: 100, height: 50 }
                    },
                    shape: {
                        shapeType: PrimitiveType.Rectangle
                    },
                    material: {
                        diffuseColor: new Rgb(255)
                    }
                }))
            ]);
        })
    })
})