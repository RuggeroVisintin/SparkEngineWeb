import { Type } from "../../core";
import { Renderer, DrawPrimitiveCommand, PrimitiveType} from "../../renderer";
import { BaseComponent } from "./BaseComponent";
import { MaterialComponent } from "./MaterialComponent";
import { TransformComponent } from "./TransformComponent";

/**
 * Represents a primitive Shape like rectangle, circle, etc
 */
@Type('ShapeComponent')
export class ShapeComponent extends BaseComponent {
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;

    private defaultTransform = new TransformComponent();
    private defaultMaterial = new MaterialComponent();

    public get transform(): TransformComponent {
        return this.getContainer()?.getComponent('TransformComponent') ?? this.defaultTransform;
    }

    public get material(): MaterialComponent {
        return this.getContainer()?.getComponent('MaterialComponent') ?? this.defaultMaterial;
    }

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