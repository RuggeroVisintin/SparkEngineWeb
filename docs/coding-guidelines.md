# SparkEngineWeb Coding Guidelines

## Performance
- Minimize unnecessary computations in hot paths (e.g., rendering, physics).
- Achieve this by:
	- Using arithmetic operations, vectorized instructions, or lookup tables instead of conditional logic.
	- Precomputing values outside of hot loops.
	- Leveraging data-oriented design (e.g., processing arrays in bulk).
	- Avoiding repeated calculations by caching results.
	- Using mathematical tricks (e.g., bitwise operations) for simple cases.
- Avoid using if conditions for single arithmetic operations, as branching is often more CPU demanding than direct arithmetic. When possible, group multiple operations under the same condition to minimize branching.

## Testing
- Write unit tests for all core logic and components.
- Use visual/behavioral tests for rendering and UI features.
- Keep tests fast and deterministic.

## Documentation
- Update documentation for any public API changes.
- Use the `docs/` folder for architecture, decisions, and guidelines.
