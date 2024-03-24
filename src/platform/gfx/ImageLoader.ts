import { ImageAsset } from "./ImageAsset";

/**
 * @category Platform
 * 
 * Loads a given image asset
 */
export class ImageLoader {
    public async load(src: string): Promise<ImageAsset> {
        return new Promise((resolve, reject) => {        
            const image = new Image();
            image.onerror = reject;
            image.onload = () => {
                resolve(new ImageAsset(image));
            };
            image.src = src;
        });
    }
}