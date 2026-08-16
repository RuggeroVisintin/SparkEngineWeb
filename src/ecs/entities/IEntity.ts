import { WithType } from "../../core";
import { ComponentProps, IComponent } from "../components";

export interface EntityProps {
    name?: string;
    components?: WithType<ComponentProps>[];
}

/**
 * @category Entities
 */
export interface IEntity {
    uuid: string;
    name: string;

    components: IComponent[];

    addComponent(component: IComponent): void;
    removeComponent(uuid: string): void;
    getComponent<T extends IComponent>(type: string): T | undefined;
    getComponents<T extends IComponent>(type: string): T[];

    /**
     * Returns a Json Object representation of the Entity
     */
    toJson(): WithType<EntityProps>;
}