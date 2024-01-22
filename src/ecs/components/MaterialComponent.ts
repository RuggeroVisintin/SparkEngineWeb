import { Rgb, Type } from "../../core";
import { BaseComponent } from "./BaseComponent";

/**
 * @category Components
 */
@Type('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    public diffuseColor: Rgb = Rgb.fromHex('#d16cd8');
    public opacity: number = 100;
}