import { Renderer } from "../../renderer";
import { DrawPrimitiveCommand, PrimitiveType } from "../../renderer/RenderCommand";
import { BaseComponent } from "./BaseComponent";
import { MaterialComponent } from "./MaterialComponent";
import { TransformComponent } from "./TransformComponent";

/**
 * Represents a primitive Shape like rectangle, circle, etc
 */
export class ShapeComponent extends BaseComponent {
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;

    private defaultTransform = new TransformComponent();
    private defaultMaterial = new MaterialComponent();

    public get transform(): TransformComponent {
        return this.defaultTransform;
    }

    public get material(): MaterialComponent {
        return this.defaultMaterial;
    }

    public draw(renderer: Renderer): void {
        const position = this.transform.position;
        const size = this.transform.size;

        renderer.pushRenderCommand(new DrawPrimitiveCommand(
            PrimitiveType.Rectangle,
            [position.x, position.y],
            [size.width, size.height]
        ));
    }
}