import { IComponent } from "../components";

/**
 * @category Entities
 */
export interface IEntity {
    name: string;

    addComponent(component: IComponent): void;
    getComponent<T extends IComponent>(type: string): T | undefined;
}