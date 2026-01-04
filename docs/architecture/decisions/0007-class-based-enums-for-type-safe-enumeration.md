# 7. Class-based Enums for Type-Safe Enumeration

Date: 2026-01-03

## Status

Proposed

## Context

SparkEngineWeb components need to express enumerated types for properties like `BlendMethod` (blend modes for rendering). TypeScript's `enum` keyword compiles to plain JavaScript objects at runtime, which:

1. Are indistinguishable from regular objects (no `instanceof` checks possible)
2. Lose type information once compiled
3. Cannot carry metadata about available values
4. Require external registries to map properties to their enum types (like the `@Optional` decorator pattern)
5. Make dynamic UI generation difficult without additional metadata

This is problematic for:
- **Editor UI**: Cannot detect enum properties to render appropriate select/dropdown controls
- **Type Safety**: Property types are not enforced at runtime

## Alternatives Considered

### Alternative 1: Decorator Registry (`@Enum`)

```typescript
enum BlendMethod {
  Overwrite = 'source-over',
  Add = 'lighter'
}

@Component('RenderComponent')
class RenderComponent {
  @Enum(BlendMethod)
  blendMethod: string = BlendMethod.Overwrite;
}

// Editor lookup:
const enumType = getEnumType(component, 'blendMethod');
const options = Object.values(enumType);
```

**Pros:**
- Works with existing TypeScript enums (no refactoring)
- Consistent with `@Optional` pattern
- Non-intrusive

**Cons:**
- Manual decoration on every property (easy to forget)
- Another global registry to maintain (O(n) Map lookups per detection)
- Type info separated from value (lookup required)
- Need ESLint rule to enforce consistency

### Alternative 2: Hardcoded Registry

Maintain a mapping of component types to their enum properties:

```typescript
const enumRegistry = {
  'RenderComponent': {
    'blendMethod': BlendMethod
  }
};

// Editor lookup:
const enumType = enumRegistry[componentType]?.[propertyName];
```

**Pros:**
- Simple and explicit

**Cons:**
- Doesn't scale (manual registry maintenance)
- Duplicates type information
- Violates DRY principle

## Alternative 3: Class-Based Enums

Define enums as classes with static enum instances and a `getValues()` method. This enables:
- **Type safety**: TypeScript enforces correct enum class usage
- **Runtime detection**: Check if a type has a `getValues()` static method
- **Minimal overhead**: No object instantiation, just static class definitions

#### Example

```typescript
// src/core/enums/BlendMethod.ts
import { Enum } from './Enum';

/**
 * Blend method enumeration for canvas rendering.
 * @category Core
 */
export class BlendMethod extends BaseEnum<number> {
  static readonly Overwrite = new BlendMethod(0);
  static readonly Add = new BlendMethod(1);

  static getValues(): BlendMethod[] {
    return [this.Overwrite, this.Add];
  }
}

export class RenderComponent {
    public blendMethod: BlendMethod = BlendMethod.Overwrite;
}
```

## Decision

1. We will use a class based approach to make sure enum can be reflected at runtime

3. We will enforce usage of class based enum across the codebase to prevent potential bugs due to usage of primitive enums

## Consequences

**Positive:**
- Enum values are primitives (minimal memory footprint)
- Type-safe: TypeScript enforces property types at compile time
- No object instantiation overhead
- Editor can detect and render enum properties automatically
- Consistent pattern for all enums
- Scales well
- ESLint rule enforces proper usage
- Looks and feels like real enums
- Fully backward compatible (primitives = no serialization changes)

**Tradeoffs:**

- All enums will have to be refactored to the new class based approach
- To avoid issues with using plain enums, we will have to enforce usage of class based enums in the codebase