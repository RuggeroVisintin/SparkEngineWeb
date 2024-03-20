import { Renderer, CameraComponent, TransformComponent, BaseEntity, CanvasDevice } from "../../../../src";

describe('ecs/components/CameraComponent', () => {
    let renderer: Renderer;
    let cameraComponent = new CameraComponent();

    beforeEach(() => {
        renderer = new Renderer(new CanvasDevice(), {width: 1920, height: 1080}, new CanvasRenderingContext2D());
        cameraComponent = new CameraComponent();
    });


    describe('.transform', () => {
        it('Should retrieve the component default transform when no container entity is defined', () => {
            cameraComponent.transform.depthIndex = 2;

            expect(cameraComponent.transform).toEqual(expect.objectContaining({
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 },
                depthIndex: 2
            }))
        })

        it('Should retrieve the transform from container entity when defined', () => {
            const transformComponent = new TransformComponent();
            transformComponent.depthIndex = 4;

            const shapeComponent = new CameraComponent();
            const entity = new BaseEntity()
            entity.addComponent(shapeComponent);
            entity.addComponent(transformComponent);

            expect(shapeComponent.transform).toEqual(expect.objectContaining({
                depthIndex: 4
            }))
        })
    });
})