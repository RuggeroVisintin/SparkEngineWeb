import { ImageAsset } from "./ImageAsset";

export interface FileLocation {
    src: string
}

export interface ImageLoader { 
    load(fileLoaction: FileLocation): Promise<ImageAsset>;
}