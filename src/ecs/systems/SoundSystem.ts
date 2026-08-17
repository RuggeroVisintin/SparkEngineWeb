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
        this.components.forEach(soundComponent => {
            if (!soundComponent.isLoading && !soundComponent.isLoaded) {
                soundComponent.load(this.soundLoader);
            }

            soundComponent.update()
        });
    }
}