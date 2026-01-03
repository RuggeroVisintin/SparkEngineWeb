/**
 * Abstract base class for strongly-typed enumerations.
 *
 * Provides a pattern for creating type-safe enums that:
 * - Are detectable at runtime via `instanceof` checks
 * - Carry their value as a property
 * - Support `getValues()` for retrieving all options
 * - Enable editor UI to render enum properties as select controls
 *
 * @example
 * ```typescript
 * export class BlendMethod extends BaseEnum<BlendMethod> {
 *   static readonly Overwrite = new BlendMethod('source-over');
 *   static readonly Add = new BlendMethod('lighter');
 *
 *   static getValues(): BlendMethod[] {
 *     return [this.Overwrite, this.Add];
 *   }
 * }
 * ```
 *
 * @template T - The type of the enum class itself (self-referential)
 * @category Core
 */
export abstract class Enum<T extends string | number = number> {
    /**
     * The primitive value of this enum member.
     */
    readonly value: T;

    /**
     * Protected constructor to prevent direct instantiation.
     * Only subclasses should instantiate enum members.
     *
     * @param value - The primitive value for this enum member
     */
    protected constructor(value: T) {
        this.value = value;
    }

    /**
     * Retrieve all available enum values.
     * Must be implemented by subclasses.
     *
     * @returns Array of all enum members
     */
    protected getValues(): [] {
        return [];
    }

    /**
     * Convert enum to its primitive value.
     */
    toString(): string {
        return String(this.value);
    }

    /**
     * Convert enum to its primitive value (JSON serialization).
     */
    toJSON(): T {
        return this.value;
    }
}
