import { IEntity } from "../../entities";

export interface IComponent {    
    readonly uuid: string;

    getContainer(): IEntity | null;
    setContainer(container: IEntity): void;
}