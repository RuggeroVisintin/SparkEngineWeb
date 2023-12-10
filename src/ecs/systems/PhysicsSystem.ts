import { Physx } from "../../physx";
import { ICollidableComponent } from "../components";
import { ISystem } from "./ISystem";

export class PhysicsSystem implements ISystem {
    // For now we will use a basic linear search
    // In the future we need to switch to more efficient algorithms like AABBTree
    public readonly components: ICollidableComponent[] = [];

    constructor(
        private readonly physx: Physx
    ) { }

    registerComponent(component: ICollidableComponent): void {
        this.components.push(component);
    }

    update(): void {
        this.components.forEach(component => component.update(this.physx));
    }
}