import { ICollidableComponent, IComponent } from "../components";

/**
 * @category Entities
 */
export interface IEntity {
    addComponent(component: IComponent): void;
    getComponent<T extends IComponent>(type: string): T | undefined;
}