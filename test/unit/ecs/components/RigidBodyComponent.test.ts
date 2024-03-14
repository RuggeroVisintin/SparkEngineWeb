import { Physx, RigidBodyComponent } from "../../../../src";

describe('ecs/components/RigidBodyComponent', () => {
    const physx = new Physx();

    describe('.mapPhysicalObject', () => {
        it('Should inlcude the rebound in the physical object', () => {
            const rigidBody = new RigidBodyComponent();
            rigidBody.rebound = 1;

            rigidBody.update(physx);
            expect(physx.physicalWorld[0].object.rebound).toEqual(1);
        })
    })
})