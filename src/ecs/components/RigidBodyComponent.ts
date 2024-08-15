import { Type, WithType } from "../../core";
import { PhysicsObject } from "../../physx";
import { BoundingBoxComponent, BoundingBoxComponentProps } from "./BoundingBoxComponent";

export interface RigidBodyComponentProps extends BoundingBoxComponentProps {
    rebound: number;
}

/**
 * @category Components
 */
@Type('RigidBodyComponent')
export class RigidBodyComponent extends BoundingBoxComponent {
    public rebound: number = 1;

    public toJson(): WithType<RigidBodyComponentProps> {
        return {
            ...super.toJson(),
            rebound: this.rebound,
        }
    }

    protected mapPhysicalObject(): PhysicsObject {
        return {
            ...super.mapPhysicalObject(),
            rebound: this.rebound,
        }
    }
}