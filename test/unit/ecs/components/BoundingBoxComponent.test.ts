import { BaseEntity, BoundingBoxComponent, BoundingBoxComponentProps, GameObject, ICollidableComponent, Physx, StaticObject, Vec2 } from "../../../../src";

describe('ecs/components/BoundingBoxComponent', () => {
    let bbComponent = new BoundingBoxComponent();
    let physx = new Physx();

    afterEach(() => {
        bbComponent = new BoundingBoxComponent();
        physx = new Physx();
    })

    describe('constructor()', () => {
        it('construct a new component from given props', () => {
            const init: BoundingBoxComponentProps = {
                aabb: { x: 5, y: 10, width: 15, height: 5 },
                matchContainerTransform: true,
                isContainer: false,
                onCollisionCb: () => { }
            }

            const component = new BoundingBoxComponent(init);

            expect(component).toEqual(expect.objectContaining(init));
        });
    });

    describe('get aabb()', () => {
        it.each([
            {
                aabb: { x: 0, y: 0, width: 0, height: 0 },
                expected: { x: 0, y: 0, width: 0, height: 0 }
            },
            {
                aabb: { x: 5, y: 10, width: 15, height: 5 },
                expected: { x: 5, y: 10, width: 15, height: 5 }
            }
        ])('Should return the default aabb by default', (test) => {
            bbComponent.aabb = test.aabb;
            expect(bbComponent.aabb).toEqual(test.expected);
        })

        it('Should return the container entity AABB if .matchContainerTransform is true', () => {
            const parentEntity = new GameObject();
            parentEntity.addComponent(bbComponent);

            bbComponent.matchContainerTransform = true;
            
            parentEntity.transform.position = new Vec2(15, 25);
            parentEntity.transform.size = { width: 10, height: 10 };

            expect(bbComponent.aabb).toEqual({
                x: 15, y: 25, width: 10, height: 10
            })
        });

        it('Should return the default AABB if .matchContainerTransform is true but parent container is null', () => {
            bbComponent.matchContainerTransform = true;
            bbComponent.aabb.x = 555;
            
            expect(bbComponent.aabb).toEqual({
                x: 555, y: 0, width: 0, height: 0
            })
        });

        it('Should return the default AABB if .matchContainerTransform is false', () => {
            const parentEntity = new GameObject();
            parentEntity.addComponent(bbComponent);
            
            bbComponent.matchContainerTransform = false;
            bbComponent.aabb.x = 555;

            expect(bbComponent.aabb).toEqual({
                x: 555, y: 0, width: 0, height: 0
            })
        })

        it('Should return the default AABB if .matchContainerTransform is true but parent container transform is null', () => {
            const parentEntity = new BaseEntity();
            parentEntity.addComponent(bbComponent);

            bbComponent.matchContainerTransform = true;
            bbComponent.aabb.x = 555;
            
            expect(bbComponent.aabb).toEqual({
                x: 555, y: 0, width: 0, height: 0
            })
        })
    });

    describe('.update()', () => {
        
        it.each([{
            aabb: { x: 0, y: 0, width: 0, height: 0 },
            expected: [0, 0, 0, 0]
        }, {
            aabb: { x: 5, y: 10, width: 15, height: 5 },
            expected: [5, 10, 15, 5]
        }])('Should register the component in the Physx world', (test) => {
            bbComponent.aabb = test.aabb;
            bbComponent.update(physx);

            expect(physx.physicalWorld).toEqual(expect.arrayContaining([{
                object: {
                    aabb: test.expected,
                    isContainer: false,
                    uuid: bbComponent.uuid,
                    velocity: new Vec2()
                },
                onCollisionCallback: expect.any(Function)
            }]));
        });


        it('Should trigger the onCollision callback when a collision is registered', () => {
            const cbBBComponentA = jest.fn(() => { });
            const cbBBComponentB = jest.fn(() => { });

            bbComponent.aabb.x = 5;
            bbComponent.aabb.y = 5;
            bbComponent.aabb.height = 5;
            bbComponent.aabb.width = 5;
            bbComponent.onCollisionCb = cbBBComponentA;

            const bbComponentB = new BoundingBoxComponent();
            bbComponentB.aabb.width = 10;
            bbComponentB.aabb.height = 10;
            bbComponentB.onCollisionCb = cbBBComponentB;

            bbComponent.update(physx);
            bbComponentB.update(physx);

            physx.simulate();

            expect(cbBBComponentA).toHaveBeenCalled();
            expect(cbBBComponentB).toHaveBeenCalled();
        });

        it('Should get the velocity from a parent entity when present', () => {
            const entity = new StaticObject();
            entity.transform.velocity = new Vec2(5, 5);
            entity.boundingBox.aabb.width = 10;
            entity.boundingBox.aabb.height = 10; 

            entity.boundingBox.update(physx);

            expect(physx.physicalWorld).toEqual(expect.arrayContaining([{
                object: expect.objectContaining({
                    velocity: new Vec2(5, 5)
                }),
                onCollisionCallback: expect.any(Function)
            }]));
        })
    });

    describe('.isContainer', () => {
        it('Should trigger the collision only when objects are outside the bounding box', () => {
            const cbBBComponentA = jest.fn(() => { });
            const cbBBComponentB = jest.fn(() => { });

            bbComponent.aabb.x = 5;
            bbComponent.aabb.y = 5;
            bbComponent.aabb.height = 5;
            bbComponent.aabb.width = 5;
            bbComponent.onCollisionCb = cbBBComponentA;
            bbComponent.isContainer = true;

            const bbComponentB = new BoundingBoxComponent();
            bbComponentB.aabb.x = 10;
            bbComponent.aabb.y = 10;
            bbComponentB.aabb.width = 4;
            bbComponentB.aabb.height = 4;
 
            bbComponentB.onCollisionCb = cbBBComponentB;

            bbComponent.update(physx);
            bbComponentB.update(physx);

            physx.simulate();

            expect(cbBBComponentA).toHaveBeenCalled();
            expect(cbBBComponentB).toHaveBeenCalled();
        });
    })

    describe('.toJson()', () => {
        it('Should return a JSON representation of the component', () => {
            const json = bbComponent.toJson();

            expect(json).toEqual({
                __type: 'BoundingBoxComponent',
                aabb: { x: 0, y: 0, width: 0, height: 0 },
                matchContainerTransform: false,
                isContainer: false
            })
        })
    })
})