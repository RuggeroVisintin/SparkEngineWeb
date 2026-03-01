import { v4 as uuid } from 'uuid';
import { RegisterUnique, Type, WithType, incrementallyUnique, typeOf, typesOf } from "../../core";
import { IComponent } from "../components";
import { EntityProps, IEntity } from "./IEntity";
import { create } from '../../core/factory';

const ENTITY_TYPE = 'BaseEntity';

export interface BaseEntityProps extends EntityProps { }

/**
 * @category Entities
 */
@Type(ENTITY_TYPE)
@RegisterUnique(ENTITY_TYPE)
export class BaseEntity implements IEntity {
    public readonly uuid = uuid();

    private _componentsTypeMap: Map<string, IComponent[]> = new Map();
    private _flattenedComponents: IComponent[] = [];

    private _name: string = '';

    constructor(props?: BaseEntityProps) {
        if (props?.name) {
            this.name = props.name;
        } else {
            this.name = incrementallyUnique(typeOf(this));
        }

        props?.components?.forEach(componentProps => {
            const component = create<IComponent>(componentProps.__type, componentProps)
            this.addComponent(component);
        });
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

    public get components(): IComponent[] {
        return this._flattenedComponents;
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
            this._componentsTypeMap.set(type, [component, ...this.getComponents(type)])
        });

        this._flattenedComponents.push(component);
        component.setContainer(this);
    }

    /**
     * Removes a component from this entity by its UUID.
     * 
     * The component is removed from all type keys in the components map
     * and from the flattened components array.
     * 
     * @param uuid - the UUID of the component to remove
     */
    public removeComponent(uuid: string): void {
        const componentIndex = this._flattenedComponents.findIndex(c => c.uuid === uuid);
        if (componentIndex === -1) return;

        const component = this._flattenedComponents[componentIndex];

        // Remove from type-based map for all types in the component's type chain
        typesOf(component).forEach(type => {
            const components = this.getComponents(type);
            const filtered = components.filter(c => c.uuid !== uuid);
            if (filtered.length > 0) {
                this._componentsTypeMap.set(type, filtered);
            } else {
                this._componentsTypeMap.delete(type);
            }
        });

        // Remove from flattened array
        this._flattenedComponents.splice(componentIndex, 1);
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
        return (this._componentsTypeMap.get(type)?.[0]) as Component;
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
        return <Component[]>this._componentsTypeMap.get(type) ?? [];
    }

    public toJson(): WithType<BaseEntityProps> {
        const components = this._flattenedComponents.map(component => component.toJson());

        return {
            __type: typeOf(this),
            name: this.name,
            components
        }
    }
}