import { RegisterUnique, Type } from "../../core";
import { BoundingBoxComponent, BoundingBoxComponentProps, ComponentProps } from "../components";
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
    public get boundingBox(): BoundingBoxComponent {
        return this.getComponent<BoundingBoxComponent>('BoundingBoxComponent')!;
    }

    public set boundingBox(value: BoundingBoxComponent) {
        this.addComponent(value);
    }

    /**
     * 
     * @param props - Optional components configuration
     */
    constructor(props?: StaticObjectProps) {
        super(props);

        if(!this.boundingBox) {
            this.boundingBox = new BoundingBoxComponent(props?.boundingBox);
        }
    }
}