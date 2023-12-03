import { IComponent } from "../components";

export interface IEntity {
    addComponent(key: string, component: IComponent): void;
    getComponent(key: string): IComponent | undefined;
}