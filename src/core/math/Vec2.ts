export class Vec2 {
    public constructor(
        public x: number = 0,
        public y: number = 0
    ) {
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

    public negate(): void {
        this.x = -this.x;
        this.y = -this.y;
    }

    public getNegated(): Vec2 {
        // avoid reusing negate for better performance
        return new Vec2(-this.x, -this.y);
    }

    public getNormalized(): Vec2 {
        const length = this.length;

        return new Vec2(this.x / length, this.y / length);
    }
    
    public dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    public multiply(scalar: number): void { 
        this.x *= scalar;
        this.y *= scalar;
    }
}