import { BlendMethod, CanvasDevice } from "../../platform";
import { RenderCommand, RenderCommandID } from "./RenderCommand";

/**
 * @category Renderer
 */
export class SetBlendingMethodCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_SetBlendingMethodCommand;
    
    public constructor(
        public readonly blendMethod: BlendMethod,
    ) {}
    
    public execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void {
        gfx.setBlendMethod(ctx, this.blendMethod);
    }
}