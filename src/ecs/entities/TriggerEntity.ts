import { UUID } from "crypto";
import { BoundingBoxComponent, CollisionCallback, CollisionCallbackParams } from "../components";
import { BaseEntity } from "./BaseEntity";
import { StaticObject, StaticObjectProps } from "./StaticObject";

/**
 * @category Entities
 */
export interface TriggerEntityProps extends StaticObjectProps {
    /**
     * The target of the trigger component
     */
    target: BaseEntity
}

/**
 * Triggers a callback when a collision with the given target entity is detected
 * 
 * @throws {Error} If target entity does not have a BoundingBox component attached
 * 
 * @category Entities
 */
export class TriggerEntity extends StaticObject {
    public readonly target: BaseEntity;

    /**
     * The callback to trigger when a collision with the target entity is detected.
     */
    public onTriggerCB: Function | null = null;

    private targetComponent: BoundingBoxComponent;

    /**
     * @param props - the init props
     */
    constructor(props: TriggerEntityProps) {
        super(props);

        const targetComponent = props.target.getComponent<BoundingBoxComponent>('BoundingBoxComponent');

        if (!targetComponent) {
            throw new Error('Target entity must have a BoundingBox component attached');
        }

        this.target = props.target;
        this.targetComponent = targetComponent;
        this.boundingBox.onCollisionCb = this.onCollisionHandler.bind(this);
    }

    private onCollisionHandler(params: CollisionCallbackParams): void {
        params.collider.uuid === this.targetComponent?.uuid && this.onTriggerCB?.(params);
    }
}