---
name: Performant Code Writing
description: Use this skill when writing or refactoring hot-path logic (rendering, physics, animation, input loops) to reduce CPU cost while preserving behavior.
---

# Performant Code Writing

Use this skill to implement performance-conscious code in core engine paths without changing observable behavior.

## When to Use This Skill

Use it for:
- Rendering, physics, animation, and input update loops
- Code executed for many entities/components per frame
- Refactors that aim to reduce CPU work or branching

Avoid it for:
- Rarely executed setup/bootstrapping paths where readability should dominate
- Premature micro-optimizations without a clear hotspot

## Core Rules

1. Minimize unnecessary computations in hot paths
2. Prefer arithmetic or table lookup over per-item branching when equivalent
3. Precompute loop-invariant values outside loops
4. Cache repeated calculations and reuse them
5. Process data in bulk where possible (data-oriented approach)
6. Group multiple operations under one condition instead of many small branches

## Implementation Checklist

- [ ] Identify whether the code is on a hot path
- [ ] Remove repeated work from inside loops
- [ ] Replace single-operation branches with equivalent arithmetic where safe
- [ ] Cache values used more than once in the same execution path
- [ ] Keep behavior identical (same outputs and side effects)
- [ ] Add or update tests for core logic changes

## Patterns

### Prefer Loop-Invariant Precomputation

```typescript
// ❌ Recomputes per iteration
for (let index = 0; index < entities.length; index++) {
	const deltaSeconds = elapsedMs / 1000;
	entities[index].x += entities[index].vx * deltaSeconds;
}

// ✅ Compute once, reuse many times
const deltaSeconds = elapsedMs / 1000;
for (let index = 0; index < entities.length; index++) {
	entities[index].x += entities[index].vx * deltaSeconds;
}
```

### Prefer Single Branch for Related Work

```typescript
// ❌ Multiple branch checks on the same condition
if (isVisible) drawShape();
if (isVisible) drawOutline();
if (isVisible) drawLabel();

// ✅ Group related operations under one branch
if (isVisible) {
	drawShape();
	drawOutline();
	drawLabel();
}
```

### Prefer Arithmetic Selection for Simple Operations

```typescript
// ❌ Branch for a simple arithmetic clamp
if (velocity < 0) {
	velocity = 0;
}

// ✅ Equivalent arithmetic form
velocity = Math.max(0, velocity);
```

## References

- `docs/coding-guidelines.md`
