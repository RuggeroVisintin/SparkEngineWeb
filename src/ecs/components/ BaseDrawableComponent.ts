import { WithType } from "../../core";
import { DOMImageLoader, ImageLoader } from "../../platform";
import { Renderer } from "../../renderer";
import { BaseComponent } from "./BaseComponent";
import { TransformComponent, TransformComponentProps } from "./TransformComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

export interface DrawableComponentProps {
    transform?: TransformComponentProps;
}

export abstract class BaseDrawableComponent extends BaseComponent implements IDrawableComponent {
    private defaultTransform = new TransformComponent();
    private _isVisible = true;


    /**
     * Whether the component is visible or not
     */
    public get isVisible(): boolean {
        return this._isVisible;
    }

    public constructor(props?: DrawableComponentProps) {
        super();

        if (props?.transform) {
            this.defaultTransform = new TransformComponent(props.transform);
        }
    }

    /**
     * When attached to a parent Entity container, it returns its Tranform Component if present.
     * Otherwise it returns the default transform of the Shape
     */
    public get transform(): TransformComponent {
        return this.getContainer()?.getComponent('TransformComponent') ?? this.defaultTransform;
    }

    public hide(): void {
        this._isVisible = false;
    }

    public show(): void {
        this._isVisible = true;
    }


    public toJson(): WithType<DrawableComponentProps> {
        return {
            ...super.toJson(),
            transform: this.transform.toJson()
        }
    }

    abstract draw(rendere: Renderer, imageLoader: ImageLoader): void;
}