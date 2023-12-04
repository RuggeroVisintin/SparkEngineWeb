export class CanvasDevice {
    public begin(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
    }

    public end(ctx: CanvasRenderingContext2D): void {
        ctx.closePath();
    }

    public clear(ctx: CanvasRenderingContext2D, color?: string): void {
        ctx.clearRect(0, 0, ctx.canvas?.width || 0, ctx.canvas?.height || 0);
    }

    public drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        ctx.rect(x, y, width, height);
    }

    public fill(ctx: CanvasRenderingContext2D, color?: string): void {
        const oldStyle = ctx.fillStyle;

        color && (ctx.fillStyle = color);
        ctx.fill();

        ctx.fillStyle = oldStyle;
    }

    public stroke(ctx: CanvasRenderingContext2D, color?: string): void {
        const oldStyle = ctx.strokeStyle;

        color && (ctx.strokeStyle = color);
        ctx.stroke();

        ctx.strokeStyle = oldStyle;
    }
}