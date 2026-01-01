/**
 * @category Core
 * 
 * PropertyScope utility for discovering public, protected, and private properties on class instances.
 * Handles both own properties and getter/setter properties from the prototype chain.
 */
export class PropertyScope {
    /**
     * Get all public properties from a class instance, including getters and setters.
     * Excludes private properties (starting with _) and methods.
     * 
     * @param instance The class instance to inspect
     * @returns Array of public property names
     * 
     * @example
     * ```typescript
     * const material = new MaterialComponent();
     * PropertyScope.getPublicProperties(material) 
     * // Returns: ['diffuseColor', 'opacity', 'diffuseTexture', 'diffuseTexturePath']
     * ```
     */
    public static getPublicProperties(instance: any): string[] {
        const properties = new Set<string>();

        // Get own enumerable properties
        for (const key of Object.keys(instance)) {
            if (!key.startsWith('_')) {
                properties.add(key);
            }
        }

        // Get getters/setters from prototype chain
        let obj = Object.getPrototypeOf(instance);
        while (obj && obj !== Object.prototype) {
            const descriptors = Object.getOwnPropertyDescriptors(obj);

            for (const [key, descriptor] of Object.entries(descriptors)) {
                // Skip private properties, methods, and constructor
                if (key.startsWith('_') || key === 'constructor') {
                    continue;
                }

                // Include getters, setters, and data properties
                if (descriptor.get || descriptor.set || descriptor.value) {
                    // Skip if it's a function (method)
                    if (typeof descriptor.value !== 'function') {
                        properties.add(key);
                    }
                }
            }

            obj = Object.getPrototypeOf(obj);
        }

        return Array.from(properties);
    }

    /**
     * Get the value and descriptor of a property (handles getters/setters).
     * 
     * @param instance The class instance
     * @param property The property name
     * @returns Object with value and whether it's a getter/setter
     */
    public static getPropertyInfo(
        instance: any,
        property: string
    ): { value: any; hasGetter: boolean; hasSetter: boolean } {
        let obj = instance;
        let descriptor;

        // Check instance first
        descriptor = Object.getOwnPropertyDescriptor(instance, property);
        if (descriptor) {
            return {
                value:
                    descriptor.value !== undefined
                        ? descriptor.value
                        : descriptor.get?.call(instance),
                hasGetter: !!descriptor.get,
                hasSetter: !!descriptor.set,
            };
        }

        // Check prototype chain for getters/setters
        obj = Object.getPrototypeOf(instance);
        while (obj && obj !== Object.prototype) {
            descriptor = Object.getOwnPropertyDescriptor(obj, property);
            if (descriptor) {
                return {
                    value: descriptor.get?.call(instance),
                    hasGetter: !!descriptor.get,
                    hasSetter: !!descriptor.set,
                };
            }
            obj = Object.getPrototypeOf(obj);
        }

        return {
            value: undefined,
            hasGetter: false,
            hasSetter: false,
        };
    }
}
