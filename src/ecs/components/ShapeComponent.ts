import { BaseComponent } from "./BaseComponent";

export enum ShapeType {
    Rectangle = 0
}

/**
 * Represents a primitive Shape like rectangle, circle, etc
 */
export class ShapeComponent extends BaseComponent {
    public shapeType: ShapeType = ShapeType.Rectangle;
}