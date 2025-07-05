import { RegisterUnique, Type } from "../../core";
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
    public get transform(): TransformComponent {
        return this.getComponent<TransformComponent>('TransformComponent')!;
    }

    public set transform(value: TransformComponent) {
        this.addComponent(value);
    }

    public get material(): MaterialComponent {
        return this.getComponent<MaterialComponent>('MaterialComponent')!;
    }

    public set material(value: MaterialComponent) {
        this.addComponent(value);
    }

    public get shape(): ShapeComponent {
        return this.getComponent<ShapeComponent>('ShapeComponent')!;
    }

    public set shape(value: ShapeComponent) {
        this.addComponent(value);
    }

    /**
     * 
     * @param props - Optional components configuration
     */
    constructor(props?: GameObjectProps) {
        super(props);

        if (!this.transform) {
            this.transform = new TransformComponent(props?.transform);
        }

        if(!this.shape) {
            this.shape = new ShapeComponent(props?.shape);
        }

        if(!this.material) {
            this.material = new MaterialComponent(props?.material);
        }
    }
}