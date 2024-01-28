import { BoundingBoxComponent, CollisionCallback, CollisionCallbackParams } from "../components";
import { BaseEntity } from "./BaseEntity";
import { StaticObject } from "./StaticObject";

export class TriggerEntity extends StaticObject {
    public readonly target: BaseEntity;
    public onTriggerCB: Function | null = null;

    private targetComponent: BoundingBoxComponent;

    constructor(target: BaseEntity) {
        super();

        const targetComponent = target.getComponent<BoundingBoxComponent>('BoundingBoxComponent');

        if (!targetComponent) {
            throw new Error('Target entity must have a BoundingBox component attached');
        }

        this.target = target;
        this.targetComponent = targetComponent;
        this.boundingBox.onCollisionCb = this.onCollisionHandler.bind(this);
    }

    private onCollisionHandler(params: CollisionCallbackParams): void {
        params.collider.uuid === this.targetComponent?.uuid && this.onTriggerCB?.(params);
    }
}