import { Color } from "../../../src"

describe('core/Color', () => {
    let color = new Color();

    afterEach(() => {
        color = new Color();
    })

    describe('set r()', () => {
        it('Should cap the upper value to 255', () => {
            color.r = 324;

            expect(color.r).toBe(255);
        })

        it('Should cap the lower value to 0', () => {
            color.r = -123;

            expect(color.r).toBe(0);
        })

        it('Should assign the given value', () => {
            color.r = 200;

            expect(color.r).toBe(200);
        })
    })

    describe('set g)', () => {
        it('Should cap the upper value to 255', () => {
            color.g = 324;

            expect(color.g).toBe(255);
        })

        it('Should cap the lower value to 0', () => {
            color.g = -123;

            expect(color.g).toBe(0);
        })

        it('Should assign the given value', () => {
            color.g = 200;

            expect(color.g).toBe(200);
        })
    })

    describe('set b()', () => {
        it('Should cap the upper value to 255', () => {
            color.b = 324;

            expect(color.b).toBe(255);
        })

        it('Should cap the lower value to 0', () => {
            color.b = -123;

            expect(color.b).toBe(0);
        })

        it('Should assign the given value', () => {
            color.b = 200;

            expect(color.b).toBe(200);
        })
    })

    describe('set a()', () => {
        it('Should cap the upper value to 100', () => {
            color.a = 324;

            expect(color.a).toBe(100);
        })

        it('Should cap the lower value to 0', () => {
            color.a = -123;

            expect(color.b).toBe(0);
        })

        it('Should assign the given value', () => {
            color.a = 200;

            expect(color.a).toBe(100);
        })
    })

    describe('.toString()', () => {
        it('Should convert a color into a rgba() like string', () => {
            expect(new Color(255, 0, 0, 100).toString()).toBe('rgba(255, 0, 0, 1)')
        })
    })
})