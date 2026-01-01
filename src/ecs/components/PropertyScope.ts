/**
 * @category Components
 * 
 * PropertyScope utility for discovering public properties on component instances.
 * Handles both own properties and getter/setter properties from the prototype chain.
 * 
 * This is a component-specific utility that relies on the naming convention:
 * - Underscore prefix (_) for private/protected properties (hidden from UI)
 * - No prefix for public properties (exposed for editing)
 * 
 * Component classes must use the getter pattern (no setters) for readonly properties
 * to enable runtime detectability via PropertyScope.
 */
export class PropertyScope {
    /**
     * Get all public properties from a component instance, including getters and setters.
     * Excludes private properties (starting with _) and methods.
     * 
     * @param instance The component instance to inspect
     * @param options Optional filtering options
     * @param options.writable If true, only include read/write properties; if false, only readonly. If undefined, include all.
     * @returns Array of public property names
     * 
     * @example
     * ```typescript
     * const transform = new TransformComponent();
     * PropertyScope.getPublicProperties(transform) 
     * // Returns: ['position', 'rotation', 'scale']
     * 
     * PropertyScope.getPublicProperties(transform, { writable: true })
     * // Returns: ['position', 'rotation', 'scale'] (only settable properties)
     * 
     * PropertyScope.getPublicProperties(transform, { writable: false })
     * // Returns: ['uuid'] (only getter-only properties)
     * ```
     */
    public static getPublicProperties(instance: any, options?: { writable?: boolean }): string[] {
        const properties = new Set<string>();

        // Get own enumerable properties (data properties)
        for (const key of Object.keys(instance)) {
            if (!key.startsWith('_')) {
                if (options?.writable === undefined || options.writable === true) {
                    properties.add(key);
                }
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

                // Process getters and setters
                if (descriptor.get || descriptor.set) {
                    const isWritable = !!descriptor.set;

                    // Filter based on writable option
                    if (options?.writable === undefined) {
                        // Include all
                        properties.add(key);
                    } else if (options.writable === true && isWritable) {
                        // Only include writable (has setter)
                        properties.add(key);
                    } else if (options.writable === false && !isWritable) {
                        // Only include readonly (getter only)
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
     * @param instance The component instance
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
