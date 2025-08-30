/**
 * @category Platform
 * @internal
 */
export enum BlendMethod {
    BM_Overwrite = 'source-over',
    BM_Add = 'lighter'
}

export type Matrix2D = [number, number, number, number, number, number]

/**
 * @category Platform
 * @internal
 */
export class CanvasDevice {
    private wRatio = 1;
    private hRatio = 1;

    public defaultStrokeThickness = 1;

    public enableImageSmoothing(ctx: CanvasRenderingContext2D): void {
        ctx.imageSmoothingEnabled = true;
    }

    public disableImageSmoothing(ctx: CanvasRenderingContext2D): void {
        ctx.imageSmoothingEnabled = false;
    }

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
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas?.width || 0, ctx.canvas?.height || 0);
    }

    public drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, scale: number): void {
        ctx.save();
        console.log('DRAW RECT');
        // Translate to position, then scale from center
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.rect(-width / 2, -height / 2, width, height);
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
        const hRatio = this.hRatio;
        const wRatio = this.wRatio;

        const canvasWidth = ctx.canvas?.width || 0;
        const canvasHeight = ctx.canvas?.height || 0;

        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        const scaleX = matrix[0] * wRatio;
        const scaleY = matrix[3] * hRatio;
        const translateX = matrix[4] * wRatio;
        const translateY = matrix[5] * hRatio;

        ctx.setTransform(
            scaleX,
            0,
            0,
            scaleY,
            centerX + translateX * scaleX,
            centerY + translateY * scaleY
        );
    }
}