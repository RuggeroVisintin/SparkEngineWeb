import { Optional } from '../../../src/core/optional';

export class ValidNumberUsage {
    @Optional(Number)
    public count?: number;
}
