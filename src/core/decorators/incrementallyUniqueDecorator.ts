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

export function throwIfNotUnique(value: string) {
    if (uniqueCounterMap[value] !== undefined) {
        throw new Error(`${value} is already used`);
    }

    uniqueCounterMap[value] = 0;
}

export function ThrowIfNotUnique(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor = descriptor || {};
    const prevSet = descriptor.set;

    descriptor.set = function (this: any, newValue) {
        throwIfNotUnique(newValue);

        if (prevSet) prevSet.call(this, newValue);
    }
    
    return descriptor;
}