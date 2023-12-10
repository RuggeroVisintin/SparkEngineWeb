import { BoundingBoxComponent, ICollidableComponent, Physx } from "../../../../src";

describe('ecs/components/BoundingBoxComponent', () => {
    let bbComponent = new BoundingBoxComponent();
    let physx = new Physx();

    afterEach(() => {
        bbComponent = new BoundingBoxComponent();
        physx = new Physx();
    })

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
                    aabb: test.expected
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