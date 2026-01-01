import { Optional } from '../../../src/core/optional';
import { Rgb } from '../../../src/core/rgb';

export class ValidClassUsage {
    @Optional(Rgb)
    public color?: Rgb;
}
