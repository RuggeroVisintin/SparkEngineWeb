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
 * Get the type of a specific optional property from an instance
 * @param instance The class instance
 * @param property The property name
 * @returns The type registered for this property or its value if not registered
 */
export function getOptionalType(instance: any, property: string | symbol): any {
    const propertiesMap = classRegistry.get(instance.constructor);
    const propertyType = propertiesMap?.get(String(property));

    if (propertyType === undefined) {


        return instance[property]?.constructor?.name ?? undefined;
    }

    return propertyType;
}