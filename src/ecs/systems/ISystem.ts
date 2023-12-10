import { IComponent } from "../components";

export interface ISystem {
    registerComponent(component: IComponent): void;
    update(): void;
}