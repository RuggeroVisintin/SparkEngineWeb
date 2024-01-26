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
                    aabb: [10, 10, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [15, 15, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(physicsObject2.object);
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(physicsObject.object);
        })

        it('Should trigger the Physics object callback if a reverse collision is detected', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [19, 70, 20, 2],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [0, 0, 20, 150],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(physicsObject2.object);
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(physicsObject.object);
        });

        // it('Should take the object velocity into collision account', () => {
        //     const physicsObject: PhysicalObjectCallbackAggregate = {
        //         object: {
        //             aabb: [0, 100, 16, 150],
        //             velocity: new Vec2(5)
        //         },
        //         onCollisionCallback: jest.fn(() => { }),
        //     };

        //     const physicsObject2: PhysicalObjectCallbackAggregate = {
        //         object: {
        //             aabb: [0, 100, 20, 150],
        //             velocity: new Vec2()
        //         },
        //         onCollisionCallback: jest.fn(() => { }),
        //     };

        //     physx.pushPhysicalObject(physicsObject);
        //     physx.pushPhysicalObject(physicsObject2);

        //     physx.simulate();
            
        //     expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(physicsObject2.object);
        //     expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(physicsObject.object);
        // })

        it.todo('Should calculate and include in the Physics object callback the new velocity resulting from the collision')

        it('Should not trigger a collision for object that are not colliding', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [10, 10, 25, 25],
                    velocity: new Vec2()
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
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
                        aabb: test.containerAabb,
                        velocity: new Vec2(),
                        isContainer: true
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
                        aabb: test.otherAabb,
                        velocity: new Vec2()
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                physx.pushPhysicalObject(physicsObject);
                physx.pushPhysicalObject(physicsObject2);

                physx.simulate();
                
                expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(physicsObject2.object);
                expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(physicsObject.object);
            })

            it('Should not trigger a collision for physx objects inside the container', () => {
                const physicsObject: PhysicalObjectCallbackAggregate = {
                    object: {
                        aabb: [10, 10, 25, 25],
                        isContainer: true,
                        velocity: new Vec2()
                    },
                    onCollisionCallback: jest.fn(() => { }),
                };

                const physicsObject2: PhysicalObjectCallbackAggregate = {
                    object: {
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

            it.todo('Should not test collisions against two container objects')
        })
    })
})