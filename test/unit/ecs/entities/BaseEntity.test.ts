import { BaseComponent, BaseEntity } from "../../../../src";

describe('ecs/entities/BaseEntity', () => {
    let baseEntity = new BaseEntity();

    beforeEach(() => {
        baseEntity = new BaseEntity();
    });
    
    describe('.addComponent()', () => {
        it('Should add component to entity', () => {
            const testComponent = new BaseComponent();

            baseEntity.addComponent(testComponent);
            expect(baseEntity.getComponent<BaseComponent>('BaseComponent')).toEqual(testComponent);
        });

        it('Should set the entity as container of the given component', () => {
            const testComponent = new BaseComponent();

            baseEntity.addComponent(testComponent);
            expect(testComponent.getContainer()).toEqual(baseEntity);
        })
    })

    describe('.getComponent()', () => { 
        it('Should retrieve a specific component given a specific key', () => {
            const testComponent = new BaseComponent();
            baseEntity.addComponent( testComponent);

            expect(baseEntity.getComponent<BaseComponent>('BaseComponent')).toEqual(testComponent);
        })
    })
})