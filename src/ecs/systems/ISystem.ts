import { IComponent } from "../components";

/**
 * @category Systems
 */
export interface ISystem {
    registerComponent(component: IComponent): void;
    update(): void;
}