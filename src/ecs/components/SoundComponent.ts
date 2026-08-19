import { WithType, Nullable, Optional } from "../../core";
import { SoundAsset, SoundLoader } from "../../platform";
import { BaseComponent } from "./BaseComponent";
import { Component, ComponentProps } from "./interfaces";

/**
 * @category Components
 * @public
 */
export interface SoundComponentProps extends ComponentProps {
    filePath?: string;
}

/**
 * Represents a sound that can be played
 * 
 * @category Components
 * @public
 */
@Component('SoundComponent')
export class SoundComponent extends BaseComponent {
    private _isPlaying = false;

    /**
     * This readonly property aims to indicate if the sound is playing. In this first MVP
     * It is reset to false at any update and used only to trigger the sound at the next update
     * 
     * @readonly
     * @returns true if the sound is set to be played at the next update.
     */
    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    private _asset: Nullable<SoundAsset> = null;

    /**
     * The asset of the sound
     * 
     * @readonly
     * @returns {SoundAsset} if the sound is fonud and loaded
     * @returns {null} if the sound is not found or not loaded
     */
    @Optional(SoundAsset)
    public get asset(): Nullable<SoundAsset> {
        return this._asset;
    }

    private _filePath?: string;

    /**
     * Sets the path of the file to load. This will reset the asset and stop the sound if it was playing
     * 
     * @param path - the path of the file to load
     */
    public set filePath(path: string) {
        this._filePath = path;
        this._asset = null;
        this._isPlaying = false;
        this._isLoading = false;
    }

    /**
     * @returns the path of the file to load
     * @returns undefined if no path is set
     */
    @Optional(String)
    public get filePath(): string | undefined {
        return this._filePath;
    }


    /**
     * Indicates if the sound is loaded and ready to be played
     * 
     * @readonly
     * @returns true if the sound is loaded and ready to be played
     * @returns false if the sound is not loaded or not found
     */
    public get isLoaded(): boolean {
        return !!this.asset;
    }

    private _isLoading = false;

    /**
     * Indicates if the sound is currently loading
     * 
     * @readonly
     * @returns true if the sound is currently loading
     * @returns false if the sound is not loading or already loaded
     */
    public get isLoading(): boolean {
        return this._isLoading;
    }

    /**
     * @param filePath - Path of the file to load
     * @param soundLoader - The loader to use to load the assets
     */
    public constructor(
        props?: SoundComponentProps,
    ) {
        super();

        if (props?.filePath) this._filePath = props.filePath;
    }

    /**
     * Plays the sound if loaded and flagged for playing at the next update.
     * Flag is reset to false at the next update.
     */
    public update(): void {
        if (!!this._asset && this.isPlaying === true) {
            this._asset.play();
            this._isPlaying = false;
        }
    }

    /**
     * Flags the component as playing for the next update
     */
    public play(): void {
        this._isPlaying = true;
    }

    /**
     * Loads the sound asset using the given loader.
     * This method is implemented asynchronously so to not block the engine, as soon as the sound is loaded it will be played
     */
    public load(loader: SoundLoader): void {
        if (!this.filePath) return;

        this._isLoading = true;

        loader
            .load(this.filePath)
            .then(asset => {
                if (asset.media.src !== this._filePath) return;

                this._asset = asset;
                this._isLoading = false;
            });
    }

    public toJson(): WithType<SoundComponentProps> {
        return {
            ...super.toJson(),
            filePath: this.filePath
        };
    }
}