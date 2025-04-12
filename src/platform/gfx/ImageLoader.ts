import { ImageAsset } from "./ImageAsset";

export interface ImageLoader { 
    /**
     * @param src - the source path of the asset file
     * @returns Promise<ImageAsset> - the loaded ImageAsset
     */
    load(src: string): Promise<ImageAsset>;
}