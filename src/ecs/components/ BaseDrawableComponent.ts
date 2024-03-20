import { Renderer } from "../../renderer";
import { BaseComponent } from "./BaseComponent";
import { TransformComponent } from "./TransformComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

export abstract class BaseDrawableComponent extends BaseComponent implements IDrawableComponent {
    private defaultTransform = new TransformComponent();

    /**
     * When attached to a parent Entity container, it returns its Tranform Component if present.
     * Otherwise it returns the default transform of the Shape
     */
    public get transform(): TransformComponent {
        return this.getContainer()?.getComponent('TransformComponent') ?? this.defaultTransform;
    }

    abstract draw(rendere: Renderer): void;
}