import { BaseEntity, GameObject, SerializableCallback, StaticObject, TriggerEntity, Vec2 } from "../../../../src"

describe('ecs/entities/TriggerEntity', () => {
    const otherEntity = new StaticObject();
    let triggerEntity: TriggerEntity;

    beforeEach(() => {
        triggerEntity = new TriggerEntity();
    })

    describe('.constructor', () => {
        it('Should extend GameObject class', () => {
            expect(triggerEntity).toBeInstanceOf(GameObject);
        });

        it('Should have a trigger component by default', () => {
            const triggerComponent = triggerEntity.getComponent('TriggerComponent');

            expect(triggerComponent).toBeDefined();
        });

        it('Should allow setting the trigger component target through the constructor', () => {
            const entity = new TriggerEntity({
                trigger: {
                    target: otherEntity
                }
            });
        });
    });

    describe('.toJson()', () => {
        it('Should return a JSON representation of the entity', () => {
            expect(triggerEntity.toJson()).toEqual({
                __type: 'TriggerEntity',
                name: triggerEntity.name,
                components: expect.arrayContaining([
                    triggerEntity.transform.toJson(),
                    triggerEntity.material.toJson(),
                    triggerEntity.shape.toJson(),
                    triggerEntity.trigger.toJson()
                ]),
            });
        })
    })
});