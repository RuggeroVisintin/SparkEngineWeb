const uniqueCounterMap: Record<string, Record<string, number>> = {'global': {}};

/** Decorator function */
export function incrementallyUnique(value: string) {
    if (uniqueCounterMap['global'][value] === undefined) {
        uniqueCounterMap['global'][value] = 0;
        return value;
    }

    uniqueCounterMap['global'][value]++;

    return value + uniqueCounterMap['global'][value];
}

export interface UniquenessOpts {
    scope?: string
}

export function throwIfNotUnique(value: string, options?: UniquenessOpts) {
    const scope = options?.scope ?? 'global';

    if (uniqueCounterMap[scope]?.[value] !== undefined) {
        throw new Error(`${value} is already used`);
    }

    if (!uniqueCounterMap[scope]) {
        uniqueCounterMap[options?.scope ?? 'global'] = {};
    }

    uniqueCounterMap[scope][value] = 0;
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