import { BoundingBoxComponent } from "../components";
import { BaseEntity } from "./BaseEntity";
import { StaticObject } from "./StaticObject";

export class TriggerEntity extends StaticObject {
    public readonly target: BaseEntity;

    constructor(target: BaseEntity) {
        super();

        if (!target.getComponent<BoundingBoxComponent>('BoundingBoxComponent')) {
            throw new Error('Target entity must have a BoundingBox component attached');
        }

        this.target = target;
    }
}