import { SoundComponent } from "../components";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class SoundSystem extends BaseSystem<SoundComponent> implements ISystem {
    protected internalUpdate(): void {
        this.components.forEach(soundComponent => soundComponent.update());
    }
}