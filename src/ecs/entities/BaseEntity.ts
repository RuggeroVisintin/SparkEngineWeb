import { IncrementallyUnique, ThrowIfNotUnique, Type, typeOf } from "../../core";
import { IComponent } from "../components";
import { IEntity } from "./IEntity";

export interface BaseEntityProps {
    name?: string;
}

/**
 * @category Entities
 */
@Type('BaseEntity')
export class BaseEntity implements IEntity, BaseEntityProps {
    private components: Map<string, IComponent> = new Map();

    @IncrementallyUnique
    private _name: string = typeOf(this);

    constructor(props?: BaseEntityProps) {
        console.log('BASE ENTITY CONSTRUCTOR', props);

        if (props?.name) {
            this.name = props.name;
        }
    }

    @ThrowIfNotUnique
    public set name(value: string) {
        this._name = value;
    }

    public get name(): string {
        return this._name;
    }

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