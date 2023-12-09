import { BaseComponent } from "./BaseComponent";
import { CollisionCallback, ICollidableComponent } from "./interfaces";

export class BoundingBoxComponent extends BaseComponent implements ICollidableComponent {
    public onCollisionCb: CollisionCallback | undefined;

    update(): void {
        // TODO: take physx engine as input parameter and check collision with other colliders
    }
}