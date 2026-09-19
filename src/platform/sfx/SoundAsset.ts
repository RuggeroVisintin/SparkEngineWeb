import { v4 as uuid } from 'uuid';

/**
 * @category Platform
 */
export class SoundAsset {
    /**
     * The unique identifier of the asset, use this identifier to reference the asset in the game bundle
     */
    public readonly id: string = uuid();

    constructor(
        /**
         * @internal - This is meant for engine internal use only
         */
        public readonly media: HTMLAudioElement
    ) {
    }

    // TODO: need to introduce a SoundPlayer class to manage playing sounds and leave the asset as a simple data structure
    public play(): void {
        this.media.currentTime = 0;
        this.media.play();
    }
}