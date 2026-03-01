# SparkEngineWeb AI Coding Guidelines

## Architecture Overview

SparkEngineWeb is a lightweight browser-based 2D game engine built with TypeScript using an **Entity-Component-System (ECS)** architecture.

### Core Structure
- **`src/ecs/`** - Entity-Component-System implementation
  - **`entities/`** - Game objects (BaseEntity, GameObject, StaticObject, TriggerEntity)
  - **`components/`** - Reusable behaviors (Transform, Shape, Material, BoundingBox, Animation, etc.)
  - **`systems/`** - Processing logic (RenderSystem, PhysicsSystem, InputSystem, HierarchySystem, AnimationSystem, SoundSystem)
- **`src/engine/`** - GameEngine and Scene management
- **`src/renderer/`** - Canvas-based rendering pipeline
- **`src/physx/`** - 2D physics engine with AABB collision detection
- **`src/platform/`** - Platform abstractions (CanvasDevice, KeyboardDevice, DOMImageLoader)
- **`src/core/`** - Type system, factory, decorators, and utilities

## Test-Driven Development (TDD) - MANDATORY

**ALL code changes MUST follow strict TDD practices:**
**New behaviours MUST be covered by new failing tests FIRST.**
**You MUST stop and let human review a test once implemented or changed before implementing the code**

### The Red-Green-Refactor Cycle

1. **RED** - Write a sinle failing test FIRST
   - Write ONE test that describes the desired behavior
   - The test MUST fail initially (proving it's testing the right thing)
   - Run the test to confirm it fails: `npm test`

2. **GREEN** - Write the simplest code to make the test pass
   - Implement ONLY enough code to pass the current test
   - Avoid over-engineering or premature optimization
   - Run the test to confirm it passes

3. **REFACTOR** - Improve the code without changing behavior
   - Clean up implementation while keeping tests green
   - Apply design patterns and best practices
   - Ensure all tests still pass after refactoring
   - Don't implement new behaviours!

4. **REPEAT** - Continue one test at a time
   - Move to the next test case
   - Never write multiple tests before implementation

## Architecture Decision Records (ADRs)


**MANDATORY**: All significant architectural decisions MUST be documented using ADRs.

### When to Create an ADR

Create an ADR when making decisions about:
- Technology choices (libraries, frameworks, tools)
- Architectural patterns (state management, data flow, component structure)
- API design and interfaces
- Build and deployment strategies
- Testing approaches
- Security and performance trade-offs
- Breaking changes or major refactorings

### Creating ADRs

Use the vendored ADR tools:
```bash
npm run adr new "Title of Decision"
```

ADRs are stored in `docs/architecture/decisions/` and follow this structure:
```markdown
# N. Decision Title

Date: YYYY-MM-DD

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?
```

## Type System and Decorators

### Component Registration
Use the `@Component` decorator (NOT `@Type`) to register components:

```typescript
@Component('AnimationComponent')
export class AnimationComponent extends BaseComponent {
    // implementation
}
```

The `@Component` decorator is a wrapper around `@Type` that automatically categorizes as 'Component'. All components **must** extend `BaseComponent` and use this decorator for proper factory registration.

### Type Factory Pattern
The engine uses a runtime type factory for serialization/deserialization:
- `@Type(value, category?)` - Registers classes with the factory
- `typeOf(object)` - Returns the type string
- `create<T>(type, ...args)` - Instantiates registered types
- All entities/components implement `toJson(): WithType<Props>` for serialization

## Game Loop Architecture

The `GameEngine` runs at a configurable framerate with this update sequence:

```typescript
1. inputSystem.update()
2. animationSystem.update(elapsedTime)
3. hierarchySystem.update(elapsedTime)
4. physicsSystem.update()
5. physx.simulate(physicsCycles)  // Runs multiple physics cycles per frame
6. soundSystem.update()
7. renderSystems.forEach(system => {
     system.update()
     system.renderer.endFrame()
   })
```

### Scene Management
- Scenes register entities with the engine's systems
- `scene.draw(engine)` - Activates scene and registers components
- `scene.hide()` - Deactivates scene and unregisters components
- Components are automatically registered to appropriate systems based on type

## ECS Patterns

### Component Attachment
Entities use a type-based component registry:
```typescript
entity.addComponent(component)
entity.getComponent<T>('ComponentType')  // Returns first matching type
entity.getComponents<T>('ComponentType') // Returns all matching type
```

Components maintain a **type chain** via `typesOf(object)` allowing polymorphic queries (e.g., search for 'BaseComponent' returns all derived components).

### System Registration
Systems extend `BaseSystem<T>` and manage component lifecycles:
- `system.registerComponent(component)` - Add to processing list
- `system.unregisterComponent(uuid)` - Remove from processing
- `system.pause()` / `system.resume()` - Control execution
- Override `internalUpdate(deltaTime)` for custom logic

## Performance Conventions

From `docs/coding-guidelines.md`:

1. **Minimize branching in hot paths** (rendering, physics loops)
2. **Prefer arithmetic over conditionals** for single operations
3. **Precompute outside loops** - cache values before iteration
4. **Use data-oriented design** - process arrays in bulk when possible
5. **Group multiple operations** under the same condition to reduce branching overhead

Example: Avoid `if (x > 0) result = a * x` → use `result = a * Math.max(0, x)` in tight loops.

## Build and Test Commands

**Development:**
- `npm run build:dev` - Watch mode compilation
- `npm run serve:examples` - Serve examples with local server (solves CORS issues)

**Testing:**
- `npm test` - Unit tests in watch mode
- `npm run test:perf` - Performance benchmarks
- `npm run test:visual` - Playwright visual regression tests
- `npm run test:visual:update-baseline` - Update visual test snapshots

**Production:**
- `npm run build` - Production build to `dist/`
- `npm run build:lib` - Library build
- `npm run build:docs` - Generate TypeDoc documentation

## Project Conventions

### Physics System
- Uses **centered AABB** format internally: `[centerX, centerY, width, height]`
- Supports velocity-based collision detection
- Container objects can have child objects inside without collision
- Multiple physics cycles per frame for stability (default: 2)

### Rendering
- Components rendered by **reverse depthIndex order** (0 rendered last/on top)
- Camera always renders first
- Supports multiple simultaneous RenderSystems via `additionalRenderSystems`

### Unique Naming
- Entities use `incrementallyUnique(type)` for auto-naming
- Names must be unique within a scene
- Enforced via `@RegisterUnique` decorator

## Common Pitfalls

1. **Don't call systems directly** - Let GameEngine manage the update loop
2. **Register components to systems through Scene** - Avoid manual registration
3. **Components need containers** - Call `setContainer(entity)` when adding to entities
4. **Match transform for physics** - Set `boundingBox.matchContainerTransform = true` to sync with transform
5. **Asset loading is async** - Use ImageLoader/DOMImageLoader and handle promises

## Examples

See `examples/` for working implementations. Key examples:
- `simpleRect/` - Basic rendering setup
- `simpleCollision/` - Physics interactions
- `animations/` - AnimationComponent usage
- `simplePongGame/` - Complete game architecture
