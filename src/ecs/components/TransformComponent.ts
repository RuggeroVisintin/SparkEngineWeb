import { Type, Vec2 } from "../../core";
import { BaseComponent } from "./BaseComponent";

interface Size2D {
    width: number;
    height: number;
}

@Type('TransformComponent')
export class TransformComponent extends BaseComponent {
    public position: Vec2 = new Vec2();
    public size: Size2D = { width: 0, height: 0 };
    public depthIndex: number = 0;   
}