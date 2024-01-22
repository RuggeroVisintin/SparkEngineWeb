import { Type } from "../../core";
import { PhysicsObject, Physx } from "../../physx";
import { BaseComponent } from "./BaseComponent";
import { TransformComponent } from "./TransformComponent";
import { CollisionCallback, ICollidableComponent } from "./interfaces";

/**
 * @category Components
 */
interface AABB {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * @category Components
 */
@Type('BoundingBoxComponent')
export class BoundingBoxComponent extends BaseComponent implements ICollidableComponent {
    private defaultAABB: AABB = { x: 0, y: 0, width: 0, height: 0 }; 

    public onCollisionCb: CollisionCallback | undefined;
    public matchContainerTransform: boolean = false;

    public get aabb(): AABB { 

        const container = this.getContainer();
        const containerTransform = container ? container.getComponent<TransformComponent>('TransformComponent') : undefined;

        return this.matchContainerTransform && containerTransform
            ? { ...containerTransform.position, ...containerTransform.size }
            : this.defaultAABB
    }

    public set aabb(value: AABB) { 
        this.defaultAABB = value;
    }

    public update(physx: Physx): void {
        physx.pushPhysicalObject({
            object: {
                aabb: [this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height]
            },
            onCollisionCallback: (object: PhysicsObject) => this.onCollision(object),
        });
    }

    private onCollision(object: PhysicsObject) { 
        this.onCollisionCb && this.onCollisionCb(object);
    }
}