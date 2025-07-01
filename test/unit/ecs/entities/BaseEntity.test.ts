import { BaseComponent, BaseEntity, TransformComponent, Type } from "../../../../src";

describe('ecs/entities/BaseEntity', () => {
    let baseEntity: BaseEntity;

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
        });

        it('Should make the added component available with every type in the types chain', () => {
            @Type('ExtendedComponent')
            class ExtendedComponent extends BaseComponent { }
            

            const testComponent = new ExtendedComponent();

            baseEntity.addComponent(testComponent);
            expect(baseEntity.getComponent<ExtendedComponent>('ExtendedComponent')).toEqual(testComponent);
            expect(baseEntity.getComponent<BaseComponent>('BaseComponent')).toEqual(testComponent);
        })
    })

    describe('.getComponent()', () => { 
        it('Should retrieve a specific component given a specific key', () => {
            const testComponent = new BaseComponent();
            baseEntity.addComponent( testComponent);

            expect(baseEntity.getComponent<BaseComponent>('BaseComponent')).toEqual(testComponent);
        })
    })

    describe('.getComponents()', () => {
        it('Should retrieve all components of a certain type in the entity', () => {
            const baseComponentA = new BaseComponent();
            const baseComponentB = new BaseComponent();
            const baseComponentC = new BaseComponent();

            baseEntity.addComponent(baseComponentA);
            baseEntity.addComponent(baseComponentB);
            baseEntity.addComponent(baseComponentC);

            expect(baseEntity.getComponents<BaseComponent>('BaseComponent')).toEqual([
                baseComponentC,
                baseComponentB,
                baseComponentA
            ]);
        })
    })

    describe('.toJson()', () => {
        it('Should serialize the name and type of the entity', () => {
            baseEntity.name = 'BaseEntity1234';

            expect(baseEntity.toJson()).toEqual({
                __type: 'BaseEntity',
                name: 'BaseEntity1234',
                components: []
            });
        });

        it('Should serialize all components in the entity', () => {
            const testComponentA = new BaseComponent();
            const testComponentB = new BaseComponent();

            baseEntity.addComponent(testComponentA);
            baseEntity.addComponent(testComponentB);

            expect(baseEntity.toJson()).toEqual(expect.objectContaining({
                components: expect.arrayContaining([
                    testComponentB.toJson(),
                    testComponentA.toJson()
                ])
            }));
        });

        it('Should serialize the same component only once', () => {
            const testComponent = new TransformComponent();
            
            baseEntity.addComponent(testComponent);

            expect(baseEntity.toJson()).toEqual(expect.objectContaining({
                components: [testComponent.toJson()]
            }));
        });
    })
})