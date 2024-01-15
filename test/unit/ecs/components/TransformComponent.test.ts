import { TransformComponent } from "../../../../src"

describe('ecs/components/TransformComponent', () => {
    describe('constructor', () => {
        it('Should default position to 0,0 if not defined', () => {
            const transformComponent = new TransformComponent();

            expect(transformComponent.position).toEqual({
                x: 0,
                y: 0
            })
        })

        it('Should default size to 0,0 if not defiend', () => {
            const transformComponent = new TransformComponent();

            expect(transformComponent.size).toEqual({
                width: 0,
                height: 0
            })
        })
    })

    describe('.update()', () => {
        it('Should apply the velocity to the position of the component', () => {
            const transformComponent = new TransformComponent();
            transformComponent.velocity.x = 3;
            
            transformComponent.update();

            expect(transformComponent.position.x).toEqual(3);
        })
    })
})