import { v4 as uuid } from 'uuid';
import { WithType, typeOf } from "../../core";
import { IEntity } from "../entities";
import { Component, ComponentProps, IComponent } from "./interfaces";

/** @category Components */
@Component('BaseComponent')
export class BaseComponent implements IComponent {
    private readonly _uuid = uuid();

    private _container?: IEntity;

    public get uuid(): string {
        return this._uuid;
    }

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