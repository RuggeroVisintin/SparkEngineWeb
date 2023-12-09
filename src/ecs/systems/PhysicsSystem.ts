import { BaseComponent } from "../components";
import { ISystem } from "./ISystem";

export class PhysicsSystem implements ISystem {
    // For now we will use a basic linear search
    // In the future we need to switch to more efficient algorithms like AABBTree
    public readonly components: BaseComponent[] = [];

    registerComponent(component: BaseComponent): void {
        throw new Error("Method not implemented.");
    }

    update(): void {
        
    }
}