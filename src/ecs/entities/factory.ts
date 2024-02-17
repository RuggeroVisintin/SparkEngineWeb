import { IEntity } from "./IEntity";

const typesMap: Record<string, Function> = {};

export const registerEntityType = (type: string, constructor: Function) => {
    typesMap[type] = constructor;
}

export const createEntity = <T extends IEntity>(type: string, ...args: any[]): T => {
    return Reflect.construct(
        typesMap[type], args
    ) as T;
}