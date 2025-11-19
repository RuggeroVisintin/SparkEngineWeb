import { get } from "http";
import { getRegisteredTypes, registerTypeFactory } from "../factory";

export type WithType<T extends {}> = T & {
    __type: string;
}

/**
 * Type decorator, adds type information to a class and registers it in the factory.
 * 
 * @category Core
 * @param value - the type of the class
 */
export function Type(value: string, category?: string) {
    return function (constructor: any) {
        if (constructor.prototype.__types) {
            constructor.prototype.__types = [value, ...constructor.prototype.__types];
        } else {
            constructor.prototype.__types = [value];
        }

        constructor.prototype.__type = value;
        registerTypeFactory(value, constructor, category);
    };
}

/**
 * Retrieves the type of the given object.
 * 
 * @category Core
 * @param object - the object to get the type of
 * @returns the type of the object
 */
export function typeOf(object: any): string {
    return object.__type;
}

/**
 * Retrieves the type chain of the given object.
 *
 * @category Core 
 * @param object - the object to get the type chain of
 * @returns the type chain of the object
 */
export function typesOf(object: any): string[] {
    return object.__types;
}

export function allOf(category?: string): Record<string, Function> {
    return getRegisteredTypes(category);
}