import { BoundingBoxComponent, BoundingBoxComponentProps } from "../components";
import { GameObject, GameObjectProps } from "./GameObject";

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
export class StaticObject extends GameObject {
    public boundingBox: BoundingBoxComponent;

    /**
     * 
     * @param props - Optional components configuration
     */
    constructor(props?: StaticObjectProps) {
        super();

        this.boundingBox = new BoundingBoxComponent(props?.boundingBox);
        
        this.addComponent(this.boundingBox);
    }
}