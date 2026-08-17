import { SoundLoader } from "../../platform";
import { SoundComponent } from "../components";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class SoundSystem extends BaseSystem<SoundComponent> implements ISystem {
    public constructor(
        protected readonly soundLoader: SoundLoader
    ) {
        super();
    }

    protected internalUpdate(): void {
        // TODO: should trigger loading the sound asset if not already loaded

        this.components.forEach(soundComponent => soundComponent.update());
    }
}