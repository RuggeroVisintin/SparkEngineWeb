import { AnimationComponent } from "../components/AnimationComponent";
import { BaseSystem } from "./BaseSystem";

export class AnimationSystem extends BaseSystem<AnimationComponent> {
    protected _internalUpdate(deltaTime: number): void {
        this.components.forEach(component => component.isPlaying && component.update(deltaTime));
    }
}