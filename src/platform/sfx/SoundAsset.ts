import { GameAsset } from '../assets/GameAsset';

/**
 * @category Platform
 */
export class SoundAsset extends GameAsset {
    constructor(
        /**
         * @internal - This is meant for engine internal use only
         */
        public readonly media: HTMLAudioElement
    ) {
        super();
    }

    // TODO: need to introduce a SoundPlayer class to manage playing sounds and leave the asset as a simple data structure
    public play(): void {
        this.media.currentTime = 0;
        this.media.play();
    }
}