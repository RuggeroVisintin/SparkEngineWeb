import { HierarchySystem, TransformComponent, Vec2 } from "../../../../src"

describe('ecs/systems/HierarchySystem', () => {
    let hierarchySystem: HierarchySystem;

    beforeEach(() => {
        hierarchySystem = new HierarchySystem();
    });

    describe('.update()', () => {
        it('Should update the first level of the world', () => {
            const tComponent = new TransformComponent();
            tComponent.velocity = new Vec2(1, 0);

            hierarchySystem.registerComponent(tComponent);
            hierarchySystem.update();

            expect(tComponent.position.x).toBe(1)
        });

        it.todo('Should update the nested children of a parent component');
    })
})