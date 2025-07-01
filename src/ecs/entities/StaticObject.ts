import { RegisterUnique, Type, WithType } from "../../core";
import { BoundingBoxComponent, BoundingBoxComponentProps } from "../components";
import { GameObject, GameObjectProps } from "./GameObject";

const ENTITY_TYPE = 'StaticObject';

/**
 * @category Entities
 */
export interface StaticObjectProps extends GameObjectProps {
    /**
     * The config of the bounding box component.
     * Uses default bounding box config if not set
     */
    boundingBox?: BoundingBoxComponentProps;
}

/**
 * @category Entities
 */
@Type(ENTITY_TYPE)
@RegisterUnique(ENTITY_TYPE)
export class StaticObject extends GameObject {
    public boundingBox: BoundingBoxComponent;

    /**
     * 
     * @param props - Optional components configuration
     */
    constructor(props?: StaticObjectProps) {
        super(props);

        this.boundingBox = new BoundingBoxComponent(props?.boundingBox);
        
        this.addComponent(this.boundingBox);
    }
}