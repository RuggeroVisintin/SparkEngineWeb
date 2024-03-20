import { Renderer } from "../../../renderer";
import { TransformComponent } from "../TransformComponent";

export interface IDrawableComponent {
    transform: TransformComponent;

    draw(renderer: Renderer): void;
}