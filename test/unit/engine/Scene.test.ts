import { GameObject, InputComponent, PrimitiveType, Rgb, Scene, SoundComponent, StaticObject, Vec2, GameEngine, RenderSystem } from "../../../src";
import { fetchMockData } from "../__mocks__/Fetch";
import { defaultEntitiesScene, entitiesWithComponents } from "../__mocks__/scenes";

describe('/game/Scene', () => {
    let scene: Scene;
    let engine: GameEngine;


    beforeEach(() => {
        engine = new GameEngine({
            framerate: 60,
            context: new CanvasRenderingContext2D(),
            resolution: {
                width: 800,
                height: 600
            },
            additionalRenderSystems: (renderer, imageLoader) => {
                return [
                    new RenderSystem(renderer, imageLoader),
                    new RenderSystem(renderer, imageLoader)
                ];
            }
        });

        scene = new Scene();
    })

    describe('.draw()', () => {
        it('Should flag the scene to be drawn', () => {
            scene.draw(engine);

            expect(scene.shouldDraw).toBeTruthy();
        })

        it('Should register the scene entities components into each system of the given engine', () => {
            scene.registerEntity(new StaticObject());

            scene.draw(engine);

            engine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.components).not.toBeEmpty();
            });
            expect(engine.physicsSystem.components).not.toBeEmpty();
        });

        it('Should hide and remove the scene from the previous engine instance if any', () => {
            const previousEngine = new GameEngine({
                framerate: 60,
                context: new CanvasRenderingContext2D(),
                resolution: {
                    width: 800,
                    height: 600
                }
            });

            const scene = new Scene();
            scene.registerEntity(new StaticObject());

            scene.draw(previousEngine);
            scene.draw(engine);

            expect(previousEngine.renderSystems[0].components).toBeEmpty();
            expect(previousEngine.physicsSystem.components).toBeEmpty();
            expect(previousEngine.inputSystem.components).toBeEmpty();
            expect(previousEngine.hierarchySystem.components).toBeEmpty();
            expect(previousEngine.soundSystem.components).toBeEmpty();
            expect(previousEngine.animationSystem.components).toBeEmpty();
        })
    })

    describe('.hide()', () => {
        beforeEach(() => {
            scene.draw(engine);
        })

        it('Should flag the scene to not be drawn', () => {
            scene.hide();

            expect(scene.shouldDraw).toBeFalse();
        });

        it('Should unregister the scene entities components from each system', () => {
            scene.registerEntity(new StaticObject());

            scene.hide();

            engine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.components).toBeEmpty();
            });
            expect(engine.physicsSystem.components).toBeEmpty();
        });
    });

    describe('.registerEntity()', () => {
        it('Should register the entity into the scene', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);

            expect(scene.entities).toContain(entity);
        });

        describe('When scene is drawn', () => {
            beforeEach(() => {
                scene.draw(engine);
            })

            it('Should register entity shape components into its render system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.renderSystems[0].components).toContain(entity.shape);
            });

            it('Should register entity physics components into its physics system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.physicsSystem.components).toContain(entity.boundingBox);
            });

            it('Should register entity input components into its input system', () => {
                const entity = new StaticObject();
                const inputComponent = new InputComponent();
                entity.addComponent(inputComponent);

                scene.registerEntity(entity);

                expect(engine.inputSystem.components).toContain(inputComponent);
            })

            it('Should register entity transform components into its hierarchy system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.hierarchySystem.components).toContain(entity.transform);
            })

            it('Should register entity sound components into its sound system', () => {
                const entity = new StaticObject();
                const soundComponent = new SoundComponent({
                    filePath: 'test.mp3'
                });
                entity.addComponent(soundComponent);

                scene.registerEntity(entity);

                expect(engine.soundSystem.components).toContain(soundComponent);
            });
        })

        describe('When scene is hidden', () => {
            beforeEach(() => {
                scene.hide();
            })

            it('Should not register entity shape components into its render system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.renderSystems[0].components).not.toContain(entity.shape);
            });

            it('Should not register entity physics components into its physics system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.physicsSystem.components).not.toContain(entity.boundingBox);
            });

            it('Should not register entity input components into its input system', () => {
                const entity = new StaticObject();
                const inputComponent = new InputComponent();
                entity.addComponent(inputComponent);

                scene.registerEntity(entity);

                expect(engine.inputSystem.components).not.toContain(inputComponent);
            })

            it('Should not register entity transform components into its hierarchy system', () => {
                const entity = new StaticObject();

                scene.registerEntity(entity);

                expect(engine.hierarchySystem.components).not.toContain(entity.transform);
            })

            it('Should not register entity sound components into its sound system', () => {
                const entity = new StaticObject();
                const soundComponent = new SoundComponent({
                    filePath: 'test.mp3'
                });
                entity.addComponent(soundComponent);

                scene.registerEntity(entity);

                expect(engine.soundSystem.components).not.toContain(soundComponent);
            });
        });


        it('Should throw if the same entity is added twice', () => {
            const entity = new StaticObject();
            const entity2 = new StaticObject();
            entity2.name = entity.name;

            scene.registerEntity(entity);
            expect(() => scene.registerEntity(entity2))
                .toThrow(/StaticObject\d+ is already used/);
        });

        it('Should allow to remove and add again the same entity without throwing', () => {
            const entity = new StaticObject();

            scene.registerEntity(entity);
            scene.unregisterEntity(entity.uuid);
            expect(() => scene.registerEntity(entity)).not.toThrow();
        })
    });

    describe('.unregisterEntity()', () => {
        let entity: StaticObject;
        let inputComponent: InputComponent;
        let soundComponent: SoundComponent;

        beforeEach(() => {
            entity = new StaticObject();
            inputComponent = new InputComponent();
            soundComponent = new SoundComponent({ filePath: 'test.mp3' });

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

        it('Should unregister entity shape components from their render systems', () => {
            scene.unregisterEntity(entity.uuid)

            engine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.components).not.toContain(entity.shape);
            });
        });

        it('Should unregister entity physics components into its physics system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(engine.physicsSystem.components).not.toContain(entity.boundingBox);
        });

        it('Should unregister entity input components into its input system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(engine.inputSystem.components).not.toContain(inputComponent);
        })

        it('Should unregister entity transform components into its hierarchy system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(engine.hierarchySystem.components).not.toContain(entity.transform);
        })

        it('Should unregister entity sound components into its sound system', () => {
            scene.unregisterEntity(entity.uuid);

            expect(engine.soundSystem.components).not.toContain(soundComponent);
        });
    })

    describe('.loadFromJson()', () => {
        it('Should load the entities configuration as well', async () => {
            const sceneJson = (await entitiesWithComponents).default;

            scene.loadFromJson(sceneJson);

            expect(scene.toJson()).toMatchSnapshot("SceneSnapshot");
        });

        it('Should load the entities name when loading a scene', () => {
            scene.loadFromJson({
                entities: {
                    testEntity15: {
                        __type: 'BaseEntity'
                    },
                    testEntity16: {
                        __type: 'BaseEntity'
                    },
                }
            });

            expect(scene.entities[0].name).toEqual('testEntity15');
            expect(scene.entities[1].name).toEqual('testEntity16');
        });

        it('Should allow to reload the same scene multiple times', async () => {
            scene.loadFromJson((await defaultEntitiesScene).default);
            scene.loadFromJson((await defaultEntitiesScene).default);
        })

        it('Should not throw when adding a new Entity in a previously deserialized scene', async () => {
            scene.loadFromJson({
                entities: {
                    'GameObject': {
                        __type: 'GameObject'
                    }
                }
            });

            const entity = new GameObject();
            expect(() => scene.registerEntity(entity)).not.toThrow();
        })
    })

    describe('.loadFromFile()', () => {
        it('Should load all entities from the scene', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(defaultEntitiesScene),
            });

            await scene.loadFromFile('test.scene.json');

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
        });

        it('Should load the entities configuration as well', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue({
                ...fetchMockData,
                json: () => Promise.resolve(entitiesWithComponents),
            });

            await scene.loadFromFile('test.scene.json');

            expect(scene.toJson()).toMatchSnapshot("SceneSnapshot")
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

            await scene.loadFromFile('test.scene.json');

            expect(scene.entities[0].name).toEqual('testEntity15');
            expect(scene.entities[1].name).toEqual('testEntity16');
        })
    });

    describe('.toJson()', () => {
        it('Should return the json representation of the scene', async () => {
            const sceneJson = (await defaultEntitiesScene).default;

            scene.loadFromJson(sceneJson);

            expect(scene.toJson()).toEqual({
                entities: {
                    testEntity1: scene.entities[0].toJson(),
                    testEntity2: scene.entities[1].toJson()
                }
            });
        })
    })

    describe('.dispose()', () => {
        it('Should remove all entities from the scene', () => {
            scene.registerEntity(new StaticObject());
            scene.registerEntity(new StaticObject());

            scene.dispose();

            expect(scene.entities).toEqual([]);

            engine.renderSystems.forEach(renderSystem => {
                expect(renderSystem.components).toBeEmpty();
            });
        })
    })
})