import { AnimationComponent, BaseEntity, DOMImageLoader, MaterialComponent, MaterialComponentProps, Rgb } from "../../../../src"
import '../../__mocks__';

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

        component.play();

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

            expect(materialComponet[property]).toEqual(component.frames[1].material?.[property]);
        })

        it('Should load the frame material asset in the parent component', (done) => {
            component.loadAssets(new DOMImageLoader());
            setTimeout(() => {
                component.update(99);

                expect(materialComponet.diffuseTexture).toBeDefined();
                done();

            }, 10)
        })
    });

    describe('.play()', () => { 
        it('Should play the animation', () => {
            component.play();

            expect(component.isPlaying).toBe(true);
        });
    })

    describe('.pause()', () => {
        it('Should pause the animation', () => {
            component.pause();

            expect(component.isPlaying).toBe(false);
        });

        it('Should retain the information about the animation', () => {
            component.play();

            component.update(150);

            component.pause();

            expect(component.currentFrame).toBe(1);
        })
    });

    describe('.stop()', () => {
        it('Should stop and reset the animation from the start', () => {
            component.play();

            component.update(450);

            component.stop();

            expect(component.isPlaying).toBe(false);
            expect(component.currentFrame).toBe(0);
        })

        it('Should apply the idle pose (frame 0)', () => {
            component.play();

            component.update(450);

            component.stop();

            expect(materialComponet.diffuseColor).toEqual(component.frames[0].material?.diffuseColor);
        })
    })

    describe('.toJson()', () => {
        it('Should return the correct JSON representation', () => {
            expect(component.toJson()).toEqual({
                __type: 'AnimationComponent',
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
            })
        })
    })
})