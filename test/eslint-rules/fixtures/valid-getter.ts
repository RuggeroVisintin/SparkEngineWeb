import { Optional } from '../../../src/core/optional';
import { Rgb } from '../../../src/core/rgb';

export class ValidGetterUsage {
    @Optional(Rgb)
    public get color(): Rgb | undefined {
        return undefined;
    }
}
