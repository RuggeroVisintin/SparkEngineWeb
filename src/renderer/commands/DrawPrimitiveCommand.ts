import { Rgb } from "../../core";
import { CanvasDevice } from "../../platform";
import { PrimitiveType, RenderCommand, RenderCommandID } from "./RenderCommand";

/**
 * Draws a primitive (Rectangle)
 * 
 * @category Renderer
 */
export class DrawPrimitiveCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_DrawPrimitive;
 
    /** 
     * @param primitiveType - the type of the Primitive
     * @param position - the position of the Primitive (x, y)
     * @param size - the size of the Primitive (width, height)
     * @param fill - if the Primitive should be filled. Default is true
     * @param color - the color of the primitive. Default is #d16cd8 
     * @param thickness - the thickness of the stroke when used when fill is set to false
     */ 
    constructor(
        public readonly primitiveType: PrimitiveType,
        public readonly position: [number, number],
        public readonly size: [number, number],
        public readonly fill: boolean = true,
        public readonly color: string = Rgb.fromHex('#d16cd8').toRgbaString(),
        public readonly thickness?: number
    ) { }
    
    public execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void {
        gfx.begin(ctx);

        this.primitiveType === PrimitiveType.Rectangle
            && gfx.drawRect(ctx, this.position[0], this.position[1], this.size[0], this.size[1]);

        if (this.fill) {
            gfx.fill(ctx, this.color);
        } else {
            gfx.stroke(ctx, this.color, this.thickness);
        }

        gfx.end(ctx);
    }
}