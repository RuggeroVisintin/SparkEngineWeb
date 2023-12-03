import { TransformComponent } from "../../../src"

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
})