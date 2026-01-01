import { IComponent } from "../interfaces";

/**
 * @category Components
 * 
 * PropertyScope utility for discovering public properties on component instances.
 * Handles both own properties and getter/setter properties from the prototype chain.
 */
export class PropertyScope {
    /**
     * Get all public properties from a component instance, including getters and setters.
     * Excludes private properties and methods.
     * 
     * @param instance The component instance to inspect
     * @param options Optional filtering options
     * @param options.writable If true, only include read/write properties; if false, only readonly. If undefined, include all.
     * @returns Object mapping property names to their values
     * 
     * @example
     * ```typescript
     * const transform = new TransformComponent();
     * PropertyScope.getPublicProperties(transform) 
     * // Returns: { position: {...}, rotation: {...}, scale: {...}, uuid: '...' }
     * 
     * PropertyScope.getPublicProperties(transform, { writable: true })
     * // Returns: { position: {...}, rotation: {...}, scale: {...} } (only settable properties)
     * 
     * PropertyScope.getPublicProperties(transform, { writable: false })
     * // Returns: { uuid: '...' } (only getter-only properties)
     * ```
     */
    public static getPublicProperties(instance: IComponent, options?: { writable?: boolean }): Record<string, any> {
        const values: Record<string, any> = {};

        // Get own enumerable properties (data properties)
        for (const key of Object.keys(instance)) {
            if (!key.startsWith('_')) {
                if (options?.writable === undefined || options.writable === true) {
                    values[key] = (instance as any)[key];
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
                        values[key] = (instance as any)[key];
                    } else if (options.writable === true && isWritable) {
                        // Only include writable (has setter)
                        values[key] = (instance as any)[key];
                    } else if (options.writable === false && !isWritable) {
                        // Only include readonly (getter only)
                        values[key] = (instance as any)[key];
                    }
                }
            }

            obj = Object.getPrototypeOf(obj);
        }

        return values;
    }
}
