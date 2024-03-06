import { v4 } from "uuid";
import { AABB, PhysicalObjectCallbackAggregate, PhysicsObject, Physx, Vec2 } from "../../../src"

describe('physx/Physx', () => {
    let physx = new Physx();

    afterEach(() => {
        physx = new Physx();
    })

    describe('.pushPhysicsObject()', () => {
        it('Should add the physicx object to the physics objects list', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [10, 10, 25, 25],
                    uuid: v4(),
                    velocity: new Vec2()
                },
                onCollisionCallback: (postSimulation) => {},
            };

            physx.pushPhysicalObject(physicsObject);
            expect(physx.physicalWorld).toContain(physicsObject);
        })
    })

    describe('.simulate()', () => {
        it('Should trigger the Physics object callback if a collision is detected', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [10, 10, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [15, 15, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                    otherObject: physicsObject2.object
            }));
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                otherObject: physicsObject.object
            }));
        })

        it('Should trigger the Physics object callback if a reverse collision is detected', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [19, 70, 20, 2],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [0, 0, 20, 150],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                otherObject: physicsObject2.object
            }));
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                otherObject: physicsObject.object
            }));
        });

        it('Should take the object velocity into collision account', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [0, 100, 16, 150],
                    velocity: new Vec2(5)
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [0, 100, 20, 150],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                otherObject: physicsObject2.object
            }));
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                otherObject: physicsObject.object
            }));
        })

        it.each([[
            'case 1',
            new Vec2(5),
            [5, 100, 16, 150],
            [20, 100, 20, 150],
            [4, 100, 16, 150]
        ], [
            'case 2',
            new Vec2(0, 5),
            [0, 5, 16, 10],
            [0, 11, 16, 10],
            [0, 1, 16, 10]
        ], [
            'case 3',
            new Vec2(0, -5),
            [0, 9, 16, 10],
            [10, 0, 16, 10],
            [0, 10, 16, 10]
        ], [
            'case 4',
            new Vec2(-5),
            [7, 0, 10, 10],
            [0, 0, 10, 10],
            [10, 0, 10, 10]
        ]])('Should calculate and include in the Physics object callback the new position resulting from the collision %s', (_, velocity, a, b, result) => {            
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: <AABB>a,
                    velocity: velocity
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: <AABB>b,
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                postSimulation: expect.objectContaining({
                    aabb: result
                })
            }));
        })


        it('Should not trigger a collision for object that are not colliding', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [10, 10, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    uuid: v4(),
                    aabb: [45, 45, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).not.toHaveBeenCalled();
            expect(physicsObject2.onCollisionCallback).not.toHaveBeenCalled();
        });

        it.todo('Should calculate and include in the Physics object callback the new velocity resulting from the collision')
        
        describe('.isContainer', () => {
            it.each([{
                containerAabb: <AABB>[10, 10, 25, 25],
                otherAabb: <AABB>[45, 45, 25, 25]
            }, {
                containerAabb: <AABB>[10, 10, 25, 25],
                otherAabb: <AABB>[15, 15, 25, 25]
            }, {
                containerAabb: <AABB>[10, 10, 25, 25],
                otherAabb: <AABB>[-5, 0, 115, 115]
            }, {
                containerAabb: <AABB>[5, 5, 5, 5],
                otherAabb: <AABB>[10, 10, 4, 4]
            }])('Should trigger the Physics object callback if an object is outside the container boundaries', (test) => {
                const physicsObject: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: test.containerAabb,
                        velocity: new Vec2(),
                        isContainer: true
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: test.otherAabb,
                        velocity: new Vec2()
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                physx.pushPhysicalObject(physicsObject);
                physx.pushPhysicalObject(physicsObject2);

                physx.simulate();
                
                expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                    otherObject: physicsObject2.object
                }));
                expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                    otherObject: physicsObject.object
                }));
            })

            it('Should not trigger a collision for physx objects inside the container', () => {
                const physicsObject: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: [10, 10, 25, 25],
                        isContainer: true,
                        velocity: new Vec2()
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: [15, 15, 5, 5],
                        velocity: new Vec2()
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                physx.pushPhysicalObject(physicsObject);
                physx.pushPhysicalObject(physicsObject2);

                physx.simulate();
                
                expect(physicsObject.onCollisionCallback).not.toHaveBeenCalled();
                expect(physicsObject2.onCollisionCallback).not.toHaveBeenCalled();
            });

            it.each([[
                'case RIGHT',
                new Vec2(5),
                [299, 75, 5, 5],
                [0, 0, 300, 150],
                new Vec2(-5)
            ], [
                'case UP',
                new Vec2(0, 5),
                [75, 146, 5, 5],
                [0, 0, 300, 150],
                new Vec2(0, -5)
            ], [
                'case DOWN',
                new Vec2(0, -5),
                [0, 9, 16, 10],
                [0, 0, 16, 10],
                new Vec2(0, 5)
            ], [
                'case LEFT',
                new Vec2(-5),
                [0, 0, 10, 10],
                [7, 0, 10, 10],
                new Vec2(5)
            ]])('%s) Should return the new velocity of the object', (_, velocity, a, b, result) => {
                const physicsObject: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: <AABB>a,
                        velocity: velocity
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: <AABB>b,
                        velocity: new Vec2(),
                        isContainer: true
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                physx.pushPhysicalObject(physicsObject);
                physx.pushPhysicalObject(physicsObject2);

                physx.simulate();
                
                expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                    postSimulation: expect.objectContaining({
                        velocity: result
                    })
                }));
            })

            it.each([[
                'case RIGHT',
                new Vec2(5),
                [297, 75, 5, 5],
                [0, 0, 300, 150],
                [295, 75, 5, 5]
            ], [
                'case UP',
                new Vec2(0, -5),
                [75, -2, 5, 5],
                [0, 0, 300, 150],
                [75, 0, 5, 5]
            ], [
                'case DOWN',
                new Vec2(0, 5),
                [75, 146, 5, 5],
                [0, 0, 300, 150],
                [75, 145, 5, 5]
            ], [
                'case LEFT',
                new Vec2(-5),
                [-2, 0, 10, 10],
                [0, 0, 10, 10],
                [0, 0, 10, 10]
            ]])('%s) Should return the position of the colliding object based on the collision', (_, velocity, a, b, result) => {
                const physicsObject: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: <AABB>a,
                        velocity: velocity
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
                        uuid: v4(),
                        aabb: <AABB>b,
                        velocity: new Vec2(),
                        isContainer: true
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                physx.pushPhysicalObject(physicsObject);
                physx.pushPhysicalObject(physicsObject2);

                physx.simulate();
                
                expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(expect.objectContaining({
                    postSimulation: expect.objectContaining({
                        aabb: result
                    })
                }));
            })
        })
    })
})