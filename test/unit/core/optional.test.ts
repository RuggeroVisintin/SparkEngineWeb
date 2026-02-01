import { Optional, getOptionalType, isOptionallyInstanceOf } from "../../../src/core";

describe('core/optional', () => {
    describe('isOptionallyInstanceOf', () => {
        it('should return true when an optional property is an instance of the given type', () => {
            class Rgb {
                constructor(public r: number = 0, public g: number = 0, public b: number = 0) { }
            }

            class MaterialComponent {
                @Optional(Rgb)
                color?: Rgb;
            }

            const material = new MaterialComponent();

            expect(isOptionallyInstanceOf(material, 'color', Rgb)).toBe(true);
        });

        it('should return true when a non-optional property is an instance of a superclass', () => {
            class Base { }
            class Derived extends Base { }

            class MaterialComponent {
                item?: Derived;
            }

            const material = new MaterialComponent();
            material.item = new Derived();

            expect(isOptionallyInstanceOf(material, 'item', Derived)).toBe(true);
            expect(isOptionallyInstanceOf(material, 'item', Base)).toBe(true);
        });
    });

    describe('@Optional decorator with getOptionalType', () => {
        it('should return the type of an optional property from an instance', () => {
            class Rgb {
                constructor(public r: number = 0, public g: number = 0, public b: number = 0) { }
            }

            class MaterialComponent {
                @Optional(Rgb)
                color?: Rgb;
            }

            const material = new MaterialComponent();

            expect(getOptionalType(material, 'color')).toBe(Rgb);
        });

        it.each([
            [undefined],
            [null],
            [42],
        ])('Should preserve the actual value of the property when accessing it directly', (result: any) => {
            class MaterialComponent {
                @Optional(Number)
                property?: number;
            }

            const material = new MaterialComponent();

            material.property = result;

            expect(material.property).toEqual(result);
        });

        it.each([[
            undefined, typeof undefined
        ], [
            'red', typeof 'red'
        ]])('Should return property value %s when property not registered', (propertyValue: any, expected: string) => {
            class MaterialComponent {
                color?: string;
            }

            const material = new MaterialComponent();
            material.color = propertyValue;

            expect(getOptionalType(material, 'color')).toBe(expected);
        });
    });
});