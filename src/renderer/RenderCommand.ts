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

export class DrawPrimitiveCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_DrawPrimitive;
 
    constructor(
        public readonly primitiveType: PrimitiveType,
        public readonly position: [number, number],
        public readonly size: [number, number],
        public readonly fill: boolean = true,
        public readonly color: string = '#d16cd8'
    ) { }
    
    public execute(ctx: CanvasRenderingContext2D, device: CanvasDevice): void {
        device.drawRect(ctx, this.position[0], this.position[1], this.size[0], this.size[1]);

        if (this.fill) {
            device.fill(ctx, this.color);
        } else {
            device.stroke(ctx, this.color);
        }
    }
}