import { BaseEntity, ImageLoader, Renderer, TransformComponent } from "../../../../src";
import { BaseDrawableComponent } from "../../../../src/ecs/components/ BaseDrawableComponent";

class TestComponent extends BaseDrawableComponent {
    draw(renderer: Renderer, imageLoader: ImageLoader): void {
        // Implementation for the test component
    }
}

describe('ecs/components/BaseDrawableComponent', () => {
    let component: TestComponent;

    beforeEach(() => {
        component = new TestComponent();
    });

    describe('.hide()', () => {
        it('Should set the component to hidden', () => {
            component.hide();

            expect(component.isVisible).toBe(false);
        });
    });

    describe('.show()', () => {
        it('Should set the component to visible', () => {
            component.hide(); // First hide it
            component.show(); // Then show it

            expect(component.isVisible).toBe(true);
        });
    });

    describe('.transform', () => {
        it('Should retrieve the component default transform when no container entity is defined', () => {
            component.transform.depthIndex = 2;

            expect(component.transform).toEqual(expect.objectContaining({
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 },
                depthIndex: 2
            }))
        })

        it('Should retrieve the transform from container entity when defined', () => {
            const transformComponent = new TransformComponent();
            transformComponent.depthIndex = 4;

            const entity = new BaseEntity()
            entity.addComponent(component);
            entity.addComponent(transformComponent);

            expect(component.transform).toEqual(expect.objectContaining({
                depthIndex: 4
            }))
        })
    });
});