import { IComponent } from "../components";
import { ISystem } from "./ISystem";

export abstract class BaseSystem<T extends IComponent> implements ISystem {
    private _isRunning = true;

    public readonly components: T[] = [];

    public get isRunning(): boolean {
        return this._isRunning;
    }

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
     * Pauses the system update cycle
     */
    public pause(): void {
        this._isRunning = false;
    }

    /**
     * Resumes the system update cycle
     */
    public resume(): void {
        this._isRunning = true;
    }

    /**
     * The internal status update to use when implementing system.
     * Prefer overridding this method when having to change the update logic
     * 
     * @param deltaTime - the elapesd time since last update
     */
    protected abstract _internalUpdate(deltaTime?: number): void;

    /**
     * Triggers an update cycle
     * 
     * @param deltaTime - the elapesd time since last update
     */
    public update(deltaTime?: number): void {
        if (!this._isRunning) return;

        this._internalUpdate(deltaTime);
    }
}