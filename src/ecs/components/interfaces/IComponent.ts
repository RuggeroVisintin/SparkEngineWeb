import { Type, WithType } from "../../../core";
import { IEntity } from "../../entities";

export interface ComponentProps { };

/**
 * @category Components
 */
export interface IComponent {
    readonly uuid: string;

    getContainer(): IEntity | undefined;
    setContainer(container: IEntity): void;

    toJson(): WithType<ComponentProps>;
}

export function Component(value: string) {
    return Type(value, 'Component')
}