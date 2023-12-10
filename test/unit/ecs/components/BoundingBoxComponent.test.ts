import { BoundingBoxComponent, ICollidableComponent, Physx } from "../../../../src";

describe('ecs/components/BoundingBoxComponent', () => {
    let bbComponent = new BoundingBoxComponent();
    let physx = new Physx();

    afterEach(() => {
        bbComponent = new BoundingBoxComponent();
        physx = new Physx();
    })

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


        it('Should trigger the onCollision callback when a collision is registered', () => {
            const cbBBComponentA = jest.fn(() => {});
            const cbBBComponentB = jest.fn(() => {});

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
        })
    })
})