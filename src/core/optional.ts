/**
 * @category Core
 */
export type Nullable<T> = T | null;

// Maps class constructors to their optional properties and their types
const classRegistry = new WeakMap<Function, Map<string, any>>();

/**
 * @category Core
 * 
 * Decorator to register optional property types for runtime type inference.
 * Enables type inference directly from class instances.
 *
 * For type aliases, pass the resolved runtime class, not the alias itself.
 * The ESLint rule `optional-decorator-type-consistency` enforces this automatically.
 *
 * @param type The runtime class/constructor that represents the property's type.
 *             For type aliases, use the base runtime class they resolve to.
 *
 * @example
 * ```typescript
 * // For direct class types:
 * class MaterialComponent {
 *   @Optional(Rgb)
 *   diffuseColor?: Rgb;
 * }
 * 
 * // For type aliases, use the base runtime class:
 * // type CollisionCallback = SerializableCallback<...>
 * class BoundingBoxComponent {
 *   @Optional(SerializableCallback)  // Use runtime class, not alias
 *   onCollision?: CollisionCallback;  // Type annotation can use alias
 * }
 *
 * const material = new MaterialComponent();
 * getOptionalType(material, 'diffuseColor') // Returns Rgb
 * getOptionalType(material, 'onCollision') // Returns SerializableCallback
 * ```
 */
export function Optional<T>(type: T): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const ctor = target.constructor;

        // Get or create the properties map for this class
        let propertiesMap = classRegistry.get(ctor);
        if (!propertiesMap) {
            propertiesMap = new Map<string, any>();
            classRegistry.set(ctor, propertiesMap);
        }

        // Register this property's type
        propertiesMap.set(String(propertyKey), type);
    };
}


/**
 * @category Core
 * 
 * Get the type of a specific optional property of a class instance
 * @param instance The class instance
 * @param property The property name
 * @returns The type registered for this property or its type string if not registered
 */
export function getOptionalType(instance: any, property: string | symbol): any {
    const propertiesMap = classRegistry.get(instance.constructor);
    const propertyType = propertiesMap?.get(String(property));

    if (propertyType !== undefined) {
        return propertyType;
    }

    return typeof instance[property];
}

/**
 * @category Core
 * 
 * Check if an optional class property is an instance of a given type
 * @param instance The class instance
 * @param property The property name
 * @param type The type to check against
 * @returns True if the property is an instance of the given type
 */
export function isOptionallyInstanceOf(instance: any, property: string | symbol, type: any): boolean {
    const propertiesMap = classRegistry.get(instance.constructor);
    const propertyType = propertiesMap?.get(String(property));

    if (propertyType !== undefined) {
        // For @Optional properties, check if a new instance of the registered type is an instance of the given type
        return new propertyType() instanceof type;
    }

    // For non-@Optional properties, check if the actual value is an instance of the given type
    return instance[property] instanceof type;
}

/**
 * @category Core
 * 
 * Get all property names that were registered with @Optional decorator
 * @param instance The class instance
 * @returns Array of property names registered as optional, walking up the prototype chain
 */
export function getOptionalProperties(instance: any): string[] {
    const properties = new Set<string>();

    // Walk up the prototype chain
    let proto = instance.constructor;
    while (proto && proto !== Object) {
        const propertiesMap = classRegistry.get(proto);
        if (propertiesMap) {
            propertiesMap.forEach((_, key) => properties.add(key));
        }
        proto = Object.getPrototypeOf(proto);
    }

    return Array.from(properties);
}