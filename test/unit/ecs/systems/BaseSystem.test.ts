import { BaseComponent, BaseSystem } from "../../../../src";

class TestSystem extends BaseSystem<BaseComponent> {
    update = jest.fn();
}

describe('ecs/systems/BaseSystem', () => {
    let testSystem: TestSystem;

    beforeEach(() => {
        testSystem = new TestSystem();
    })

     describe('.registerComponent', () => {
        it('Should add a component in the list', () => {
            const baseComponent = new BaseComponent();

            testSystem.registerComponent(baseComponent);

            expect(testSystem.components).toContain(baseComponent);
        })
     })
    
    describe('.unregisterComponent', () => {
        let baseComponent: BaseComponent;

        beforeEach(() => {
            baseComponent = new BaseComponent();
            testSystem.registerComponent(baseComponent);
        })

        it('Should remove a component in the list', () => {
            testSystem.unregisterComponent(baseComponent.uuid);

            expect(testSystem.components).not.toContain(baseComponent);
        })
    })
})