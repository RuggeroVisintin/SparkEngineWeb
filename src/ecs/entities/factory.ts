import { IEntity } from "./IEntity";

const typesMap: Record<string, Function> = {};

/**
 * This component is an helper used during the loading of scenes
 * We don't recommend using it directly
 * 
 * @internal
 * @category Entities
 * @param type - the type of the entity to register
 * @param constructor - the construction function of the entity
 */
export const registerEntityType = (type: string, constructor: Function) => {
    typesMap[type] = constructor;
}


/**
 * This component is an helper used during the loading of scenes
 * We don't recommend using it directly
 * 
 * @internal
 * @category Entities
 * @param type - the type of the entity to create
 * @param args - the arguments to pass to the entity constructor
 * 
 * @returns an entity of given type constructed with given params
 */
export const createEntity = <T extends IEntity>(type: string, ...args: any[]): T => {
    return Reflect.construct(
        typesMap[type], args
    ) as T;
}