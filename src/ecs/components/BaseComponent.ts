import { v4 as uuid } from 'uuid';
import { Type } from "../../core";
import { IEntity } from "../entities";
import { IComponent } from "./interfaces";

/** @category Components */
@Type('BaseComponent')
export class BaseComponent implements IComponent {
    public readonly uuid = uuid();

    private _container: IEntity | null = null;

    public getContainer(): IEntity | null {
        return this._container;
    }

    public setContainer(container: IEntity) {
        this._container = container;
    }
}