import { SoundComponent } from "../components";
import { ISystem } from "./ISystem";

export class SoundSystem implements ISystem {
    public readonly components: SoundComponent[] = [];

    public registerComponent(component: SoundComponent): void {
        this.components.push(component);
    }

    public update(): void {
        this.components.forEach(soundComponent => soundComponent.update());
    }
}