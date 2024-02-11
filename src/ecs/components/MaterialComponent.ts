import { Rgb, Type } from "../../core";
import { BaseComponent } from "./BaseComponent";


/**
 * @category Components
 */
export interface MaterialComponentProps {
    diffuseColor?: Rgb;
    opacity?: number;
}

/**
 * @category Components
 */
@Type('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    public diffuseColor: Rgb = Rgb.fromHex('#d16cd8');
    public opacity: number = 100;

    constructor(props?: MaterialComponentProps) {
        super();

        if (props?.diffuseColor) this.diffuseColor = props.diffuseColor;
        if (props?.opacity) this.opacity = props.opacity;
    }
}