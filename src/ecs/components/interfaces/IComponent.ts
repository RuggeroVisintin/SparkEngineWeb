import { IEntity } from "../../entities";

/**
 * @category Components
 */
export interface IComponent {    
    readonly uuid: string;

    getContainer(): IEntity | null;
    setContainer(container: IEntity): void;
}