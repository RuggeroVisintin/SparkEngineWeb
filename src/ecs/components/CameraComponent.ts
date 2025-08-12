import { Resolution, Type } from "../../core";
import { Renderer, SetTransformMatrixCommand } from "../../renderer";
import { BaseDrawableComponent } from "./ BaseDrawableComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

/**
 * Handles rendering the camera's transform matrix.
 *  
 * @category Components
 */
@Type('CameraComponent')
export class CameraComponent extends BaseDrawableComponent implements IDrawableComponent {
    /**
     * The rendering resolution of the camera.
     * If not set, the internal resolution of the renderer will be used.
     */
    public resolution?: Resolution;

    public draw(renderer: Renderer): void {
        // TODO: push set resolution command if resolution is set

        renderer.pushRenderCommand(new SetTransformMatrixCommand([-this.transform.position.x, -this.transform.position.y]));
    }
}