import { Optional } from "../../core";
import { BaseEntity, IEntity } from "../entities";
import { BoundingBoxComponent, BoundingBoxComponentProps } from "./BoundingBoxComponent";
import { CollisionCallbackParams, Component } from "./interfaces";

export interface TriggerComponentProps extends BoundingBoxComponentProps {
    target?: IEntity;
}

/**
 * @category Components
 * 
 * This component represents a trigger that can be used to detect collisions with a target entity. 
 * The target entity must have a BoundingBoxComponent attached to be valid.
 */
@Component('TriggerComponent')
export class TriggerComponent extends BoundingBoxComponent {
    @Optional(BaseEntity)
    public target?: IEntity;

    constructor(props?: TriggerComponentProps) {
        super(props);

        if (props?.target) {
            this.target = props.target;
        }
    }

    protected onCollision(params: CollisionCallbackParams) {
        if (params.collider.uuid !== this.target?.getComponent<BoundingBoxComponent>('BoundingBoxComponent')?.uuid) {
            return;
        }

        this.onCollisionCb && this.onCollisionCb.call(this, params);
    }
}