import { SoundAsset } from "./SoundAsset";

/**
 * @category Platform
 * @public
 */
export interface SoundLoader {
    /**
     * @param src - the source path of the asset file
     * @returns Promise<SoundAsset> - the loaded SoundAsset
     */
    load(src: string): Promise<SoundAsset>;
}