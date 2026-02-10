import { Enum } from "../../core";
import { CanvasDevice } from "../../platform";

/**
 * @category Renderer
 */
export class RenderCommandID extends Enum {
    static readonly RC_DrawPrimitive = new RenderCommandID();
    static readonly RC_SetBlendingMethodCommand = new RenderCommandID();
    static readonly RC_SetTransformMatrix = new RenderCommandID();
    static readonly RC_DrawImage = new RenderCommandID();
}

/**
 * @category Renderer
 */
export class PrimitiveType extends Enum {
    static readonly Rectangle = new PrimitiveType();
}

/**
 * @category Renderer
 */
export interface RenderCommand {
    renderCommandID: RenderCommandID;
    execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void;
}