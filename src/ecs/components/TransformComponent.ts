import { Type } from "../../core";
import { BaseComponent } from "./BaseComponent";

interface Position2D {
    x: number;
    y: number;
}

interface Size2D {
    width: number;
    height: number;
}

@Type('TransformComponent')
export class TransformComponent extends BaseComponent {
    public position: Position2D = { x: 0, y: 0 };
    public size: Size2D = { width: 0, height: 0 };
    public depthIndex: number = 0;   
}