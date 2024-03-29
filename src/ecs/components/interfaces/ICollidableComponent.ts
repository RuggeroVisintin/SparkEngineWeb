import { PhysicsObject, Physx } from "../../../physx";
import { IComponent } from "./IComponent";

/**
 * @category Components
 */
export interface CollisionCallbackParams {
    collider: PhysicsObject,
    postSimulation: PhysicsObject 
}

/**
 * @category Components
 */
export type CollisionCallback = (params: CollisionCallbackParams) => void;

/**
 * @category Components
 */
export interface ICollidableComponent extends IComponent {
    onCollisionCb: CollisionCallback | undefined;

    update(physx: Physx): void;
}