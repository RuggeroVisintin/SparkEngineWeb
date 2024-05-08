import { IComponent } from "../components";
import { ISystem } from "./ISystem";

export abstract class BaseSystem<T extends IComponent> implements ISystem {
    public readonly components: T[] = [];

    /**
     * Adds the component to the system's component list
     * @param component - The component to be added
     */
    public registerComponent(component: T): void {
        this.components.push(component);
    }

    /**
     * Removes the component from the system's component list
     * @param component - The component to be removed
     */
    public unregisterComponent(uuid: string): void {
        const componentIndex = this.components.findIndex(component => component.uuid === uuid);

        if (componentIndex === -1) {
            return;
        }

        this.components.splice(componentIndex, 1);
    }

    /**
     * triggers an update cycle
     * @param deltaTime - the elapesd time since last update
     */
    public abstract update(deltaTime?: number): void;
}