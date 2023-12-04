import { CanvasDevice } from "../platform";
import { CanvasContext2D } from "../platform/gfx/CanvasContext2D";

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

export class DrawPrimitiveCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_DrawPrimitive;
 
    constructor(
        public primitiveType: PrimitiveType,
        public position: [number, number],
        public size: [number, number]
    ) { }
    
    public execute(ctx: CanvasRenderingContext2D, device: CanvasDevice): void {
        device.drawRect(ctx, this.position[0], this.position[1], this.size[0], this.size[1]);
        device.fill(ctx);
    }
}