import { ImageAsset } from "./ImageAsset";

export interface ImageLoader { 
    load(src: string): Promise<ImageAsset>;
}