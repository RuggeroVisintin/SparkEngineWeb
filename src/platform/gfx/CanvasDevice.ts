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

        if(!canvas) return;

        this.wRatio = width / canvas.width;
        this.hRatio = height / canvas.height;

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
        ctx.scale(this.wRatio, this.hRatio);
    }

    public drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        ctx.rect(x, y, width, height);
    }

    public drawImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, x: number, y: number, width: number, height: number, opacity = 100): void {
        ctx.save();
        ctx.globalAlpha = opacity / 100;
        ctx.drawImage(image, x, y, width, height);
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
        ctx.setTransform(
            matrix[0] * this.wRatio,
            matrix[1],
            matrix[2],
            matrix[3] * this.hRatio,
            matrix[4] * this.wRatio,
            matrix[5] * this.hRatio
        );
    }
}