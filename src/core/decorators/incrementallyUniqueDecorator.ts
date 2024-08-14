const uniqueCounterMap: Record<string, Record<string, number>> = { 'global': {} };

const sanitizeScope = (scope: string): string => {
    if (scope === '__proto__') return '';

    return scope;
}

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

export function registerUnique(value: string, options?: UniquenessOpts) {
    const scope = sanitizeScope(options?.scope ?? 'global');

    if (uniqueCounterMap[scope]?.[value] !== undefined) {
        throw new Error(`${value} is already used`);
    }

    if (!uniqueCounterMap[scope]) {
        uniqueCounterMap[scope] = {};
    }

    Object.keys(uniqueCounterMap['global']).forEach(key => {
        if (value.match(`^${key}\\d+$`)) {
            const count = parseInt(value.split(key)[1]);

            if (count > uniqueCounterMap['global'][key]) {
                uniqueCounterMap['global'][key] = count;
                uniqueCounterMap[scope][key] = count;
            }
        }
    })

    uniqueCounterMap[scope][value] = 0;
    uniqueCounterMap['global'][value] = 0;
}

export function unregisterUnique(value: string, options?: UniquenessOpts) {
    const scope = sanitizeScope(options?.scope ?? 'global');

    delete uniqueCounterMap[scope]?.[value];
}

export function RegisterUnique(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor = descriptor || {};
    const prevSet = descriptor.set;

    descriptor.set = function (this: any, newValue) {
        registerUnique(newValue);

        if (prevSet) prevSet.call(this, newValue);
    }

    return descriptor;
}