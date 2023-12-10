import { PhysicsObject, Physx } from "../../../physx";
import { IComponent } from "./IComponent";

export type CollisionCallback = (collider: PhysicsObject) => void;

export interface ICollidableComponent extends IComponent {
    onCollisionCb: CollisionCallback | undefined;

    update(physx: Physx): void;
}