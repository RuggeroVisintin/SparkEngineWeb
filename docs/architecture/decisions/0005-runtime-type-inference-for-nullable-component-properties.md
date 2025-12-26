# 5. Runtime Type Inference for Nullable Component Properties

Date: 2025-12-26

## Status

Accepted

## Context

Component properties may be optional/nullable (e.g., `diffuseColor` in `MaterialComponent` can be `null` or undefined). When building dynamic UI panels that reflect component properties, the editor needs to determine what type of input widget to render for each property—a color picker for `Rgb`, an image input for `ImageAsset`, etc.

The challenge is that TypeScript generics like `Nullable<Rgb>` are erased at runtime. We cannot distinguish between a nullable `Rgb` property and a nullable `ImageAsset` property when the value is null. The dynamic UI needs this information to render appropriate controls.

## Alternatives Considered

### Solution 1: Schema/Reflection in Engine

Store type information directly in the engine via `reflect-metadata`.

```typescript
// In the engine
@Component('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    @Reflect.metadata('design:type', Rgb)
    diffuseColor?: Rgb;
}

// Metadata available throughout the engine
const type = Reflect.getMetadata('design:type', MaterialComponent.prototype, 'diffuseColor');
```

**Good** because metadata is centralized and available throughout the codebase

**Good** because it could be used for validation, serialization, and other engine features

**Bad** because it adds runtime reflection overhead to the engine

**Bad** because it bloats the engine bundle size

**Bad** because it requires ecosystem-wide adoption and buy-in

### Solution 2: Empty Instances

Always initialize nullable properties with empty instances (e.g., `Rgb.Empty`).

```typescript
@Component('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    diffuseColor: Rgb = Rgb.Empty;  // Never null
    diffuseTexture: ImageAsset = ImageAsset.Empty;  // Never null
}

// In UI, we can always check instanceof
if (value instanceof Rgb) {
    // render color picker
}
```

**Good** because no special type inference is needed

**Good** because `instanceof` checks work naturally without decorators

**Bad** because it's memory inefficient, every component carries unused instances

**Bad** because it contradicts the design goal of truly optional properties

**Bad** because it scales poorly with multiple nullable properties

### Solution 3: Hardcoded UI Mappings

Maintain a registry in the editor mapping component/property names to types.

```typescript
// In the editor UI
const propertyTypeRegistry = {
    'MaterialComponent': {
        'diffuseColor': Rgb,
        'diffuseTexture': ImageAsset,
        'opacity': 'number',
    },
    'SpriteComponent': {
        'tint': Rgb,
        'texture': ImageAsset,
    }
};

const propType = propertyTypeRegistry[componentType]?.[propertyName];
```

**Good** because it has zero engine impact

**Good** because it is simple to understand and implement

**Bad** because it doesn't scale to user-defined components

**Bad** because it requires manual maintenance whenever components change

**Bad** because it duplicates type information, violating DRY principle

### Solution 4: Numeric Type Discriminators

Wrap nullable properties in a class with numeric discriminators.

```typescript
enum PropertyType {
    Rgb = 1,
    ImageAsset = 2,
}

class Nullable<T> {
    constructor(public readonly typeId: PropertyType, public value: T | null = null) {}
}

@Component('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    diffuseColor = new Nullable<Rgb>(PropertyType.Rgb);
    diffuseTexture = new Nullable<ImageAsset>(PropertyType.ImageAsset);
}

// In UI
if (nullableProp.typeId === PropertyType.Rgb) {
    // render color picker
}
```

**Good** because no reflection is needed at runtime

**Good** because numeric discriminators are fast for type checking

**Bad** because it adds wrapper overhead for every property

**Bad** because it complicates property access patterns

**Bad** because it loses TypeScript type safety during runtime comparisons

### Solution 5: Decorator with Global Registry (Selected)

Use decorators to register nullable property metadata in a global registry, similar to the type factory.

```typescript
@Component('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    @NullableProperty(Rgb)
    diffuseColor?: Rgb;
    
    @NullableProperty(ImageAsset)
    diffuseTexture?: ImageAsset;
}

// In UI
const propertyType = nullablePropertiesRegistry.get(componentType)?.get(propertyName);
if (propertyType === Rgb) {
    // render color picker
}
```

**Good** because it has minimal overhead (direct Map lookups, no function calls)
**Good** because it requires no external dependencies

**Good** because it is consistent with the existing type factory pattern

**Good** because it scales automatically to user-defined components

**Good** because type information stays in code, not serialized to JSON

**Good** because it is transparent and easy to debug

**Bad** because it requires decorators to be applied to nullable properties

**Bad** because it introduces a new global registry which comes with minimal runtime footprint

## Decision

1) We will use a decoratero-based approach due to its ability to scale well with new properties / components without requiring mapping from outside the engine core

2) We will avoid using external libraries to avoid bloating up the source size

3) We will provide utilities to check if a null property is of a given type at runtime

4) We will enforce each nullable properties to have its own decorator through static analysis

## Consequences

**Benefits:**
- Type-safe dynamic property editors render appropriate controls
- Minimal performance overhead (direct Map lookups)
- Scalable: new nullable types require no UI changes
- Maintainable: type information alongside property definitions, consistent with type factory
- Non-breaking: can be adopted incrementally
- No external dependencies required

**Tradeoffs:**
- Developers must apply decorators to new nullable properties
- Adds a new global registry alongside the type factory
