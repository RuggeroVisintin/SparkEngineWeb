import { GameAsset } from "../assets/GameAsset";

/**
 * @category Platform
 */
export class ImageAsset extends GameAsset {
    constructor(
        public readonly media: ImageBitmap,
        public readonly type: string
    ) {
        super();
    }
}