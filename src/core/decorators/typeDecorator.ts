export function Type(value: string) {
    return function (constructor: Function) {
        constructor.prototype.__type = value;
    };
}

export function typeOf(object: any): string {
    return object.__type;
}