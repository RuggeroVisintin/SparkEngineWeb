import { typeOf } from "../../core";
import { ICollidableComponent, IComponent } from "../components";
import { IEntity } from "./IEntity";

export class BaseEntity implements IEntity {
    private components: Map<string, IComponent> = new Map();

    public addComponent(component: IComponent): void {
        this.components.set(typeOf(component), component);
        component.setContainer(this);
    }

    /**
     * Gets the first component matching a specific type
     * @param type 
     * @returns the first component found with the type
     */
    public getComponent<Component extends IComponent>(type: string): Component | undefined {
        return this.components.get(type) as Component;
    }

    public onCollision(component: ICollidableComponent): void {}
}