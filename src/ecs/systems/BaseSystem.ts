import { IComponent } from "../components";
import { ISystem } from "./ISystem";

export abstract class BaseSystem<T extends IComponent> implements ISystem {
    private _isRunning = true;

    private readonly _components: Map<string, T> = new Map();

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public get components(): T[] 
    {
        return Array.from(this._components.values());
    }

    /**
     * Adds the component to the system's component list
     * @param component - The component to be added
     */
    public registerComponent(component: T): void {
        if (this._components.has(component.uuid)) return;

        this._components.set(component.uuid, component);
    }

    /**
     * Removes the component from the system's component list
     * @param component - The component to be removed
     */
    public unregisterComponent(uuid: string): void {
        if (!this._components.has(uuid)) return;

        this._components.delete(uuid);
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
    protected abstract internalUpdate(deltaTime?: number): void;

    /**
     * Triggers an update cycle
     * 
     * @param deltaTime - the elapesd time since last update
     */
    public update(deltaTime?: number): void {
        if (!this._isRunning) return;

        this.internalUpdate(deltaTime);
    }
}