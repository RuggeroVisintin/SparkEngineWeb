import { PhysicsObject, Physx } from "../../../physx";
import { IComponent } from "./IComponent";

export interface CollisionCallbackParams {
    collider: PhysicsObject,
    postSimulation: PhysicsObject 
}
export type CollisionCallback = (params: CollisionCallbackParams) => void;

export interface ICollidableComponent extends IComponent {
    onCollisionCb: CollisionCallback | undefined;

    update(physx: Physx): void;
}