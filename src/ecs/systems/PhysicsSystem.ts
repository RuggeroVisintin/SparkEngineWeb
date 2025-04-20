import { Physx } from "../../physx";
import { ICollidableComponent } from "../components";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class PhysicsSystem extends BaseSystem<ICollidableComponent> implements ISystem {
    constructor(
        private readonly physx: Physx
    ) {
        super();
    }

    protected internalUpdate(): void {
        this.components.forEach(component => component.update(this.physx));
    }
}