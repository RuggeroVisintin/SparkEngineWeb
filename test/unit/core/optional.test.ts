import { Optional, getOptionalType } from "../../../src/core";

describe('core/optional', () => {
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

        it.each([
            undefined,
            'red'
        ])('Should return property value %s when property not registered', (propertyValue: any) => {
            class MaterialComponent {
                color?: string;
            }

            const material = new MaterialComponent();
            material.color = propertyValue;

            expect(getOptionalType(material, 'color')).toBe(propertyValue?.constructor?.name ?? undefined);
        });
    });
});