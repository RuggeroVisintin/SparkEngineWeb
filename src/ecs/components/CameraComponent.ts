import { Type } from "../../core";
import { Renderer } from "../../renderer";
import { BaseDrawableComponent } from "./ BaseDrawableComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

@Type('CameraComponent')
export class CameraComponent extends BaseDrawableComponent implements IDrawableComponent {

    public draw(renderer: Renderer): void {
        // TODO: implement
    }
}