import { toRounded } from "./numbers";

type This = Vec2;

interface Resolution {
    width: number;
    height: number;
}

/**
 * Bidimentional Vector
 * 
 * @category Core
 */
export class Vec2 {
    public constructor(
        public x: number = 0,
        public y: number = 0
    ) {
    }

    /**
     * Constructs a new vec2 from another one.
     * 
     * @param other - the other vec2 to construct a new one from
     * @returns a new vec2
     */
    public static from(other: Vec2): Vec2 {
        return new Vec2(other.x, other.y);
    }

    /**
     * A default vec2 facing up
     */
    public static get UP(): Vec2 {
        return new Vec2(0, 1);
    }

    /**
     * A default vec2 facing down
     */
    public static get DOWN(): Vec2 {
        return new Vec2(0, -1);
    }

    /**
     * A default vec2 facing left
     */
    public static get LEFT(): Vec2 {
        return new Vec2(-1, 0);
    }

    /**
     * A default vec2 facing right
     */
    public static get RIGHT(): Vec2 {
        return new Vec2(1, 0);
    }

    /**
     * Computes the lenght of the vector
     */
    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Negates the current vector in place
     * 
     * @returns Chainable this
     */
    public negate(): This {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    /**
     * Computes the dot product between this vector and another one
     * @param other - the other vector to use for the computation
     * @returns the dot product between the vectors
     */
    public dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Multiplies this vector in place by a scalar value.
     * @returns Chainable this
     */
    public multiply(scalar: number): This {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /**
     * Reflects this vector in place with respect to a given normal.
     * @returns Chainable this
     */
    public reflect(normal: Vec2): This {
        const dot = this.dot(normal);

        this.x -= 2 * dot * normal.x;
        this.y -= 2 * dot * normal.y;

        // is it really needed
        // this.multiply(1); // avoid floating point errors

        return this;
    }

    /**
     * Returns a new vec2 negated from this one.
     */
    public getNegated(): Vec2 {
        // avoid reusing negate for better performance
        return new Vec2(-this.x, -this.y);
    }

    /**
     * Returns a new vec2 from this one normalized
     */
    public getNormalized(): Vec2 {
        const length = this.length;

        return new Vec2(this.x / length, this.y / length);
    }

    /**
     * Converts this vector to screen space coordinates.
     * 
     * @returns a new vec2 in screen space coordinates
     */
    public toScreenSpace(resolution: Resolution): Vec2 {
        return new Vec2(
            toRounded(this.x - resolution.width / 2, 2),
            toRounded(this.y - resolution.height / 2, 2)
        );
    }

    /**
     * Converts this vector to world space coordinates.
     * 
     * @returns a new vec2 in world space coordinates
     */
    public toWorldSpace(resolution: Resolution): Vec2 {
        return new Vec2(
            toRounded(this.x + resolution.width / 2, 2),
            toRounded(this.y + resolution.height / 2, 2)
        );
    }
}