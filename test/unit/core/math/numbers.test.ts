import { toRounded } from "../../../../src";

describe('core/math/numbers', () => {
    describe('.toRounded()', () => {
        it.each([
            [1.23456, 2, 1.23],
            [1.23456, 3, 1.235],
            [1.23456, 0, 1],
            [1.99999, 2, 2],
            [0.12345, 3, 0.123],
            [-1.23456, 2, -1.23],
            [-1.23456, 3, -1.235]
        ])('Should round a %n to the nearest decimal place', (number, precision, expected) => {
            const rounded = toRounded(number, precision);
            expect(rounded).toBe(expected);
        })
    })
});