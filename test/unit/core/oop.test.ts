import { PropertyScope } from "../../../src/core/oop";

describe('core/oop', () => {
    describe('PropertyScope.getPublicProperties', () => {
        it('should return all public properties from a class instance', () => {
            class TestComponent {
                public name: string = 'test';
                public value: number = 42;
                private _internal: string = 'hidden';

                public getValue() {
                    return this.value;
                }
            }

            const instance = new TestComponent();
            const props = PropertyScope.getPublicProperties(instance);

            expect(props).toContain('name');
            expect(props).toContain('value');
            expect(props).not.toContain('_internal');
            expect(props).not.toContain('getValue');
        });

        it('should include getter properties', () => {
            class TestComponent {
                private _x: number = 10;

                public get x(): number {
                    return this._x;
                }

                public set x(value: number) {
                    this._x = value;
                }
            }

            const instance = new TestComponent();
            const props = PropertyScope.getPublicProperties(instance);

            expect(props).toContain('x');
            expect(props).not.toContain('_x');
        });

        it('should filter out private properties starting with underscore', () => {
            class TestComponent {
                public visible: string = 'public';
                private _hidden: string = 'private';
                protected _protected: string = 'protected';
            }

            const instance = new TestComponent();
            const props = PropertyScope.getPublicProperties(instance);

            expect(props).toContain('visible');
            expect(props).not.toContain('_hidden');
            expect(props).not.toContain('_protected');
        });

        it('should handle inheritance', () => {
            class BaseComponent {
                public baseProperty: string = 'base';

                public get baseProp(): string {
                    return this.baseProperty;
                }
            }

            class DerivedComponent extends BaseComponent {
                public derivedProperty: number = 42;
            }

            const instance = new DerivedComponent();
            const props = PropertyScope.getPublicProperties(instance);

            expect(props).toContain('baseProperty');
            expect(props).toContain('baseProp');
            expect(props).toContain('derivedProperty');
        });

        it('should exclude methods but include properties', () => {
            class TestComponent {
                public data: string = 'value';

                public method() {
                    return 'method result';
                }

                public anotherMethod() {
                    return 'another';
                }
            }

            const instance = new TestComponent();
            const props = PropertyScope.getPublicProperties(instance);

            expect(props).toContain('data');
            expect(props).not.toContain('method');
            expect(props).not.toContain('anotherMethod');
        });
    });

    describe('PropertyScope.getPropertyInfo', () => {
        it('should return property value and accessor info', () => {
            class TestComponent {
                public name: string = 'test';
            }

            const instance = new TestComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'name');

            expect(info.value).toBe('test');
            expect(info.hasGetter).toBe(false);
            expect(info.hasSetter).toBe(false);
        });

        it('should detect getter-only properties', () => {
            class TestComponent {
                private _x: number = 42;

                public get x(): number {
                    return this._x;
                }
            }

            const instance = new TestComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'x');

            expect(info.value).toBe(42);
            expect(info.hasGetter).toBe(true);
            expect(info.hasSetter).toBe(false);
        });

        it('should detect setter-only properties', () => {
            class TestComponent {
                private _x: number = 0;

                public set x(value: number) {
                    this._x = value;
                }
            }

            const instance = new TestComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'x');

            expect(info.value).toBeUndefined();
            expect(info.hasGetter).toBe(false);
            expect(info.hasSetter).toBe(true);
        });

        it('should detect getter and setter properties', () => {
            class TestComponent {
                private _x: number = 10;

                public get x(): number {
                    return this._x;
                }

                public set x(value: number) {
                    this._x = value;
                }
            }

            const instance = new TestComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'x');

            expect(info.value).toBe(10);
            expect(info.hasGetter).toBe(true);
            expect(info.hasSetter).toBe(true);
        });

        it('should return undefined for non-existent properties', () => {
            class TestComponent {
                public name: string = 'test';
            }

            const instance = new TestComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'nonExistent');

            expect(info.value).toBeUndefined();
            expect(info.hasGetter).toBe(false);
            expect(info.hasSetter).toBe(false);
        });

        it('should handle inherited getter/setter properties', () => {
            class BaseComponent {
                private _base: number = 100;

                public get baseValue(): number {
                    return this._base;
                }

                public set baseValue(value: number) {
                    this._base = value;
                }
            }

            class DerivedComponent extends BaseComponent {
                public value: number = 42;
            }

            const instance = new DerivedComponent();
            const info = PropertyScope.getPropertyInfo(instance, 'baseValue');

            expect(info.value).toBe(100);
            expect(info.hasGetter).toBe(true);
            expect(info.hasSetter).toBe(true);
        });
    });
});
