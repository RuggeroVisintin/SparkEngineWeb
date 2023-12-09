import { PhysicsObject, Physx } from "../../../src"

describe('physx/Physx', () => {
    describe('.pushPhysicsObject()', () => {
        it('Should add the physicx object to the physics objects list', () => {
            const physx = new Physx();
            const physicsObject: PhysicsObject = {
                aabb: [10, 10, 25, 25]
            };

            physx.pushPhysicalObject(physicsObject);
            
            expect(physx.physicsObjects).toContain(physicsObject);
        })
    })
})