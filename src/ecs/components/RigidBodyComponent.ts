import { Type } from "../../core";
import { PhysicsObject } from "../../physx";
import { BoundingBoxComponent } from "./BoundingBoxComponent";

/**
 * @category Components
 */
@Type('RigidBodyComponent')
export class RigidBodyComponent extends BoundingBoxComponent {
    public rebound: number = 1;

    protected mapPhysicalObject(): PhysicsObject {
        return {
            ...super.mapPhysicalObject(),
            rebound: this.rebound,
        }
    }
}