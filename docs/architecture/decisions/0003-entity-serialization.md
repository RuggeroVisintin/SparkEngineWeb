# 3. entity-serialization

Date: 2025-06-28

## Status

Draft

## Context

When serializing entities through the `IEntity.toJson()` method, each entity is serializing their components through the inheritance system like so

```json
{
    __type: "MyEntityType",
    transform: {},
    material: {}
}
```

While this makes sense from a readability perspective, it needs an entity specific logic to be able to serialize/desarialize the entity, which results in the following issues:

- Parsing code is much more complicated, as it needs to instantiate the specific class based on the type 

## Decision

While we still want to retain utilitye properties like `transform` and `material` in specific entity classes --Like `GameObject`-- we want to store them like so

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
