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
    console.log('registerUnique', value); 
    const scope = sanitizeScope(options?.scope ?? 'global');
    const sanitizeKey = (key: string) => {
        const match = key.match(/^(\w+)(\d+)$/);
        if (match) {
            return match[1]
        }
        return key;
    }

    const sanitizedKey = sanitizeKey(value);

    if (uniqueCounterMap[scope]?.[value] !== undefined) {
        throw new Error(`${value} is already used`);
    }

    if (!uniqueCounterMap[scope]) {
        uniqueCounterMap[scope] = {};
    }

    const found = Object.keys(uniqueCounterMap['global']).filter(key => {
        if (value.match(`^${key}\\d+$`)) {
            const count = parseInt(value.split(key)[1]);

            if (count > uniqueCounterMap['global'][key]) {
                uniqueCounterMap['global'][key] = count;
                uniqueCounterMap[scope][key] = count;
            }

            return true;
        }

        return false;
    })

    uniqueCounterMap[scope][value] = 0;
    uniqueCounterMap['global'][value] = 0;

    console.log(JSON.stringify(uniqueCounterMap));
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