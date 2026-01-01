import { Optional } from '../../../src/core/optional';

export class InvalidStringOnNumber {
    @Optional(String)
    public count?: number;
}
