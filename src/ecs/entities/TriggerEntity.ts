import { BoundingBoxComponent, CollisionCallbackParams } from "../components";
import { BaseEntity } from "./BaseEntity";
import { StaticObject, StaticObjectProps } from "./StaticObject";
import { Type } from "../../core";
import { IEntity } from ".";

/**
 * @category Entities
 */
export interface TriggerEntityProps extends StaticObjectProps {
    /**
     * The target of the trigger component
     */
    target?: IEntity
}

/**
 * Use this Entity to detect collisions with another target entity and implement a custom logic
 * 
 * @todo This entity does not support target serialization, please follow https://github.com/RuggeroVisintin/SparkEngineWeb/issues/366 
 * @category Entities
 */
@Type('TriggerEntity')
export class TriggerEntity extends StaticObject {
    private _targetComponent?: BoundingBoxComponent;

    /**
     * The target entity that triggers the collision detection
     * 
     * @throws {Error} If target entity does not have a BoundingBox component attached
     */
    public set target(value: IEntity | undefined) {
        if (!value) {
            this._targetComponent = undefined;
            return;
        }

        const targetComponent = value.getComponent<BoundingBoxComponent>('BoundingBoxComponent');
    
        if (!targetComponent) {
            throw new Error('Target entity must have a BoundingBox component attached');
        }
    
        this._targetComponent = targetComponent;
    }

    public get target(): IEntity | undefined {
        return this._targetComponent?.getContainer();
    }
    

    /**
     * The callback to trigger when a collision with the target entity is detected.
     */
    public onTriggerCB: Function | null = null;

    /**
     * @param props - the init props
     */
    constructor(props?: TriggerEntityProps) {
        super(props);

        this.target = props?.target;
        this.boundingBox.onCollisionCb = this.onCollisionHandler.bind(this);
    }

    private onCollisionHandler(params: CollisionCallbackParams): void {
        params.collider.uuid === this._targetComponent?.uuid && this.onTriggerCB?.(params);
    }
}