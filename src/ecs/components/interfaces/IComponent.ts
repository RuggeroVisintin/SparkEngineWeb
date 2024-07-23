import { IEntity } from "../../entities";

export interface ComponentProps { };

/**
 * @category Components
 */
export interface IComponent {    
    readonly uuid: string;

    getContainer(): IEntity | undefined;
    setContainer(container: IEntity): void;

    toJson(): ComponentProps;
}