import { ThrowIfNotUnique, Type, incrementallyUnique, throwIfNotUnique, typeOf } from "../../core";
import { IComponent } from "../components";
import { IEntity } from "./IEntity";

export interface BaseEntityProps {
    name?: string;
}

/**
 * @category Entities
 */
@Type('BaseEntity')
export class BaseEntity implements IEntity {
    private components: Map<string, IComponent> = new Map();

    private _name: string = '';

    constructor(props?: BaseEntityProps) {
        if (props?.name) {
            this.name = props.name;
        } else {
            this._name = incrementallyUnique(typeOf(this));
        }
    }

    @ThrowIfNotUnique
    public set name(value: string) {
        // throwIfNotUnique(value);

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