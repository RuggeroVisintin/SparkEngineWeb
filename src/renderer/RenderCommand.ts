export enum RenderCommandID {
    RC_DrawPrimitive = 0
}

export enum PrimitiveType {
    Rectangle = 0
}

export interface RenderCommand {
    renderCommandID: RenderCommandID;
}

export interface DrawPrimitiveCommand extends RenderCommand {
    primitiveType: PrimitiveType;
    position: [number, number];
    size: [number, number];
}