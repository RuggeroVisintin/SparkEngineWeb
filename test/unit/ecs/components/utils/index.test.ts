import { BaseComponent } from "../../../../../src";
import { getPublicProperties } from "../../../../../src/ecs/components/utils";

describe('ecs/components/getPublicProperties', () => {
    describe('getPublicProperties', () => {
        it('should return all public properties from a component instance', () => {
            class TestComponent extends BaseComponent {
                public name: string = 'test';
                public value: number = 42;
                private _internal: string = 'hidden';

                public getValue() {
                    return this.value;
                }
            }

            const instance = new TestComponent();
            const props = getPublicProperties(instance);

            expect(props).toHaveProperty('name', 'test');
            expect(props).toHaveProperty('value', 42);
            expect(props).not.toHaveProperty('_internal');
            expect(props).not.toHaveProperty('getValue');
        });

        it('should include getter properties', () => {
            class TestComponent extends BaseComponent {
                private _x: number = 10;

                public get x(): number {
                    return this._x;
                }

                public set x(value: number) {
                    this._x = value;
                }
            }

            const instance = new TestComponent();
            const props = getPublicProperties(instance);

            expect(props).toHaveProperty('x', 10);
            expect(props).not.toHaveProperty('_x');
        });

        it('should filter out private properties starting with underscore', () => {
            class TestComponent extends BaseComponent {
                public visible: string = 'public';
                private _hidden: string = 'private';
                protected _protected: string = 'protected';
            }

            const instance = new TestComponent();
            const props = getPublicProperties(instance);

            expect(props).toHaveProperty('visible', 'public');
            expect(props).not.toHaveProperty('_hidden');
            expect(props).not.toHaveProperty('_protected');
        });

        it('should handle inheritance', () => {
            class ParentComponent extends BaseComponent {
                public baseProperty: string = 'base';

                public get baseProp(): string {
                    return this.baseProperty;
                }
            }

            class ChildComponent extends ParentComponent {
                public derivedProperty: number = 42;
            }

            const instance = new ChildComponent();
            const props = getPublicProperties(instance);

            expect(props).toHaveProperty('baseProperty', 'base');
            expect(props).toHaveProperty('baseProp', 'base');
            expect(props).toHaveProperty('derivedProperty', 42);
        });

        it('should exclude methods but include properties', () => {
            class TestComponent extends BaseComponent {
                public data: string = 'value';

                public method() {
                    return 'method result';
                }

                public anotherMethod() {
                    return 'another';
                }
            }

            const instance = new TestComponent();
            const props = getPublicProperties(instance);

            expect(props).toHaveProperty('data', 'value');
            expect(props).not.toHaveProperty('method');
            expect(props).not.toHaveProperty('anotherMethod');
        });

        it('should filter writable properties with getters/setters', () => {
            class TestComponent extends BaseComponent {
                private _x: number = 10;
                private _y: number = 20;

                public get x(): number {
                    return this._x;
                }

                public set x(value: number) {
                    this._x = value;
                }

                public get y(): number {
                    return this._y;
                }
            }

            const instance = new TestComponent();
            const allProps = getPublicProperties(instance);
            const writableProps = getPublicProperties(instance, { writable: true });
            const readonlyProps = getPublicProperties(instance, { writable: false });

            expect(allProps).toHaveProperty('x', 10);
            expect(allProps).toHaveProperty('y', 20);
            expect(writableProps).toHaveProperty('x', 10);
            expect(writableProps).not.toHaveProperty('y');
            expect(readonlyProps).not.toHaveProperty('x');
            expect(readonlyProps).toHaveProperty('y', 20);
        });

        it('should filter readonly properties (getter-only) correctly', () => {
            class TestComponent extends BaseComponent {
                private _id: string = '123';
                public name: string = 'test';

                public get id(): string {
                    return this._id;
                }
            }

            const instance = new TestComponent();
            const readonlyProps = getPublicProperties(instance, { writable: false });

            expect(readonlyProps).toHaveProperty('id', '123');
            expect(readonlyProps).not.toHaveProperty('name');
        });

        it('should filter writable data properties correctly', () => {
            class TestComponent extends BaseComponent {
                public name: string = 'test';
                public age: number = 25;
            }

            const instance = new TestComponent();
            const writableProps = getPublicProperties(instance, { writable: true });

            expect(writableProps).toHaveProperty('name', 'test');
            expect(writableProps).toHaveProperty('age', 25);
        });
    });
});
