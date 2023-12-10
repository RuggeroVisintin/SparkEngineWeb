import { Type } from "../../core";
import { PhysicsObject, Physx } from "../../physx";
import { BaseComponent } from "./BaseComponent";
import { CollisionCallback, ICollidableComponent } from "./interfaces";

interface AABB {
    x: number;
    y: number;
    width: number;
    height: number;
}

@Type('BoundingBoxComponent')
export class BoundingBoxComponent extends BaseComponent implements ICollidableComponent {
    public onCollisionCb: CollisionCallback | undefined;
    public aabb: AABB = { x: 0, y: 0, width: 0, height: 0 }; 

    public update(physx: Physx): void {
        physx.pushPhysicalObject({
            object: {
                aabb: [this.aabb.x, this.aabb.y, this.aabb.height, this.aabb.width]
            },
            onCollisionCallback: this.onCollision,
        });
    }

    private onCollision(object: PhysicsObject) { 
        // TODO: implement
    }
}