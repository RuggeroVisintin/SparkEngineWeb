# 2. Use Unique Names to Identify Entities

Date: 2024-08-14

## Status

Accepted

## Context

To create rich game logic, we need a way for Game Developers to create entities' relationships through unique identifiers. Each component is already provided with a uuid identifier, which is used internally by the engine but is not designed to be serialized.

The `name` field was introduced at the entity level to allow easy identification/linkage to an existing entity in the same scope (a scene).

## Decision

1) We will validate an entity's name is unique within a scene scope to allow rich game logic with links between different entities

2) We will assign globally unique names to each constructed entity by default to facilitate naming entities

3) We will use an incremental logic to define unique names to avoid unnecessary implementation complexity and keep names relatable

## Consequences

**Benefits**

- Unique names are human-readable and easier to grasp than UUIDs
- Making names unique ensures precision when retrieving an entity from a scene
- Naming entities by default removes cognitive load from the game developer to choose names if they don't want to

**Risks**

- Correctly keeping track of names has proven challenging. See  [#376](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/376)
