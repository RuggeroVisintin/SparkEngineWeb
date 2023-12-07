import { IEntity } from "../entities";

export interface IComponent {    
    getContainer(): IEntity | null;
    setContainer(container: IEntity): void;
}