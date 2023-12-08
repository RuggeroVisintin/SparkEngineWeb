import { Color, Type } from "../../core";
import { BaseComponent } from "./BaseComponent";

@Type('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    public diffuseColor: Color = Color.fromHex('#d16cd8');
    public opacity: number = 100;
}