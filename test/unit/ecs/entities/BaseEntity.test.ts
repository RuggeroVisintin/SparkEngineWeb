import { BaseComponent, BaseEntity } from "../../../../src";

describe('ecs/entities/BaseEntity', () => {
    let baseEntity = new BaseEntity();

    beforeEach(() => {
        baseEntity = new BaseEntity();
    });

    describe('.constructor()', () => { 
        it('Should have a name mathcing the entity type by default', () => {
            expect(baseEntity.name).toEqual('BaseEntity1');
        });

        it('Should use an incrementally unique game if more entities with the same name exist and default name is used', () => {    
            const currentCount = parseInt(baseEntity.name.split('BaseEntity')[1]);
            expect(new BaseEntity().name).toEqual('BaseEntity' +  (currentCount + 1));
        })
    })
    
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