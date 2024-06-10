import { Physx } from "../../physx";
import { ICollidableComponent } from "../components";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class PhysicsSystem extends BaseSystem<ICollidableComponent> implements ISystem {
    // For now we will use a basic linear search
    // In the future we need to switch to more efficient algorithms like AABBTree
    public readonly components: ICollidableComponent[] = [];

    constructor(
        private readonly physx: Physx
    ) { 
        super();
    }

    protected _internalUpdate(): void {
        this.components.forEach(component => component.update(this.physx));
    }
}