import { Renderer, SetTransformMatrixCommand } from "../../renderer";
import { BaseDrawableComponent } from "./ BaseDrawableComponent";
import { Component } from "./interfaces";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

/**
 * Handles rendering the camera's transform matrix.
 *  
 * @category Components
 */
@Component('CameraComponent')
export class CameraComponent extends BaseDrawableComponent implements IDrawableComponent {
    public draw(renderer: Renderer): void {
        renderer.pushRenderCommand(new SetTransformMatrixCommand([-this.transform.position.x, -this.transform.position.y], [1 / this.transform.scale, 1 / this.transform.scale]));
    }
} 