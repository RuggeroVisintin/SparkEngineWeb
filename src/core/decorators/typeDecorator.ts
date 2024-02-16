import { registerEntityType } from "../../ecs/entities/factory";

export function Type(value: string) {
    return function (constructor: Function) {
        constructor.prototype.__type = value;
        registerEntityType(value, constructor);
    };
}

export function typeOf(object: any): string {
    return object.__type;
}