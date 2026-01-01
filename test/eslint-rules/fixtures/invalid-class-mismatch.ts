import { Optional } from '../../../src/core/optional';
import { Rgb } from '../../../src/core/rgb';
import { ImageAsset } from '../../../src/platform/gfx/ImageAsset';

export class InvalidClassMismatch {
    @Optional(ImageAsset)
    public color?: Rgb;
}
