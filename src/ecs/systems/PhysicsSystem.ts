import { ICollidableComponent } from "../components";
import { ISystem } from "./ISystem";

export class PhysicsSystem implements ISystem {
    // For now we will use a basic linear search
    // In the future we need to switch to more efficient algorithms like AABBTree
    public readonly components: ICollidableComponent[] = [];

    registerComponent(component: ICollidableComponent): void {
        throw new Error("Method not implemented.");
    }

    update(): void {
        // register the position of all the elements into the physx engine

        // call simulateStep on every CollidableComponent
    }
}