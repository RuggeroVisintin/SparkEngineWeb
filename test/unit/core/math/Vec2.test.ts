import { Vec2 } from "../../../../src"

describe('core/math/Vec2', () => {
    describe('constructor', () => {
        it('Should assign default values to x and y if not defined', () => {
            const vec = new Vec2()
            expect(vec).toEqual({
                x: 0,
                y: 0
            });
        })
    })
})