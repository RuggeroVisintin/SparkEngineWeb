# 6. Enforce underscore prefix for private and protected class properties

Date: 2026-01-01

## Status

Accepted

## Context

SparkEngineWeb's ECS architecture requires runtime introspection of **component properties** to support dynamic UI generation and serialization. JavaScript lacks built-in runtime type information without decorators, making property discovery dependent on naming conventions rather than metadata.

## Decision

1. We will use underscore prefix (`_`) for all private and protected properties and methods in component classes to distinguish them with respect to public ones.

2. We will automatically enforce this convention via ESLint rule `@typescript-eslint/naming-convention` targeting `classProperty` and `classMethod` selectors in component classes.

3. We will use the getter pattern (private backing field + public getter) for public readonly properties in components to enable runtime detection of readonly semantics via `Object.getOwnPropertyDescriptors()`.

4. We will scope this convention to component classes only, identified by the `@Component` decorator or `BaseComponent` extension, avoiding unnecessary restrictions in other contexts.

5. We will provide a `getPublicProperties()` utility function (in `src/ecs/components/utils/index.ts`) to enable runtime property discovery and introspection for UI generation and serialization, accepting only `IComponent` instances.

6. We will avoid decorators and reflect-metadata in favor of convention-based introspection using native JavaScript APIs, eliminating bundle bloat and runtime overhead while remaining simple and maintainable.

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

// Usage with getPublicProperties
const component = new TransformComponent();

// Get all public properties (data + getters/setters)
const allProps = getPublicProperties(component);
// Result: { position: {...}, rotation: {...}, scale: {...}, uuid: '...' }

// Get only writable properties (data + getters with setters)
const writable = getPublicProperties(component, { writable: true });
// Result: { position: {...}, rotation: {...}, scale: {...} }

// Get only readonly properties (getter-only)
const readonly = getPublicProperties(component, { writable: false });
// Result: { uuid: '...' }
```

## Consequences

**Positive:**
- Enables `getPublicProperties()` utility function (component-specific) to reliably identify public properties using `Object.getOwnPropertyDescriptors()` and return property values directly 
- Supports dynamic component property discovery without reflect-metadata overhead
- Provides clear visual distinction between public API and internal implementation
- Automatically enforced by linting, eliminating manual review burden
- Component-focused scope keeps architecture bounded and maintainable

**Risks:**
- Breaking change for any existing code not following the convention
- Must ensure ESLint rules don't flag legitimate use cases (object literals, test fixtures handled via selector specificity)
