type This = Vec2;

export class Vec2 {
    public constructor(
        public x: number = 0,
        public y: number = 0
    ) {
    }

    public static from(other: Vec2): Vec2 {
        return new Vec2(other.x, other.y);
    }

    public static get UP(): Vec2 { 
        return new Vec2(0, 1);
    }

    public static get DOWN(): Vec2 {
        return new Vec2(0, -1);
    }

    public static get LEFT(): Vec2 {
        return new Vec2(-1, 0);
    }

    public static get RIGHT(): Vec2 {
        return new Vec2(1, 0);
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public negate(): This {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    public dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    public multiply(scalar: number): This { 
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    public reflect(normal: Vec2): This {
        const dot = this.dot(normal);

        this.x -= 2 * dot * normal.x;
        this.y -= 2 * dot * normal.y; 

        // is it really needed
        // this.multiply(1); // avoid floating point errors
        
        return this;
    }

    public getNegated(): Vec2 {
        // avoid reusing negate for better performance
        return new Vec2(-this.x, -this.y);
    }

    public getNormalized(): Vec2 {
        const length = this.length;

        return new Vec2(this.x / length, this.y / length);
    }
}