import { Enum } from "../../core";
import { CanvasDevice } from "../../platform";

/**
 * @category Renderer
 */
export class RenderCommandID extends Enum {
    static readonly RC_DrawPrimitive = new RenderCommandID(0);
    static readonly RC_SetBlendingMethodCommand = new RenderCommandID(1);
    static readonly RC_SetTransformMatrix = new RenderCommandID(2);
    static readonly RC_DrawImage = new RenderCommandID(3);
}

/**
 * @category Renderer
 */
export class PrimitiveType extends Enum {
    static readonly Rectangle = new PrimitiveType(0);
}

/**
 * @category Renderer
 */
export interface RenderCommand {
    renderCommandID: RenderCommandID;
    execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void;
}