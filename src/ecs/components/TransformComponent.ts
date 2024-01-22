import { Type, Vec2 } from "../../core";
import { BaseComponent } from "./BaseComponent";


interface Size2D {
    /**
     * @category Components
     */
    width: number;
    height: number;
}
/**
 * @category Components
 */
@Type('TransformComponent')
export class TransformComponent extends BaseComponent {
    public position: Vec2 = new Vec2();
    public size: Size2D = { width: 0, height: 0 };
    public depthIndex: number = 0;
    public velocity: Vec2 = new Vec2();

    public update(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}