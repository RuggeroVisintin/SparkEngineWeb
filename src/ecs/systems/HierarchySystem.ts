import { TransformComponent } from "../components";
import { ISystem } from "./ISystem";

export class HierarchySystem implements ISystem {
    public readonly world: TransformComponent[] = [];
    
    public registerComponent(component: TransformComponent): void {
        this.world.push(component);
    }

    public update(deltaTime?: number): void {
        this.world.forEach(component => {
            component.update();
        });
    }
}