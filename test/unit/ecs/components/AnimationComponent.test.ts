import { AnimationComponent, BaseEntity, MaterialComponent, MaterialComponentProps, Rgb } from "../../../../src"

describe('ecs/components/AnimationComponent', () => {
    let component: AnimationComponent;
    let materialComponet: MaterialComponent;
    let parentEntity: BaseEntity;

    beforeEach(() => {
        parentEntity = new BaseEntity();    
        materialComponet = new MaterialComponent();

        parentEntity.addComponent(materialComponet);

        component = new AnimationComponent({
            frames: [{
                duration: 100,
                material: {
                    diffuseColor: new Rgb(255, 0, 0),
                    diffuseTexturePath: 'test.png',
                    opacity: 50
                }
            }, {
                duration: 300,
                material: {
                    diffuseColor: new Rgb(0, 255, 0),
                    diffuseTexturePath: 'test2.png',
                    opacity: 100
                }
            }]
        });

        parentEntity.addComponent(component);
    });

    describe('.update()', () => {
        it.each([{
            duration: 100,
            frame: 0
        }, {
            duration: 300,
            frame: 1
        }, {
            duration: 400,
            frame: 1
        }, {
            duration: 500,
            frame: 1
        }])('Should play the next frame based on current frame duration', ({ duration, frame }) => {
            component.update(duration);

            expect(component.currentFrame).toBe(frame);
        })

        it('Should reset the animation once finished', () => {
            component.update(101);
            component.update(301);

            expect(component.currentFrame).toBe(0);
        });

        it.each([
            'diffuseColor' as keyof MaterialComponentProps,
            'diffuseTexturePath' as keyof MaterialComponentProps,
            'opacity' as keyof MaterialComponentProps,
        ])('Should apply the animation frame material.%s to the parent entity material component', (property) => {
            component.update(99);

            expect(materialComponet[property]).toEqual(component.frames[0].material?.[property]);

            component.update(101);

            expect(materialComponet[property]).toBe(component.frames[1].material?.[property]);
        })

        
    })
})