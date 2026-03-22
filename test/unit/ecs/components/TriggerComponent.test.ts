import { BoundingBoxComponent, StaticObject, TriggerComponent } from "../../../../src";

describe('ecs/components/TriggerComponent', () => {
    it('Should inherit from BoundingBoxComponent', () => {
        const triggerComponent = new TriggerComponent();

        expect(triggerComponent).toBeInstanceOf(BoundingBoxComponent);
    });

    describe('.target', () => {
        const target = new StaticObject();

        it('Should be undefined by default', () => {
            const triggerComponent = new TriggerComponent();

            expect(triggerComponent.target).toBeUndefined();
        });

        it('Should set the target uuid', () => {
            const triggerComponent = new TriggerComponent();
            triggerComponent.target = target;

            expect(triggerComponent.target).toBe(target);
        });

        it('Should unset the target uuid', () => {
            const triggerComponent = new TriggerComponent();
            triggerComponent.target = target;
            triggerComponent.target = undefined;

            expect(triggerComponent.target).toBeUndefined();
        });
    });


});