import { BaseEntity, StaticObject, TriggerEntity, Vec2 } from "../../../../src"

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

        it('Should assign the target entity', () => {
            expect(triggerEntity.target).toBe(otherEntity);  
        })
    })

    describe('.onTriggerCB', () => {
        it('Should be invoked when a collision between this entity and the target is detected', () => {
            triggerEntity.onTriggerCB = jest.fn();
            triggerEntity.boundingBox.onCollisionCb?.({
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
            });

            expect(triggerEntity.onTriggerCB).toHaveBeenCalled();
        });
    })

})