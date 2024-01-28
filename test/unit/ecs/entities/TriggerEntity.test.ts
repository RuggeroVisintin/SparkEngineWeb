import { BaseEntity, StaticObject, TriggerEntity } from "../../../../src"

describe('ecs/entities/TriggerEntity', () => {
    const otherEntity = new StaticObject();
    let triggerEntity: TriggerEntity;

    beforeEach(() => {
        triggerEntity = new TriggerEntity(otherEntity);
    })

    describe('.constructor', () => {
        it('Should throw an excecption if the target entity has no BoundingBox component attached', () => {
            expect(() =>
                new TriggerEntity(new BaseEntity())
            ).toThrow('Target entity must have a BoundingBox component attached');
        });

        it('Should assign the target entity', () => {
            expect(triggerEntity.target).toBe(otherEntity);  
        })
    })

})