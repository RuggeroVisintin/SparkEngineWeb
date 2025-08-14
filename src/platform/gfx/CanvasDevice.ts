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
    private wRatio = 1;
    private hRatio = 1;

    public defaultStrokeThickness = 1;

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
        // TODO: matrix[0] / canvas.width,
        const hRatio = this.hRatio;
        const wRatio = this.wRatio;

        ctx.setTransform(
            // TODO: matrix[0] / canvas.width,
            matrix[0] * wRatio,
            matrix[1],
            matrix[2],
            // TODO: matrix[3] / canvas.height,
            matrix[3] * hRatio,
            matrix[4] * wRatio,
            matrix[5] * hRatio
        );
    }
}