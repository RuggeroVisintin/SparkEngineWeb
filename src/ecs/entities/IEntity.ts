import { IComponent } from "../components";

export interface IEntity {
    addComponent(key: string, component: IComponent): void;
    getComponent<T extends IComponent>(key: string): T | undefined;
}