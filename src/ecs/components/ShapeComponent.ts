import { Type } from "../../core";
import { Renderer, DrawPrimitiveCommand, PrimitiveType} from "../../renderer";
import { BaseComponent } from "./BaseComponent";
import { MaterialComponent } from "./MaterialComponent";
import { TransformComponent } from "./TransformComponent";

/**
 * Represents a primitive Shape like rectangle, circle, etc
 * 
 * @category Components
 */
@Type('ShapeComponent')
export class ShapeComponent extends BaseComponent {
    /**
     * The primitive type of the shape
     */
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;

    private defaultTransform = new TransformComponent();
    private defaultMaterial = new MaterialComponent();

    /**
     * When attached to a parent Entity container, it returns its Tranform Component if present.
     * Otherwise it returns the default transform of the Shape
     */
    public get transform(): TransformComponent {
        return this.getContainer()?.getComponent('TransformComponent') ?? this.defaultTransform;
    }

    public get material(): MaterialComponent {
        return this.getContainer()?.getComponent('MaterialComponent') ?? this.defaultMaterial;
    }

    /**
     * Put a draw call in the renderer taking into account the component data
     * @param renderer 
     */
    public draw(renderer: Renderer): void {
        const { position, size } = this.transform;
        const { opacity } = this.material;

        renderer.pushRenderCommand(new DrawPrimitiveCommand(
            PrimitiveType.Rectangle,
            [position.x, position.y],
            [size.width, size.height],
            true,
            this.material.diffuseColor.toRgbaString(opacity),
        ));
    }
}