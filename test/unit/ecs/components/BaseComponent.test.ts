import { BaseComponent, BaseEntity } from "../../../../src";

describe('ecs/components/BaseComponent', () => {
    let entity: BaseEntity;
    let component: BaseComponent;

    beforeEach(() => {
        entity = new BaseEntity();
        component = new BaseComponent();
    })
    
    describe('.getContainer() / .setContainer()', () => {
        it('Should set and get the container entity of the component', () => {
            component.setContainer(entity);

            expect(component.getContainer()).toBe(entity);
        });

        it('Should return null if the component is not attached to an entity', () => {
            expect(component.getContainer()).toBe(null);
        });
    });
})