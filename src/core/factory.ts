import { IComponent } from "../ecs";
import { IEntity } from "../ecs/entities/IEntity";

export const DEFAULT_CATEGORY = 'default';

const typesMap: Record<string, Record<string, Function>> = { '*': {} };

/**
 * This component is an helper used during the loading of scenes
 * We don't recommend using it directly
 * 
 * @internal
 * @category Core
 * @param type - the type of the element to register
 * @param constructor - the construction function of the element
 */
export const registerTypeFactory = (type: string, constructor: Function, category: string = DEFAULT_CATEGORY) => {
    if (!typesMap[category]) {
        typesMap[category] = {};
    }

    typesMap[category][type] = constructor;
    typesMap['*'][type] = constructor;
}

export const getRegisteredTypes = (category = DEFAULT_CATEGORY): Record<string, Function> => {
    return typesMap[category];
}


/**
 * This component is an helper used during the loading of scenes
 * We don't recommend using it directly
 * 
 * @internal
 * @category Core
 * @param type - the type of the element to create
 * @param args - the arguments to pass to the element constructor
 * 
 * @returns an element of given type constructed with given params
 */
export const create = <T extends IEntity | IComponent>(type: string, ...args: any[]): T => {
    return Reflect.construct(
        typesMap['*'][type], args
    ) as T;
}