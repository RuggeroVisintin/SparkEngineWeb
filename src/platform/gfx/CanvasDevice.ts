/**
 * @category Platform
 */
export enum BlendMethod {
    BM_Overwrite = 'source-over',
    BM_Add = 'lighter'
}

export type Matrix2D = [number, number, number, number, number, number]

/**
 * @category Platform
 */
export class CanvasDevice {
    public defaultStrokeThickness = 1;

    // this is the number of pixels per single unit in the game world
    // TODO: this should be moved in the game engine config and set through the setTransform method
    private PixelsPerUnit = 1;

    public setResolution(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        const canvas = ctx.canvas;

        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;
    }

    public begin(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
    }

    public end(ctx: CanvasRenderingContext2D): void {
        ctx.closePath();
    }

    public clear(ctx: CanvasRenderingContext2D, color?: string): void {
        // This is needed to reset the transform matrix
        // and clear the canvas before drawing anything
        // otherwise when downscaling, the canvas will not be cleared properly
        ctx.resetTransform();
        ctx.clearRect(0, 0, ctx.canvas?.width || 0, ctx.canvas?.height || 0);
    }

    public drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        ctx.save();
        ctx.translate(x - width / 2, y - height / 2);
        ctx.rect(0, 0, width, height);
        ctx.restore();
    }

    public drawImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, x: number, y: number, width: number, height: number, opacity = 100): void {
        ctx.save();
        ctx.globalAlpha = opacity / 100;
        ctx.translate(x - width / 2, y - height / 2);
        ctx.drawImage(image, 0, 0, width, height);
        ctx.restore();
    }

    public fill(ctx: CanvasRenderingContext2D, color?: string): void {
        color && (ctx.fillStyle = color);
        ctx.fill();
    }

    public stroke(ctx: CanvasRenderingContext2D, color?: string, thickness?: number): void {
        ctx.save();
        color && (ctx.strokeStyle = color);
        ctx.lineWidth = thickness ?? this.defaultStrokeThickness;
        ctx.stroke();
        ctx.restore();
    }

    public setBlendMethod(ctx: CanvasRenderingContext2D, method: BlendMethod): void {
        ctx.globalCompositeOperation = method;
    }

    public setTransform(ctx: CanvasRenderingContext2D, matrix: Matrix2D): void {
        // Get canvas dimensions for center-origin calculation
        const canvasWidth = ctx.canvas?.width || 0;
        const canvasHeight = ctx.canvas?.height || 0;

        // Apply center-origin offset to translation components
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        ctx.setTransform(
            matrix[0] * this.PixelsPerUnit,
            matrix[1],
            matrix[2],
            matrix[3] * this.PixelsPerUnit,
            matrix[4] * this.PixelsPerUnit + centerX,
            matrix[5] * this.PixelsPerUnit + centerY
        );
    }
}