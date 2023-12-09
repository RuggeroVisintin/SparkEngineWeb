import { IComponent } from "./IComponent";

export type CollisionCallback = (collider: ICollidableComponent) => void;

export interface ICollidableComponent extends IComponent {
    onCollisionCb: CollisionCallback | undefined;

    update(): void;
}