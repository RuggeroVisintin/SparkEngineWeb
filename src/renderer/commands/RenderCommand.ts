import { CanvasDevice } from "../../platform";

/**
 * @category Renderer
 */
export enum RenderCommandID {
    RC_DrawPrimitive,
    RC_SetBlendingMethodCommand,
    RC_SetTransformMatrix,
    RC_DrawImage,
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