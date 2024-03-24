import { Rgb, Type } from "../../core";
import { ImageAsset, ImageLoader } from "../../platform";
import { BaseComponent } from "./BaseComponent";


/**
 * @category Components
 */
export interface MaterialComponentProps {
    diffuseColor?: Rgb;
    opacity?: number;
    diffuseTexturePath?: string;
}

/**
 * @category Components
 */
@Type('MaterialComponent')
export class MaterialComponent extends BaseComponent {
    private _diffuseTexture?: ImageAsset;

    public diffuseColor: Rgb = Rgb.fromHex('#d16cd8');
    public opacity: number = 100;
    private _diffuseTexturePath?: string;

    public set diffuseTexturePath(path: string) {
        this._diffuseTexture = undefined;
        this._diffuseTexturePath = path;
    }

    public get diffuseTexturePath(): string | undefined {
        return this._diffuseTexturePath;
    }

    get diffuseTexture(): ImageAsset | undefined {
        return this._diffuseTexture;
    }

    constructor(props?: MaterialComponentProps) {
        super();

        if (props?.diffuseColor) this.diffuseColor = Rgb.fromRgb(props.diffuseColor);
        if (props?.opacity) this.opacity = props.opacity;
        if (props?.diffuseTexturePath) this._diffuseTexturePath = props.diffuseTexturePath;
    }
    
    public loadTexture(loader: ImageLoader): void {
        this.diffuseTexturePath && loader
            .load(this.diffuseTexturePath)
            .then((asset) => {
                this._diffuseTexture = asset;
            });
    }
}