export enum BlendMethod {
    BM_Overwrite = 'source-over',
    BM_Add = 'lighter'
}

export class CanvasDevice {
    private wRatio = 1;
    private hRatio = 1;

    public setResolution(ctx: CanvasRenderingContext2D, width: number, height: number): void { 
        const canvas = ctx.canvas;

        if(!canvas) return;

        this.wRatio = width / canvas.width;
        this.hRatio = height / canvas.height;

        canvas.width = width;
        canvas.height = height;

        ctx.scale(this.wRatio, this.hRatio);
    }

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
        color && (ctx.fillStyle = color);
        ctx.fill();
    }

    public stroke(ctx: CanvasRenderingContext2D, color?: string): void {
        color && (ctx.strokeStyle = color);
        ctx.stroke();
    }

    public setBlendMethod(ctx: CanvasRenderingContext2D, method: BlendMethod): void {
        ctx.globalCompositeOperation = method;
    }
}