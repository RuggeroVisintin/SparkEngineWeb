import { BaseComponent, BaseSystem } from "../../../../src";

class TestSystem extends BaseSystem<BaseComponent> {
    internalUpdate = jest.fn();
}

describe('ecs/systems/BaseSystem', () => {
    let testSystem: TestSystem;

    beforeEach(() => {
        testSystem = new TestSystem();
    })

    it('Should be running by default', () => {
        expect(testSystem.isRunning).toBeTrue();
    })

    describe('.registerComponent()', () => {
        it('Should add a component in the list', () => {
            const baseComponent = new BaseComponent();

            testSystem.registerComponent(baseComponent);

            expect(testSystem.components).toContain(baseComponent);
        })

        it('Should not add the same component twice', () => { 
            const baseComponent = new BaseComponent();

            testSystem.registerComponent(baseComponent);
            testSystem.registerComponent(baseComponent);

            expect(testSystem.components).toHaveLength(1);
        });
    })

    describe('.unregisterComponent()', () => {
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

    describe('.pause()', () => {
        it('Should pause the system from running', () => {
            testSystem.pause();

            expect(testSystem.isRunning).toBeFalse();
        })

        it('Should skip the next update cycles', () => {
            testSystem.pause();

            const spy = jest.spyOn(testSystem, 'internalUpdate');

            testSystem.update();

            expect(spy).not.toHaveBeenCalled();
        })
    })

    describe('.resume()', () => {
        it('Should resume the system from a pause state', () => {
            testSystem.pause();
            testSystem.resume();

            expect(testSystem.isRunning).toBeTrue();
        })

        it('Should resume the system cycling logic', () => {
            testSystem.pause();
            testSystem.resume();

            const spy = jest.spyOn(testSystem, 'internalUpdate');

            testSystem.update();

            expect(spy).toHaveBeenCalled();
        })
    })
})