# 3. entity-serialization

Date: 2025-06-28

## Status

Accepted

## Context

When serializing entities through the `IEntity.toJson()` method, each entity is serializing their components through the inheritance system like so

```json
{
    "__type": "MyEntityType",
    "transform": {},
    "material": {}
}
```

While this makes sense from a readability perspective, it needs an entity specific logic to be able to serialize/desarialize the entity, which results in the following issues:

- Desiarilazion code is much more complicated, as it is based on specific Entity class
- Components added dynamically through `addComponent` are not serialized in the structure

### Solution - Flat Component List


## Decision

While we still want to retain link properties like `transform` and `material` in specific entity classes --Like `GameObject`-- for easier access we want to store them like so

```json
{
    "__type": "MyEntityType",
    "components": [{
        "__type": "TransformComponent",
        "position": {},
        "size": {}
    }]
}
```

1) We will serialize flat components to:
    - avoid needing a specific Entity instance to deserialize it
    - avoid each entity having to define how it needs to be serialized
    - include dynamically added entities to the serialization output
2) We will concentrate deserialization concerns in the `BaseEntity` constructor to simplify how entities are constructed

## Consequences

**Good** - Serialization and deserialization code is greatly reduced and concentrated in a single abstract class, reducing the overall complexity and cost of maintenance

**Good** - Components added dynamically are also serialized/deserialized

**Bad** - This change will result in a breaking change and a major refactoring of the engine

**Bad** - This change will also result in a breaking change of the serialization format
