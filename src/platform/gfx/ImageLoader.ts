import { ImageAsset } from "./ImageAsset";

/**
 * @category Platform
 * 
 * Loads a given image asset
 */
export class ImageLoader {
    private _assetsCache: Record<string, ImageAsset> = {};

    public async load(src: string): Promise<ImageAsset> {
        if (this._assetsCache[src]) return this._assetsCache[src];

        return new Promise((resolve, reject) => {  
            const type = this.getTypeFromFileName(src);

            const image = new Image();
            image.onerror = reject;

            image.onload = async () => {
                this._assetsCache[src] = new ImageAsset(
                    await createImageBitmap(image), 
                    type
                );

                resolve(this._assetsCache[src]);
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