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
- **Serialization**: Cannot distinguish enum values from regular strings/numbers
- **Type Safety**: Property types are not enforced at runtime

## Decision

We will adopt a **class-based enum pattern** inspired by Java enums:

1. Create a `BaseEnum<T>` abstract class in `src/core/enums/BaseEnum.ts` with:
   - A protected constructor accepting a value (string | number)
   - A `value` property exposing the enum value
   - A static method for retrieving all enum members

2. Define specific enums by extending `BaseEnum<T>`, declaring static readonly instances:
   ```typescript
   class BlendMethod extends BaseEnum<BlendMethod> {
     static readonly Overwrite = new BlendMethod('source-over');
     static readonly Add = new BlendMethod('lighter');
     private constructor(value: string) { super(value); }
     static getValues(): BlendMethod[] { return [this.Overwrite, this.Add]; }
   }
   ```

3. Export enums from `src/core/enums/index.ts` for use in components.

4. Update components to use enum types for enum properties instead of primitive types:
   ```typescript
   @Component('RenderComponent')
   class RenderComponent {
     blendMethod: BlendMethod = BlendMethod.Overwrite;
   }
   ```

5. Create an ESLint rule to enforce that enum properties are instances of `BaseEnum` subclasses (preventing raw enum usage).

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
- Another global registry to maintain
- Type info separated from value (lookup required)
- Need ESLint rule to enforce consistency
- At runtime: values are just primitives, not self-describing

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

## Selected Approach: Class-Based Enums

### Example: Creating a New Enum

```typescript
// src/core/enums/BlendMethod.ts
import { Type } from '../decorators/typed';
import { BaseEnum } from './BaseEnum';
BaseEnum } from './BaseEnum';

/**
 * Blend method enumeration for canvas rendering.
 * @category Core
 */erwrite = new BlendMethod('source-over');
  static readonly Add = new BlendMethod('lighter');

  private constructor(value: string) {
    super(value);
  }

  static getValues(): BlendMethod[] {
    return [this.Overwrite, this.Add];
  }
}
```

### Example: Using Enums in Components

```typescript
import { Component, Type } from '../decorators/typed';
import { BaseComponent } from './BaseComponent';
import { BlendMeth } from '../decorators/typed';
import { BaseComponent } from './BaseComponent';
import { BlendMethod } from '../enums';

@ComponentEnum property - type-safe
  blendMethod: BlendMethod = BlendMethod.Overwrite;

  // Regular properties
  opacity: number = 1.0;
}
```

### Example: Editor Detection

```typescript
// In spark-engine-web-editor
import { BaseEnum } from 'sparkengineweb';

const valueToFormInput = (propertyName: string, value: any, component: any) => {
  // Check if value is an enum
  if (value instanceof BaseEnum) {
    const enumClass = Object.getPrototypeOf(value).constructor;
    const options = enumClass.getValues?.() || [];
    
    return (
      <select 
        value={value.value} 
        onChange={(e) => {
          const selected = options.find(opt => opt.value === e.target.value);
          onChange?.(propertyName, selected);
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  }
  
  // ... other type handling
};
```

## Consequences

**Positive:**
- Self-describing values (`value instanceof BaseEnum` is unambiguous)
- Type-safe: TypeScript enforces enum values at compile time
- No external registries needed (value carries all metadata)
- Editor can detect and render enum properties automatically
- One-time creation, then consistent pattern for all enums
- Scales well (same pattern for all future enums)
- ESLint rule is simple (`instanceof BaseEnum` checks)
- Looks and feels like real enums (similar to Java)
- Backward compatible (no changes to serialization format)

**Tradeoffs:**

- All enums will have to be refactored to the new class based approach
- To avoid issues with using plain enums, we will have to enforce usage of class based enums in the codebase