import { AABB, isCollision, toCenteredAABB, toTopLeftAABB, Vec2 } from "../../../../src";

describe('core/math/AABB', () => {
    describe('.isCollision()', () => {
        it.each([
            [[0, 0, 20, 20], [5, 5, 5, 5]],
            [[0, 0, 10, 10], [8, 8, 10, 10]],
            [[0, 0, 10, 10], [0, 0, 10, 10]],
        ])('Should detect collisions between two different AABB instances', (aabb1, aabb2) => {
            expect(isCollision(aabb1 as AABB, aabb2 as AABB)).toBe(true);
        });

        it.each([
            [[0, 0, 10, 10], [20, 20, 5, 5]],
            [[0, 0, 10, 10], [10, 0, 5, 5]],
            [[0, 0, 10, 10], [10, 10, 5, 5]],
            [[0, 0, 10, 10], [0, 10, 10, 5]],
            [[0, 0, 10, 10], [10, 0, 5, 10]],
        ])('Should not detect collision when AABBs do not overlap', (aabb1, aabb2) => {
            expect(isCollision(aabb1 as AABB, aabb2 as AABB)).toBe(false);
        });

        it('Should treat zero-size AABB as a collision', () => {
            const aabb1: AABB = [5, 5, 0, 0];
            const aabb2: AABB = [0, 0, 10, 10];
            expect(isCollision(aabb1, aabb2)).toBe(true);
        });
    });

    describe('.toTopLeftAABB()', () => {
        it.each([
            [[5, 5, 10, 10], [0, 0, 10, 10]]
        ])('Should convert a centered AABB to top-left coordinates', (aabb, expected) => {
            const result = toTopLeftAABB(aabb as AABB);
            expect(result).toEqual(expected);
        });
    })

    describe('.toCenteredAABB()', () => {
        it.each([
            [[0, 0, 10, 10], [5, 5, 10, 10]]
        ])('Should convert a top-left AABB to centered coordinates', (aabb, expected) => {
            const result = toCenteredAABB(aabb as AABB);
            expect(result).toEqual(expected);
        });
    })
})