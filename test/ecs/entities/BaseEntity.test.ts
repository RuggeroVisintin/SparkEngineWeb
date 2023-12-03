import { BaseComponent, BaseEntity } from "../../../src";

describe('ecs/entities/BaseEntity', () => {
    const baseEntity = new BaseEntity();

    describe('.addComponent()', () => {
        it('Should add component to entity', () => {
            const testComponent = new BaseComponent();

            baseEntity.addComponent<BaseComponent>('testComponent', testComponent);
            expect(baseEntity.getComponent<BaseComponent>('testComponent')).toEqual(testComponent);
        });
    })

    describe('.getComponent()', () => { 
        it('Should retrieve a specific component given a specific key', () => {
            const testComponent = new BaseComponent();
            baseEntity.addComponent<BaseComponent>('testComponent', testComponent);

            expect(baseEntity.getComponent<BaseComponent>('testComponent')).toEqual(testComponent);
        })
    })
})