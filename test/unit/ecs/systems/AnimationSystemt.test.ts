import { AnimationComponent, AnimationSystem } from "../../../../src"

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
});