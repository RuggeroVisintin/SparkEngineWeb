import { RegisterUnique, Type, WithType } from "../../core";
import { MaterialComponent, MaterialComponentProps, ShapeComponent, ShapeComponentProps, TransformComponent, TransformComponentProps } from "../components";
import { BaseEntity, BaseEntityProps } from "./BaseEntity";

const ENTITY_TYPE = 'GameObject';

/**
 * @category Entities
 */
export interface GameObjectProps extends BaseEntityProps {
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
@Type(ENTITY_TYPE)
@RegisterUnique(ENTITY_TYPE)
export class GameObject extends BaseEntity {
    public transform: TransformComponent;
    public shape: ShapeComponent;
    public material: MaterialComponent;

    /**
     * 
     * @param props - Optional components configuration
     */
    constructor(props?: GameObjectProps) {
        super(props);

        this.transform = new TransformComponent(props?.transform);
        this.shape = new ShapeComponent(props?.shape);
        this.material = new MaterialComponent(props?.material);

        this.addComponent(this.transform);
        this.addComponent(this.shape);
        this.addComponent(this.material);
    }

    public toJson(): WithType<GameObjectProps> {
        return {
            ...super.toJson(),
            transform: this.transform.toJson(),
            shape: this.shape.toJson(),
            material: this.material.toJson()
        }
    }
}