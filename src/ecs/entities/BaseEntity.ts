import { Type, typeOf } from "../../core";
import { IComponent } from "../components";
import { IEntity } from "./IEntity";

/**
 * @category Entities
 */
@Type('BaseEntity')
export class BaseEntity implements IEntity {
    private components: Map<string, IComponent> = new Map();

    public readonly name: string = typeOf(this);

    /**
     * Adds a component to this entity.
     * 
     * @param component - the componnt to add to this entity
     */
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
}