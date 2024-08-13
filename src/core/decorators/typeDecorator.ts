import { registerTypeFactory } from "../factory";
import { incrementallyUnique } from "./incrementallyUniqueDecorator";

export type WithType<T extends {}> = T & {
    __type: string;
} 

export function Type(value: string) {
    console.log('Type', value);
    incrementallyUnique(value);
    
    return function (constructor: any) {
        if (constructor.prototype.__types) {
            constructor.prototype.__types = [value, ...constructor.prototype.__types];
        } else {
            constructor.prototype.__types = [value];
        }

        constructor.prototype.__type = value;
        registerTypeFactory(value, constructor);
    };
}

export function typeOf(object: any): string {
    return object.__type;
}

export function typesOf(object: any): string[] {
    return object.__types;
}