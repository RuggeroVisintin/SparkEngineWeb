import { SerializableCallback } from "../../../core";
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
export type CollisionCallback = SerializableCallback<(params: CollisionCallbackParams) => void>;

/**
 * @category Components
 */
export interface ICollidableComponent extends IComponent {
    onCollisionCb?: CollisionCallback;

    update(physx: Physx): void;
}