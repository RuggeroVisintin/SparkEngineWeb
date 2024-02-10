import { CanvasDevice, HierarchySystem, InputComponent, InputSystem, KeyboardDevice, PhysicsSystem, Physx, RenderSystem, Renderer, Scene, SoundComponent, SoundLoader, SoundSystem, StaticObject } from "../../../src"

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
            const soundComponent = new SoundComponent('../test.sound', new SoundLoader());
            entity.addComponent(soundComponent);

            scene.registerEntity(entity);

            expect(scene.soundSystem.components).toContain(soundComponent);
        })
    })
})