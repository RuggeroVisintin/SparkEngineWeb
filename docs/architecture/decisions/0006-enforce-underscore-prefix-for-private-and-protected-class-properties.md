# 6. Enforce underscore prefix for private and protected class properties

Date: 2026-01-01

## Status

Accepted

## Context

SparkEngineWeb's ECS architecture requires runtime introspection of component properties to support dynamic UI generation and serialization. JavaScript lacks built-in runtime type information without decorators, making property discovery dependent on naming conventions rather than metadata.

## Decision

Enforce an underscore prefix (`_`) for all private and protected class properties and methods, with no prefix for public members. This convention is automatically enforced via ESLint rule `@typescript-eslint/naming-convention` targeting `classProperty` and `classMethod` selectors.

This approach was favored over alternatives (e.g., decorators or reflect-metadata) because it is simple, effective, and requires minimal additional work. It leverages native JavaScript APIs and ESLint infrastructure already present in the project, avoiding unnecessary bundle bloat and runtime overhead.

## Example

```typescript
@Component('TransformComponent')
export class TransformComponent extends BaseComponent {
  // Public properties (no prefix) - discovered by PropertyScope
  position: Vector2 = new Vector2(0, 0);
  rotation: number = 0;
  scale: Vector2 = new Vector2(1, 1);

  // Protected properties (underscore prefix)
  protected _isDirty: boolean = false;

  // Private properties (underscore prefix)
  private _cachedMatrix: Matrix4 | null = null;
}

// Usage with PropertyScope
const component = new TransformComponent();
const publicProps = PropertyScope.getPublicProperties(component);
// Result: ['position', 'rotation', 'scale']
// Filtered out: '_isDirty', '_cachedMatrix'
```

## Consequences

**Positive:**
- Enables `PropertyScope` utility to reliably identify public properties using `Object.getOwnPropertyDescriptors()` 
- Supports dynamic component property discovery without reflect-metadata overhead
- Provides clear visual distinction between public API and internal implementation
- Automatically enforced by linting, eliminating manual review burden

**Risks:**
- Breaking change for any existing code not following the convention
- Must ensure ESLint rules don't flag legitimate use cases (object literals, test fixtures handled via selector specificity)
