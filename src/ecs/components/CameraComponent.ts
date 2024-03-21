import { Type } from "../../core";
import { Renderer, SetTransformMatrixCommand } from "../../renderer";
import { BaseDrawableComponent } from "./ BaseDrawableComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

/**
 * @category Components
 * 
 * Handles rendering the camera's transform matrix. 
 */
@Type('CameraComponent')
export class CameraComponent extends BaseDrawableComponent implements IDrawableComponent {

    public draw(renderer: Renderer): void {
        renderer.pushRenderCommand(new SetTransformMatrixCommand([-this.transform.position.x, -this.transform.position.y]));
    }
}