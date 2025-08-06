import { ImageLoader } from "../../../platform";
import { Renderer } from "../../../renderer";
import { TransformComponent } from "../TransformComponent";
import { IComponent } from "./IComponent";

export interface IDrawableComponent extends IComponent {
    transform: TransformComponent;
    isVisible: boolean;

    /**
     * Hides the component from rendering.
     */
    hide(): void;

    /**
     * Shows the component for rendering.
     */
    show(): void;

    /**
     * Draws the component using the provided renderer and image loader.
     * @param renderer The renderer to use for drawing.
     * @param imageLoader The image loader to use for loading images.
     */
    draw(renderer: Renderer, imageLoader: ImageLoader): void;
}