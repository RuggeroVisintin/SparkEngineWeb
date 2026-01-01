import { Optional } from '../../../src/core/optional';

export class InvalidNumberOnString {
    @Optional(Number)
    public name?: string;
}
