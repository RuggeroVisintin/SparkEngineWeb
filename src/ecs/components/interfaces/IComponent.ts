import { IEntity } from "../../entities";

/**
 * @category Components
 */
export interface IComponent {    
    readonly uuid: string;

    getContainer(): IEntity | undefined;
    setContainer(container: IEntity): void;
}