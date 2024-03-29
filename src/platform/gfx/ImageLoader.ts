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

            image.onload = async () => {
                resolve(new ImageAsset(
                    await createImageBitmap(image), 
                    this.getTypeFromFileName(src)
                ));
            };

            image.src = src;
        });
    }

    private getTypeFromFileName(fileName: string): string { 
        return fileName.split('.').pop() ?? '';
    }

    // TODO: get real type from header
    // See: https://gist.github.com/topalex/ad13f76150e0b36de3c4a3d5ba8dc63a
}