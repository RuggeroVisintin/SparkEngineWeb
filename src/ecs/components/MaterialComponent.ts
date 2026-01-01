import { Optional, Rgb, RgbProps, WithType } from "../../core";
import { ImageAsset, DOMImageLoader } from "../../platform";
import { BaseComponent } from "./BaseComponent";
import { Component } from "./interfaces";

/**
 * @category Components
 */
export interface MaterialComponentProps {
    /**
     * The diffuse color of the material, expressed through Rgb Props
     */
    diffuseColor?: RgbProps;
    /**
     * The opacity of the material.
     * The value is a range between 0 and 100, where 0 is fully transparent object and 100 is a fully opaque
     */
    opacity?: number;
    /**
     * The texture path to use as a diffuse texture 
     */
    diffuseTexturePath?: string;
}

/**
 * @category Components
 */
@Component('MaterialComponent')
export class MaterialComponent extends BaseComponent implements MaterialComponentProps {
    private _diffuseTexture?: ImageAsset;
    private _diffuseTexturePath?: string;
    private _diffuseColor?: Rgb = Rgb.fromHex('#d16cd8');

    private _isDefaultDiffuseColor = true;

    public opacity: number = 100;

    public set diffuseColor(color: Rgb) {
        this._diffuseColor = color;
        this._isDefaultDiffuseColor = false;
    }

    @Optional(Rgb)
    public get diffuseColor(): Rgb | undefined {
        return this._diffuseColor;
    }

    /**
     * Set the path from which to load the diffuse texture
     * This will also remove the current diffuse texture and 
     * remove the diffuse color if the default one is in use
     */
    public set diffuseTexturePath(path: string) {
        this._diffuseTexture = undefined;
        this._diffuseTexturePath = path;

        if (this._isDefaultDiffuseColor === true) this._diffuseColor = undefined;
    }

    @Optional(String)
    public get diffuseTexturePath(): string | undefined {
        return this._diffuseTexturePath;
    }

    @Optional(ImageAsset)
    get diffuseTexture(): ImageAsset | undefined {
        return this._diffuseTexture;
    }

    set diffuseTexture(texture: ImageAsset) {
        this._diffuseTexture = texture;
    }

    constructor(props?: MaterialComponentProps) {
        super();

        if (props?.diffuseColor) this.diffuseColor = Rgb.fromRgb(props.diffuseColor);
        if (props?.opacity) this.opacity = props.opacity;
        if (props?.diffuseTexturePath) this.diffuseTexturePath = props.diffuseTexturePath;
    }

    public removeDiffuseColor(): void {
        this._diffuseColor = undefined;
    }

    /**
     * Lazy load the diffuse texture from the path set in diffuseTexturePath
     * once loaded it will be set to the diffuseTexture property and be available for rendering
     */
    public loadTexture(loader: DOMImageLoader): void {
        this.diffuseTexturePath && loader
            .load(this.diffuseTexturePath)
            .then((asset) => {
                this._diffuseTexture = asset;
            });
    }

    // TODO - .isDiffuseTextureLoaded()

    public toJson(): WithType<MaterialComponentProps> {
        return {
            ...super.toJson(),
            diffuseColor: this.diffuseColor?.toJson(),
            opacity: this.opacity,
            diffuseTexturePath: this.diffuseTexturePath
        }
    }
}