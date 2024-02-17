/**
 * @category Platform
 */
export class SoundAsset {
    constructor(
        public readonly media: HTMLAudioElement
    ) {
    }

    public play(): void {
        this.media.currentTime = 0;
        this.media.play();
    }
}