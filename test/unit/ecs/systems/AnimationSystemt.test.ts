import { AnimationComponent, AnimationSystem } from "../../../../src";

describe('ecs/systems/AnimationSystem', () => {
    let animationSystem: AnimationSystem;

    beforeEach(() => {
        animationSystem = new AnimationSystem();
    });

    describe('.registerComponent', () => {
        it('Should register a AnimationComponent in the list', () => {
            const animationComponent = new AnimationComponent({
                frames: []
            });

            animationSystem.registerComponent(animationComponent);

            expect(animationSystem.components).toContain(animationComponent);
        })
    })

    describe('.update', () => { 
        it('Should skip animations that are not playing', () => {
            const animationComponentA = new AnimationComponent({
                frames: []
            });

            const animationComponentB = new AnimationComponent({
                frames: []
            });

            jest.spyOn(animationComponentA, 'update');
            jest.spyOn(animationComponentB, 'update');

            animationSystem.registerComponent(animationComponentA);
            animationSystem.registerComponent(animationComponentB);

            animationComponentA.play();

            animationSystem.update(33);

            expect(animationComponentB.update).not.toHaveBeenCalled();

        });
    })
});