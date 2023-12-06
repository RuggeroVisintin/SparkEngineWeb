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