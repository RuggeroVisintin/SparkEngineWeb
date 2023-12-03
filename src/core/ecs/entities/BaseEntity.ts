import { BaseComponent, IComponent } from "../components";

export class BaseEntity {
    private components: Map<string, BaseComponent> = new Map();

    public addComponent<Component extends BaseComponent>(key: string, component: Component): void {
        this.components.set(key, component);
    }

    public getComponent<Component extends BaseComponent>(key: string): Component | undefined {
        return this.components.get(key) as Component;
    }
}