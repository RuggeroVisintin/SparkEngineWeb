import { IComponent } from "../components";

export interface EntityProps {
}

/**
 * @category Entities
 */
export interface IEntity {
    uuid: string;
    name: string;

    addComponent(component: IComponent): void;
    getComponent<T extends IComponent>(type: string): T | undefined;

    /**
     * Returns a Json Object representation of the Entity
     */
    toJson(): EntityProps;
}