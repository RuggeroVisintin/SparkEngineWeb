import { IComponent } from "../components";
import { ISystem } from "./ISystem";

export abstract class BaseSystem<T extends IComponent> implements ISystem {
    public readonly components: T[] = [];

    public registerComponent(component: T): void {
        this.components.push(component);
    }

    public abstract update(): void;
}