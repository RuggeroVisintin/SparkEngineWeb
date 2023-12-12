export class Vec2 {
    public constructor(
        public x: number = 0,
        public y: number = 0
    ) {
    }

    public negate(): void {
        this.x = -this.x;
        this.y = -this.y;
    }

    public getNegated(): Vec2 {
        // avoid reusing negate for better performance
        return new Vec2(-this.x, -this.y);
    }
}