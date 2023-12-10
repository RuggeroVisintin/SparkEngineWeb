import { BoundingBoxComponent, ICollidableComponent, Physx } from "../../../../src";

describe('ecs/components/BoundingBoxComponent', () => {
    const bbComponent = new BoundingBoxComponent();
    const physx = new Physx();

    describe('.update()', () => {
        it('Should register the component in the Physx world', () => {
            bbComponent.update(physx);

            expect(physx.physicalWorld).toEqual(expect.arrayContaining([{
                object: {
                    aabb: [0, 0, 0, 0]
                }, 
                onCollisionCallback: expect.any(Function)
            }]));
        });


        it.todo('Should trigger the onCollision callback when a collision is registered')
    })
})