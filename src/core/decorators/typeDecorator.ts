import { registerEntityType } from "../../ecs/entities/factory";

export type WithType<T extends {}> = T & {
    __type: string;
} 

export function Type(value: string) {
    return function (constructor: any) {
        if (constructor.prototype.__types) {
            constructor.prototype.__types = [value, ...constructor.prototype.__types];
        } else {
            constructor.prototype.__types = [value];
        }

        constructor.prototype.__type = value;
        registerEntityType(value, constructor);
    };
}

export function typeOf(object: any): string {
    return object.__type;
}

export function typesOf(object: any): string[] {
    return object.__types;
}