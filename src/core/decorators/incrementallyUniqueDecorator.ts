const uniqueCounterMap: Record<string, number> = {};

/** Decorator function */
export function incrementallyUnique(value: string) {
    if (uniqueCounterMap[value] === undefined) {
        uniqueCounterMap[value] = 0;
        return value;
    }

    uniqueCounterMap[value]++;

    return value + uniqueCounterMap[value];
}

/** Typescript decorator */
export function IncrementallyUnique(target: any, key: string) {
    let property = target[key];

    const propertyObject = {
        set: (newValue: string) => {
            property = incrementallyUnique(newValue);
        },
        get: () => property,
    }   

    Object.defineProperty(target, key, propertyObject);
}