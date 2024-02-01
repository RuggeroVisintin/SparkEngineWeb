import { SoundAsset } from "./SoundAsset";

export class SoundLoader {
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