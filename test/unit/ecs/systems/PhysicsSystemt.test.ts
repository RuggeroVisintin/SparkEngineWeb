import { BoundingBoxComponent, PhysicsSystem, Physx } from "../../../../src";

describe('ecs/systems/PhysicsSystem', () => {
    let physx = new Physx();
    let system = new PhysicsSystem(physx);

    afterEach(() => { 
        physx = new Physx();
        system = new PhysicsSystem(physx); 
    })

    describe('.update()', () => { 
        it('Should register the components into the Physx engine', () => {
            const componentA = new BoundingBoxComponent();
            const componentB = new BoundingBoxComponent();

            system.registerComponent(componentA);
            system.registerComponent(componentB);

            const spyUpdateA = jest.spyOn(componentA, 'update');
            const spyUpdateB = jest.spyOn(componentB, 'update');

            system.update();

            expect(spyUpdateA).toHaveBeenCalled();
            expect(spyUpdateB).toHaveBeenCalled();
        });

        it.todo('Should simulate a phsyics step after updating components')
    })
})