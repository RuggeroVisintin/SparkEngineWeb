import { IComponent } from "../components";
import { ISystem } from "./ISystem";

export abstract class BaseSystem<T extends IComponent> implements ISystem {
    public readonly components: T[] = [];

    public registerComponent(component: T): void {
        this.components.push(component);
    }

    public unregisterComponent(uuid: string): void {
        const componentIndex = this.components.findIndex(component => component.uuid === uuid);

        this.components.splice(componentIndex, 1);
    }

    public abstract update(deltaTime?: number): void;
}