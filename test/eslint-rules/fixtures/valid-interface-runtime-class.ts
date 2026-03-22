import { Optional } from '../../../src/core/optional';

interface IEntity {
    uuid: string;
}

class BaseEntity implements IEntity {
    public uuid = 'entity-id';
}

export class ValidInterfaceRuntimeClassUsage {
    @Optional(BaseEntity)
    public target?: IEntity;
}