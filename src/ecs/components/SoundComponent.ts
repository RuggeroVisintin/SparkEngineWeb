import { Type } from "../../core";
import { Nullable } from "../../core/types";
import { SoundAsset, SoundLoader } from "../../platform";
import { BaseComponent } from "./BaseComponent";

/**
 * A sound components represent a sound that can be played
 * 
 * @category Components
 */
@Type('SoundComponent')
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
    public get asset(): Nullable<SoundAsset> {
        return this._asset;
    }

    /**
     * @param filePath - Path of the file to load
     * @param soundLoader - The loader to use to load the assets
     */
    public constructor(
        public readonly filePath: string,
        private readonly soundLoader: SoundLoader
    ) { 
        super();
    }

    /**
     * Plays the sound if loaded and flagged for playing at the next update.
     * Flag is reset to false at the next update.
     */
    public update(): void {
        if(!!this._asset && this.isPlaying === true) {
            this._asset.play();
        }

        this._isPlaying = false;
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
    public load(): void {
        this.soundLoader
            .load(this.filePath)
            .then(asset => {
                this._asset = asset;
            });
    }
}