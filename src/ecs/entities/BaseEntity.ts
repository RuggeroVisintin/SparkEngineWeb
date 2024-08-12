import { v4 as uuid } from 'uuid';
import { Type, WithType, incrementallyUnique, setUniqueCounter, typeOf, typesOf } from "../../core";
import { IComponent } from "../components";
import { EntityProps, IEntity } from "./IEntity";

export interface BaseEntityProps extends EntityProps {
    name?: string;
}

/**
 * @category Entities
 */
@Type('BaseEntity')
export class BaseEntity implements IEntity {
    public readonly uuid = uuid();

    private _components: Map<string, IComponent[]> = new Map();

    private _name: string = '';

    constructor(props?: BaseEntityProps) {
        if (props?.name) {
            this.name = props.name;
        } else {
            this.name = incrementallyUnique(typeOf(this));
        }
    }

    /**
     * The name of the entity. Must be unique in the same scene
     */
    // TODO - If already assigned to a scene, it should check the uniqueness of the name in that scene
    public set name(value: string) {
        this._name = value;
    }

    public get name(): string {
        return this._name;
    }

    /**
     * Adds a component to this entity.
     * 
     * The component type is used as search key for the component. 
     * A key is also added for any item in its types chain.
     * If a component of the same type is already present, it will be added to the components list as a new Item.
     * The latest item to be added is the first in the list.
     * The same applies for types in its type chain
     * 
     * @param component - the componnt to add to this entity
     */
    public addComponent(component: IComponent): void {

        typesOf(component).forEach(type => {
            this._components.set(type, [component, ...this.getComponents(type)])
        })
        component.setContainer(this);
    }

    /**
     * Gets the first component matching a specific type.
     * We highly recommend to not use base types as a search key due to high chances of collisions
     * See .addComponent() method
     * 
     * @param type 
     * @returns the first component found with the type
     */
    public getComponent<Component extends IComponent>(type: string): Component | undefined {
        return (this._components.get(type)?.[0]) as Component;
    }

    /**
     * Gets all the components mathcing a specific type.
     * We highly recommend to not use base types as a search key due to high chances of collisions
     * See .addComponent() method
     * 
     * @param type 
     * @returns the first component found with the type
     */
    public getComponents<Component extends IComponent>(type: string): Component[] {
        return <Component[]>this._components.get(type) ?? [];
    }

    public toJson(): WithType<BaseEntityProps> {
        return {
            __type: typeOf(this),
            name: this.name
        }
    }
}