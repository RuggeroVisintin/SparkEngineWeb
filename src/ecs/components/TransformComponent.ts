import { Type, Vec2, WithType } from "../../core";
import { BaseComponent } from "./BaseComponent";
import { ComponentProps } from "./interfaces";

interface Size2D {
    /**
     * @category Components
     */
    width: number;
    height: number;
}
export interface TransformComponentProps extends ComponentProps {
    position?: Vec2;
    size?: Size2D;
    depthIndex?: number;
    velocity?: Vec2;
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

    constructor(props?: TransformComponentProps) {
        super();

        if (props?.position) this.position = Vec2.from(props.position);
        if (props?.size) this.size = props.size;
        if (props?.depthIndex) this.depthIndex = props.depthIndex;
        if (props?.velocity) this.velocity = Vec2.from(props.velocity);
    }

    public update(deltaTime?: number): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    public toJson(): WithType<TransformComponentProps> {
        return {
            ...super.toJson(),
            position: this.position,
            size: this.size,
            depthIndex: this.depthIndex,
            velocity: this.velocity
        };
    }
}