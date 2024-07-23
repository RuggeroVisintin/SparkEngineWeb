import { v4 as uuid } from 'uuid';
import { Type, WithType, typeOf } from "../../core";
import { IEntity } from "../entities";
import { ComponentProps, IComponent } from "./interfaces";



/** @category Components */
@Type('BaseComponent')
export class BaseComponent implements IComponent {
    public readonly uuid = uuid();

    private _container?: IEntity;

    public getContainer(): IEntity | undefined {
        return this._container;
    }

    public setContainer(container: IEntity) {
        this._container = container;
    }

    public toJson(): WithType<ComponentProps> {
        return {
            __type: typeOf(this)
        };
    }
}