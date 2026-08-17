import { SoundAsset } from "./SoundAsset";
import { SoundLoader } from "./SoundLoader";

/**
 * Loads a SoundAsset from a given source path using the HTMLAudioElement.
 * 
 * @category Platform
 * 
 * @internal
 */
export class DOMSoundLoader implements SoundLoader {
    public async load(src: string): Promise<SoundAsset> {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.onerror = reject;
            audio.oncanplay = () => {
                resolve(new SoundAsset(audio));
            };
            audio.src = src;
            audio.load();
        });
    }
}