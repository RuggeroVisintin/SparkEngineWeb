export class CanvasDevice {
    public drawRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        context.rect(x, y, width, height);
    }

    public fill(context: CanvasRenderingContext2D): void {
        context.fill();
    }
}