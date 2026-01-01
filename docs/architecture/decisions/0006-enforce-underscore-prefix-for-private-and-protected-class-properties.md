# 6. Enforce underscore prefix for private and protected class properties

Date: 2026-01-01

## Status

Accepted

## Context

SparkEngineWeb's ECS architecture requires runtime introspection of **component properties** to support dynamic UI generation and serialization. JavaScript lacks built-in runtime type information without decorators, making property discovery dependent on naming conventions rather than metadata.

## Decision

Enforce an underscore prefix (`_`) for all private and protected class properties and methods in **component classes**, with no prefix for public members. This convention is automatically enforced via ESLint rule `@typescript-eslint/naming-convention` targeting `classProperty` and `classMethod` selectors.

This approach was favored over alternatives (e.g., decorators or reflect-metadata) because it is simple, effective, and requires minimal additional work. It leverages native JavaScript APIs and ESLint infrastructure already present in the project, avoiding unnecessary bundle bloat and runtime overhead.

The `PropertyScope` utility (in `src/ecs/components/PropertyScope.ts`) is component-specific and enables runtime property introspection for UI generation and serialization.

## Example

```typescript
@Component('TransformComponent')
export class TransformComponent extends BaseComponent {
  // Writable data properties (public, no underscore)
  position: Vector2 = new Vector2(0, 0);
  rotation: number = 0;
  scale: Vector2 = new Vector2(1, 1);

  // Readonly property (getter-only, no setter)
  private _uuid: string = generateId();
  public get uuid(): string {
    return this._uuid;
  }

  // Protected/internal state (underscore prefix - not exposed)
  protected _isDirty: boolean = false;
  private _cachedMatrix: Matrix4 | null = null;
}

// Usage with PropertyScope
const component = new TransformComponent();

// Get all public properties (data + getters/setters)
const allProps = PropertyScope.getPublicProperties(component);
// Result: ['position', 'rotation', 'scale', 'uuid']

// Get only writable properties (data + getters with setters)
const writable = PropertyScope.getPublicProperties(component, { writable: true });
// Result: ['position', 'rotation', 'scale']

// Get only readonly properties (getter-only)
const readonly = PropertyScope.getPublicProperties(component, { writable: false });
// Result: ['uuid']
```

## Enforcement

Component classes are enforced to use the getter pattern for public readonly properties (not the TypeScript `readonly` keyword) via a custom ESLint rule. Private/protected properties can use `readonly` as needed. This ensures readonly properties are detectable at runtime through `PropertyScope.getPropertyInfo()`.

Example enforcement:
```typescript
// ❌ Forbidden in components
@Component('Example')
export class Example extends BaseComponent {
    public readonly id: string = uuid();  // Error: must use getter
}

// ✅ Allowed in components
@Component('Example')
export class Example extends BaseComponent {
    private _id: string = uuid();
    
    public get id(): string {
        return this._id;
    }
}

// ✅ OK - private readonly is allowed
@Component('Example')
export class Example extends BaseComponent {
    private readonly _uuid = uuid();
}
```

## Consequences

**Positive:**
- Enables `PropertyScope` utility (component-specific) to reliably identify public properties using `Object.getOwnPropertyDescriptors()` 
- Supports dynamic component property discovery without reflect-metadata overhead
- Provides clear visual distinction between public API and internal implementation
- Automatically enforced by linting, eliminating manual review burden
- Component-focused scope keeps architecture bounded and maintainable

**Risks:**
- Breaking change for any existing code not following the convention
- Must ensure ESLint rules don't flag legitimate use cases (object literals, test fixtures handled via selector specificity)
