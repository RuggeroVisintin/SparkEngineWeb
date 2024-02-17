const uniqueCounterMap: Record<string, number> = {};

// export function IncrementallyUnique(value: string) {
//     if (uniqueCounterMap[value] === undefined) {
//         uniqueCounterMap[value] = 0;
//         return value;
//     }

//     uniqueCounterMap[value]++;

//     return value + uniqueCounterMap[value];
// }

export function IncrementallyUnique(target: any, key: string) {
    let property = target[key];

    const propertyObject = {
        set: (newValue: string) => {
            property = newValue;

            if (uniqueCounterMap[newValue] === undefined) {
                uniqueCounterMap[newValue] = 0;
                return;
            }

            uniqueCounterMap[newValue]++;
            property = newValue + uniqueCounterMap[newValue]
        },
        get: () => property,
    }   

    Object.defineProperty(target, key, propertyObject);
}