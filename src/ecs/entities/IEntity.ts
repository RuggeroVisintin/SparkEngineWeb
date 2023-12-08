import { IComponent } from "../components";

export interface IEntity {
    addComponent(component: IComponent): void;
    getComponent<T extends IComponent>(type: string): T | undefined;
}