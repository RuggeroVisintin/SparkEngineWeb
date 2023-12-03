import { BaseComponent } from "../components";

export interface ISystem {
    registerComponent(component: BaseComponent): void;
    update(): void;
}