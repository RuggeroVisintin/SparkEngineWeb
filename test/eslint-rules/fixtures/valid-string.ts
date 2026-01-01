import { Optional } from '../../../src/core/optional';

export class ValidStringUsage {
    @Optional(String)
    public name?: string;
}
