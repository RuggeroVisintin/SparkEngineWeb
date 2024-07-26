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

    describe('.toJson()', () => {
        it('Should return a JSON representation of the component', () => {
            const rigidBody = new RigidBodyComponent();
            rigidBody.rebound = 0.5;

            expect(rigidBody.toJson()).toEqual({
                __type: 'RigidBodyComponent',
                aabb: { x: 0, y: 0, width: 0, height: 0 },
                isContainer: false,
                matchContainerTransform: false,
                rebound: 0.5
            });
        })
    })
})