import { BaseEntity, SerializableCallback, StaticObject, TriggerEntity, Vec2 } from "../../../../src"

describe('ecs/entities/TriggerEntity', () => {
    const otherEntity = new StaticObject();
    let triggerEntity: TriggerEntity;

    beforeEach(() => {
        triggerEntity = new TriggerEntity({
            target: otherEntity
        });
    })

    describe('.constructor', () => {
        it('Should throw an excecption if the target entity has no BoundingBox component attached', () => {
            expect(() =>
                new TriggerEntity({ target: new BaseEntity() })
            ).toThrow('Target entity must have a BoundingBox component attached');
        });

        it('Should assign the target entity when defined', () => {
            expect(triggerEntity.target).toBe(otherEntity);
        });

        it('Should construct a TriggerEntity without any additional props', () => {
            expect(new TriggerEntity().target).toBe(undefined);
        });

        it('Should register the same component only once', () => {
            const targetEntity = new StaticObject({
                boundingBox: {
                    aabb: { x: 0, y: 0, width: 10, height: 10 },
                    isContainer: true,
                    matchContainerTransform: false,
                    onCollisionCb: SerializableCallback.fromFunction(() => { })
                }
            });

            const triggerEntity = new TriggerEntity({
                target: targetEntity,
            });

            expect(triggerEntity.toJson().components).toHaveLength(4);
        });

        it('Should register the onCollision handler as non serializaed SerializableCallback', () => {
            const triggerEntity = new TriggerEntity({
                target: otherEntity
            });

            expect(triggerEntity.boundingBox.onCollisionCb?.toJson()).toBe(undefined);
        });

        it('Should register the onTargetCB when given', () => {
            const callback = jest.fn();
            triggerEntity = new TriggerEntity({
                target: otherEntity,
                onTriggerCB: SerializableCallback.fromFunction(callback)
            });

            triggerEntity.onTriggerCB?.call(this);

            expect(callback).toHaveBeenCalled();
        })
    })

    describe('.set target', () => {
        it('Should throw an excecption if the target entity has no BoundingBox component attached', () => {
            expect(() => {
                triggerEntity.target = new BaseEntity();
            }).toThrow('Target entity must have a BoundingBox component attached');
        });

        it('Should assign the target entity when defined', () => {
            const newEntity = new StaticObject();
            triggerEntity.target = newEntity;
            expect(triggerEntity.target).toBe(newEntity);
        })

        it('Should unset the target when undefined is given', () => {
            triggerEntity.target = undefined;
            expect(triggerEntity.target).toBe(undefined);
        })
    })

    describe('.onTriggerCB', () => {
        it('Should be invoked when a collision between this entity and the target is detected', () => {
            const params = {
                collider: {
                    aabb: [1, 0, 1, 0],
                    velocity: new Vec2(),
                    uuid: otherEntity.boundingBox.uuid
                },
                postSimulation: {
                    aabb: [1, 0, 1, 0],
                    velocity: new Vec2(),
                    uuid: triggerEntity.boundingBox.uuid
                }
            }
            const callback = jest.fn();
            triggerEntity.onTriggerCB = SerializableCallback.fromFunction(callback);
            triggerEntity.boundingBox.onCollisionCb?.call(this, params);

            expect(callback).toHaveBeenCalledWith(params);
        });
    });

    describe('.toJson()', () => {
        it('Should serialize the onTriggerCB script', () => {
            triggerEntity.onTriggerCB = SerializableCallback.fromFunction(jest.fn());
            const json = triggerEntity.toJson();

            expect(json.onTriggerCB).toEqual(triggerEntity.onTriggerCB?.toJson());
        });
    });
});