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

export function ThrowIfNotUnique(target: any, key: string, descriptor: any) {
    console.log('test')
    const originalDescriptor = descriptor;
    descriptor.set = function (value: string) {
        if (uniqueCounterMap[value]) {
            throw new Error(`${value} is already used`)
        }
        originalDescriptor.set(value);
    };

    return descriptor;
}
