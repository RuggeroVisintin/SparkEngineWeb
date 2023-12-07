import { CanvasDevice } from "../../platform";

export enum RenderCommandID {
    RC_DrawPrimitive = 0,
    RC_SetBlendingMethodCommand = 1
}

export enum PrimitiveType {
    Rectangle = 0
}

export interface RenderCommand {
    renderCommandID: RenderCommandID;
    execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void;
}