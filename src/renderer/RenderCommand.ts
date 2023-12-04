import { CanvasDevice } from "../platform";

export enum RenderCommandID {
    RC_DrawPrimitive = 0
}

export enum PrimitiveType {
    Rectangle = 0
}

export interface RenderCommand {
    renderCommandID: RenderCommandID;
    execute(ctx: CanvasRenderingContext2D, device: CanvasDevice): void;
}

/**
 * Draws a primitive (Rectangle)
 */
export class DrawPrimitiveCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_DrawPrimitive;
 
    /** 
     * @param primitiveType - the type of the Primitive
     * @param position - the position of the Primitive (x, y)
     * @param size - the size of the Primitive (width, height)
     * @param fill - if the Primitive should be filled. Default is true
     * @param color - the color of the primitive. Default is #d16cd8 
     */ 
    constructor(
        public readonly primitiveType: PrimitiveType,
        public readonly position: [number, number],
        public readonly size: [number, number],
        public readonly fill: boolean = true,
        public readonly color: string = '#d16cd8'
    ) { }
    
    public execute(ctx: CanvasRenderingContext2D, device: CanvasDevice): void {
        this.primitiveType === PrimitiveType.Rectangle
            && device.drawRect(ctx, this.position[0], this.position[1], this.size[0], this.size[1]);

        if (this.fill) {
            device.fill(ctx, this.color);
        } else {
            device.stroke(ctx, this.color);
        }
    }
}