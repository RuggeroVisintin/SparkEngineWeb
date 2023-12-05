import { IEntity } from "../entities";

export interface IComponent {
    getContainer(): IEntity;
    setContainer(container: IEntity): void;
}