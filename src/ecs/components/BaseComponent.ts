import { IEntity } from "../entities";
import { IComponent } from "./IComponent";

export class BaseComponent implements IComponent {
    private _container: IEntity | null = null;

    public getContainer(): IEntity | null {
        return this._container;
    }

    public setContainer(container: IEntity) {
        this._container = container;
    }
}