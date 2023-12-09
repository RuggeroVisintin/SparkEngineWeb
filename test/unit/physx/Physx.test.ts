import { PhysicalObjectCallbackAggregate, PhysicsObject, Physx } from "../../../src"

describe('physx/Physx', () => {
    let physx = new Physx();

    afterEach(() => {
        physx = new Physx();
    })

    describe('.pushPhysicsObject()', () => {
        it('Should add the physicx object to the physics objects list', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [10, 10, 25, 25]
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
                    aabb: [10, 10, 25, 25]
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [15, 15, 25, 25]
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).toHaveBeenCalledWith(physicsObject.object);
            expect(physicsObject2.onCollisionCallback).toHaveBeenCalledWith(physicsObject2.object);
        })

        it('Should not trigger a collision for object that are not colliding', () => {
            const physicsObject: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [10, 10, 25, 25]
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            const physicsObject2: PhysicalObjectCallbackAggregate = {
                object: {
                    aabb: [45, 45, 25, 25]
                },
                onCollisionCallback: jest.fn(() => { }),
            };

            physx.pushPhysicalObject(physicsObject);
            physx.pushPhysicalObject(physicsObject2);

            physx.simulate();
            
            expect(physicsObject.onCollisionCallback).not.toHaveBeenCalled();
            expect(physicsObject2.onCollisionCallback).not.toHaveBeenCalled();
        })
    })
})