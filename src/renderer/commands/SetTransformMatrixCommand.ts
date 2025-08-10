import { CanvasDevice } from "../../platform";
import { RenderCommand, RenderCommandID } from "./RenderCommand";

export class SetTransformMatrixCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_SetTransformMatrix;

    public constructor(
        public readonly position: [number, number]
    ) { }

    public execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void {
        // Apply resolution scaling to the transformation matrix where the 1s are
        gfx.setTransform(ctx, [1, 0, 0, 1, this.position[0], this.position[1]]);
    }
}