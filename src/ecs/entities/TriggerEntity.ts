import { TriggerComponent, TriggerComponentProps } from "../components";
import { RegisterUnique, Type, typeOf } from "../../core";
import { GameObject, GameObjectProps } from ".";

const ENTITY_TYPE = 'TriggerEntity';

/**
 * @category Entities
 */
export interface TriggerEntityProps extends GameObjectProps {
    trigger?: TriggerComponentProps;
}

/**
 * Use this Entity to detect collisions with another target entity and implement a custom logic
 * 
 * @todo This entity does not support target serialization, please follow https://github.com/RuggeroVisintin/SparkEngineWeb/issues/366 
 * @category Entities
 */
@Type(ENTITY_TYPE)
@RegisterUnique(ENTITY_TYPE)
export class TriggerEntity extends GameObject {
    public get trigger(): TriggerComponent {
        return this.getComponent<TriggerComponent>(typeOf(TriggerComponent))!;
    }

    public set trigger(triggerComponent: TriggerComponent) {
        this.addComponent(triggerComponent);
    }

    public constructor(props?: TriggerEntityProps) {
        super(props);

        if (!this.trigger) {
            this.trigger = new TriggerComponent(props?.trigger);
        }
    }
}