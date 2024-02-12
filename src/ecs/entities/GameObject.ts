import { MaterialComponent, MaterialComponentProps, ShapeComponent, ShapeComponentProps, TransformComponent, TransformComponentProps } from "../components";
import { BaseEntity } from "./BaseEntity";

export interface GameObjectProps {
    transform?: TransformComponentProps;
    shape?: ShapeComponentProps;
    material?: MaterialComponentProps;
}

/**
 * @category Entities
 */
export class GameObject extends BaseEntity {
    public transform: TransformComponent;
    public shape: ShapeComponent;
    public material: MaterialComponent;

    constructor(props?: GameObjectProps) {
        super();

        this.transform = new TransformComponent(props?.transform);
        this.shape = new ShapeComponent(props?.shape);
        this.material = new MaterialComponent(props?.material);

        this.addComponent(this.transform);
        this.addComponent(this.shape);
        this.addComponent(this.material);
    }
}