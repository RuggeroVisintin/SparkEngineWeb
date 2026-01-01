import { Optional } from '../../../src/core/optional';

export class InvalidGetterType {
    @Optional(Number)
    public get name(): string | undefined {
        return '';
    }
}
