import { PrimitiveType } from "../../renderer/RenderCommand";
import { BaseComponent } from "./BaseComponent";

/**
 * Represents a primitive Shape like rectangle, circle, etc
 */
export class ShapeComponent extends BaseComponent {
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;
}