import { TransformComponent } from "../components";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class HierarchySystem extends BaseSystem<TransformComponent> implements ISystem {    
    public update(deltaTime?: number): void {
        this.components.forEach(component => {
            component.update();
        });
    }
}