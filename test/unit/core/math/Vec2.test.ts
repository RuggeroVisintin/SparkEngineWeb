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

    describe('.negate()', () => {
        it('Should negate the vector in place', () => {
            const vec = new Vec2(1, 2);
            vec.negate()
            expect(vec).toEqual({
                x: -1,
                y: -2
            });
        }) 
    })

    describe('.getNegated()', () => {
        it('Should return a new vector with the negated values', () => { 
            const vec = new Vec2(1, 2);
            const negated = vec.getNegated();
            
            expect(negated).toEqual({
                x: -1,
                y: -2
            });
        })

        it('Should not modify the original vector', () => {
            const vec = new Vec2(1, 2);
            const negated = vec.getNegated();

            expect(negated).not.toBe(vec);
            expect(vec).toEqual({
                x: 1,
                y: 2
            });
        })
    })
})