import { MaterialComponent, MaterialComponentProps, ShapeComponent, ShapeComponentProps, TransformComponent, TransformComponentProps } from "../components";
import { BaseEntity } from "./BaseEntity";

/**
 * @category Entities
 */
export interface GameObjectProps {
    /**
     * The configuration of the transform component. 
     * Uses default transform config if not set
     */
    transform?: TransformComponentProps;
    /**
     * The configuration of the shape component.
     * Uses default shape config if not set
     */
    shape?: ShapeComponentProps;
    /**
     * The configuration of the material component
     * Uses default material config if not set
     */
    material?: MaterialComponentProps;
}

/**
 * @category Entities
 */
export class GameObject extends BaseEntity {
    public transform: TransformComponent;
    public shape: ShapeComponent;
    public material: MaterialComponent;

    /**
     * 
     * @param props - Optional components configuration
     */
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