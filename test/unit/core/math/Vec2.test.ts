import { toRounded, Vec2 } from "../../../../src";

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

    describe('.from', () => {
        it('Should return a new vector from an existing one', () => {
            const vec = new Vec2(1, 2);
            const newVec = Vec2.from(vec);

            expect(newVec).toEqual({
                x: 1,
                y: 2
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
    });

    describe('.getNormalized()', () => {
        it('Should return a normalized version of the vector', () => {
            const vec = new Vec2(3, 4);
            const normalized = vec.getNormalized();

            expect(normalized).toEqual({
                x: 0.6,
                y: 0.8
            });
        })
    })

    describe('.dot()', () => {
        it('Should return the dot product of the vector with another vector', () => {
            expect(new Vec2(1, 2).dot(new Vec2(3, 4))).toBe(11);
        })
    });

    describe('.length', () => {
        it('Should get the magnitude of the vector', () => {
            expect(new Vec2(3, 4).length).toBe(5);
        })
    });

    describe('.multiply()', () => {
        it('Should multiply the vector by the given scalar in place', () => {
            const vec = new Vec2(1, 2);

            vec.multiply(2);

            expect(vec).toEqual({
                x: 2,
                y: 4
            });
        });
    })

    describe('.reflect()', () => {
        it('Should reflect the vector in place', () => {
            const vec = new Vec2(1, 2);
            vec.reflect(new Vec2(1, 0));

            expect(vec).toEqual({
                x: -1,
                y: 2
            });
        })
    });

    describe('.toScreenSpace()', () => {
        it('Should convert the vector to screen space coordinates', () => {
            const vec = new Vec2(100, 200);
            const resolution = {
                width: 800,
                height: 600
            }

            const screenSpaceVec = vec.toScreenSpace(resolution);

            expect(screenSpaceVec).toEqual({
                x: toRounded(vec.x - resolution.width / 2, 2),
                y: toRounded(vec.y - resolution.height / 2, 2)
            });
        });
    });

    describe('.toWorldSpace()', () => {
        it('Should convert the vector to world space coordinates', () => {
            const vec = new Vec2(200, 300);
            const resolution = {
                width: 800,
                height: 600
            }
            const worldSpaceVec = vec.toWorldSpace(resolution);

            expect(worldSpaceVec).toEqual({
                x: toRounded(vec.x + resolution.width / 2, 2),
                y: toRounded(vec.y + resolution.height / 2, 2)
            });
        });
    });
});