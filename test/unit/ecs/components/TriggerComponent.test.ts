import { BoundingBoxComponent, PhysicalObjectCallbackAggregate, Physx, SerializableCallback, StaticObject, TriggerComponent, typeOf, Vec2 } from "../../../../src";

describe('ecs/components/TriggerComponent', () => {
    it('Should inherit from BoundingBoxComponent', () => {
        const triggerComponent = new TriggerComponent();

        expect(triggerComponent).toBeInstanceOf(BoundingBoxComponent);
    });

    it('Should have the correct component type', () => {
        const triggerComponent = new TriggerComponent();

        expect(typeOf(triggerComponent)).toBe('TriggerComponent');
    });

    describe('.target', () => {
        const target = new StaticObject();

        it('Should accept a target in the constructor', () => {
            const triggerComponent = new TriggerComponent({
                target
            });

            expect(triggerComponent.target?.uuid).toEqual(target.uuid);
        });

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

    describe('.onCollisionCB', () => {
        class PhysxDouble extends Physx {
            private objects = new Map<string, PhysicalObjectCallbackAggregate>();

            public simulate(): void {
                this.objects.forEach((physicalObject) => {
                    this.objects.forEach((otherObject) => {
                        if (physicalObject.object.uuid === otherObject.object.uuid) {
                            return;
                        }

                        physicalObject.onCollisionCallback({
                            otherObject: otherObject.object,
                            postSimulation: physicalObject.object
                        });
                    });
                });
            }

            public pushPhysicalObject(object: PhysicalObjectCallbackAggregate): void {
                this.objects.set(object.object.uuid, object);
            }
        }

        let physxDouble: PhysxDouble;

        beforeEach(() => {
            physxDouble = new PhysxDouble();
        });

        it('Should be called when a collision with target entity is detected', () => {
            const target = new StaticObject();
            const triggerComponent = new TriggerComponent({ target });
            const onCollisionCB = jest.fn();
            triggerComponent.onCollisionCb = SerializableCallback.fromFunction(onCollisionCB).bind(triggerComponent);

            triggerComponent.update(
                physxDouble
            );

            target.boundingBox.update(physxDouble);

            physxDouble.simulate();

            expect(onCollisionCB).toHaveBeenCalled();
        });

        it('Should not be called when a collision with non-target entity is detected', () => {
            const target = new StaticObject();
            const nonTarget = new StaticObject();
            const triggerComponent = new TriggerComponent({ target });
            const onCollisionCB = jest.fn();
            triggerComponent.onCollisionCb = SerializableCallback.fromFunction(onCollisionCB).bind(triggerComponent);

            nonTarget.getComponent<BoundingBoxComponent>('BoundingBoxComponent')?.update(physxDouble);

            triggerComponent.update(
                physxDouble
            );

            physxDouble.simulate();

            expect(onCollisionCB).not.toHaveBeenCalled();
        });
    });

    describe('.toJson', () => {
        it.todo('Should serialize the target entity');
    });
});