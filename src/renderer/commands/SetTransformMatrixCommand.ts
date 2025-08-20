import { CanvasDevice } from "../../platform";
import { RenderCommand, RenderCommandID } from "./RenderCommand";

/** @internal */
export class SetTransformMatrixCommand implements RenderCommand {
    public readonly renderCommandID: RenderCommandID = RenderCommandID.RC_SetTransformMatrix;

    public constructor(
        public readonly translate: [number, number],
        public readonly scale: [number, number] = [1, 1],
    ) { }

    public execute(ctx: CanvasRenderingContext2D, gfx: CanvasDevice): void {
        // Apply resolution scaling to the transformation matrix where the 1s are
        gfx.setTransform(ctx, [this.scale[0], 0, 0, this.scale[1], this.translate[0], this.translate[1]]);
    }
}