import { Optional } from '../../../src/core/optional';
import { Nullable } from '../../../src/core';

export class ValidNullableUsage {
    @Optional(String)
    public name: Nullable<string> = null;
}
