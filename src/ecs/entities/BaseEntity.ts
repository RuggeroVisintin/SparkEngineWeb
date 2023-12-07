import { BaseComponent, IComponent } from "../components";
import { IEntity } from "./IEntity";

export class BaseEntity implements IEntity {
    private components: Map<string, IComponent> = new Map();

    public addComponent(key: string, component: IComponent): void {
        this.components.set(key, component);
        component.setContainer(this);
    }

    public getComponent<Component extends IComponent>(key: string): Component | undefined {
        return this.components.get(key) as Component;
    }
}