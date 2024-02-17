import { CanvasDevice } from "../../platform";

/**
 * @category Renderer
 */
export enum RenderCommandID {
    RC_DrawPrimitive = 0,
    RC_SetBlendingMethodCommand = 1
}

/**
 * @category Renderer
 */
export enum PrimitiveType {
    Rectangle = 0
}

/**
 * @category Renderer
 */
export interface RenderCommand {
    renderCommandID: RenderCommandID;
    execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void;
}