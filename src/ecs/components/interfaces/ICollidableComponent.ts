import { IComponent } from "./IComponent";

export interface ICollidableComponent extends IComponent {
    onCollision(collider: ICollidableComponent): void;
}