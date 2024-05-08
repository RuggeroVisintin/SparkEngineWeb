import { IComponent } from "../components";

/**
 * @category Systems
 */
export interface ISystem {
    registerComponent(component: IComponent): void;
    unregisterComponent(uuid: string): void;
    update(deltaTime?: number): void;
}