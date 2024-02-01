import { Type } from "../../core";
import { Nullable } from "../../core/types";
import { SoundAsset, SoundLoader } from "../../platform";
import { BaseComponent } from "./BaseComponent";

@Type('SoundComponent')
export class SoundComponent extends BaseComponent {
    private _isPlaying = false;

    public get isPlaying(): boolean {
        return this.isPlaying;
    }

    private _asset: Nullable<SoundAsset> = null;
    
    public get asset(): Nullable<SoundAsset> {
        return this._asset;
    }

    public constructor(
        public readonly filePath: string,
        private readonly soundLoader: SoundLoader
    ) { 
        super();
    }

    public update(): void {
        // TODO: Implement
    }

    public play(): void {
        // TODO: Implement
    }

    public load(): void {
        this.soundLoader
            .load(this.filePath)
            .then(asset => {
                this._asset = asset;
            });
        // TODO: stream sound in the background and set ready true when loaded
    }
}