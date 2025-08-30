# 4. Improved Scaling System

Date: 2025-08-30

## Status

Accepted

## Context

Previously, object scaling was handled by maintaining a separate `scale` property alongside `size`. This introduced ambiguity and complexity, as it was unclear whether `size` reflected the scaled or unscaled value, and required all systems (e.g., physics, rendering) to compensate for scale individually. Storing scale separately also meant recomputing the final size every frame, even when scale did not change.

While this separation could potentially useful in the future (for example for animated objects changing scale very often), there is no reason at the moment to default to this approach.

### Solution - Treating `scale` as an Individual Property

This is the current solution, it basically treats scale as an individual property, without applying the scale to the size of the object.

This is not ideal because it causes the final size to be computed on each frame --Even when it has not changed-- which results in a lot of waste, especially on static objects.

On the other hand this solution offers the main benefit of allowing to move the math to the GPU, which can be very handy for animated objects, where the scale may be changed multiple times.

**Good** because it can move math to GPU, which is efficient for graphics.
**Good** because it is an explicit property, making it easy to inspect or modify.
**Good** because it allows animation flexibility, enabling smooth scaling animations.
**Good** because it separates concerns, keeping logical size and visual scale separate.

**Bad** because it requires every system to compensate for scale, increasing complexity.
**Bad** because it creates unnecessary ambiguity, making it unclear if `size` is raw or scaled.
**Bad** because it forces recomputation of final size every frame, even if scale is unchanged.
**Bad** because it requires state synchronization, as dependent systems must update if scale changes.

### Solution - Using a Scaling Method w/ backward compatibilty

In the proposed solution, changing the scale also affects the size, which results in compute omptization for objects changing scale very infrequently and does not require different systems to also handle scaling, resulting in a more straightforard logic overall

**Good** because it is simple, with only one property (`size`) to manage.
**Good** because it is consistent, as all systems use the same size value.
**Good** because it improves performance, with no need to recompute final size every frame.
**Good** because it makes intent clear, as scaling is explicit.

**Bad** because there is loss of original size unless tracked separately.
**Bad** because it is less flexible for GPU scaling.
**Bad** because it is harder to animate, as it requires recalculating and updating size.

## Decision

1) Scaling will be applied directly to the `worldSize` property via a setter to maintain backward compatibility with the existing interface

2) We will convert the `scale` property to a getter to maintain backward compatibility

3) We will keep `size` as property for the original size, to maintain backward compatibility

4) We will refactor all systems to avoid computing the worldSize themselves

## Consequences

**Benefits:**
- Reasoning about object size: all systems use the same `size` property
- Simpler implementation: scaling is explicit and centralized
- Performance: final size does not need to be recomputed every frame unless scale changes
- Allows future updates to defer calculations on the GPU based on game developer preferences
- Avoids a breaking change

**Tradeoffs:**
- Moves scaling operations back on the CPU
