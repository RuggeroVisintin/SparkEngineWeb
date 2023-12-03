import { IEntity } from "../entities";
import { IComponent } from "./IComponent";

export class BaseComponent implements IComponent {
    public getContainer(): IEntity {
        throw new Error("Method not implemented.");
    }
}