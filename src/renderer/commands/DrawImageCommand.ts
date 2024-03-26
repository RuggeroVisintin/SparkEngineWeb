import { CanvasDevice } from "../../platform";
import { RenderCommand, RenderCommandID } from "./RenderCommand";

export class DrawImageCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_DrawImage;

    constructor(
        public readonly image: ImageBitmap,
        public readonly position: [number, number],
        public readonly size: [number, number]
    ) { }
    
    public execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void {
        // gfx.begin(ctx);
        gfx.drawImage(ctx, this.image, this.position[0], this.position[1], this.size[0], this.size[1]);
        // gfx.end(ctx);
    }
}