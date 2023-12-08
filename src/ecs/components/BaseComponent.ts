import { Type } from "../../core";
import { IEntity } from "../entities";
import { IComponent } from "./IComponent";

@Type('BaseComponent')
export class BaseComponent implements IComponent {
    private _container: IEntity | null = null;

    public getContainer(): IEntity | null {
        return this._container;
    }

    public setContainer(container: IEntity) {
        this._container = container;
    }
}