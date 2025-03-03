import { DOMImageLoader } from "../../../platform";
import { Renderer } from "../../../renderer";
import { TransformComponent } from "../TransformComponent";
import { IComponent } from "./IComponent";

export interface IDrawableComponent extends IComponent {
    transform: TransformComponent;

    draw(renderer: Renderer, imageLoader: DOMImageLoader): void;
}