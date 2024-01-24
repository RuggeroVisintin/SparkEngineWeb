import { Vec2 } from "../core";

export type AABB = [number, number, number, number];

export interface PhysicsObject {
    // x, y, w, h
    aabb: AABB;

    /**
     * The velocity of a physics object
     */
    velocity: Vec2;

    /**
     * Set to true if the PhysicsObject should act as a container for other objects to not escape from
     * 
     * @default false
     */
    isContainer?: boolean;
}

export interface onCollisionCallbackParams {
    otherObject: PhysicsObject;
    simulationResult: {
        velocity: Vec2
    }
    // collisionPlane: Vec2;
}

export interface PhysicalObjectCallbackAggregate {
    /**
     * The object to push in the Physical World
     */
    object: PhysicsObject;
    /**
     * Callback to invoke when a collision is detected
     * 
     * @param postSimulation 
     * @returns 
     */
    onCollisionCallback: (other: PhysicsObject) => void;
}

export class Physx {
    private _physicalWorld: PhysicalObjectCallbackAggregate[] = [];

    public get physicalWorld(): PhysicalObjectCallbackAggregate[] {
        return this._physicalWorld;
    }

    public pushPhysicalObject(object: PhysicalObjectCallbackAggregate): void {
        this._physicalWorld.push(object);
    }

    public simulate(): void {
        this.physicalWorld.forEach((physicalObject, idx) => {
            this.physicalWorld.forEach((otherPhysicalObject, otherIdx) => {
                if (idx !== otherIdx && this.checkCollision(physicalObject.object, otherPhysicalObject.object)) {
                    physicalObject.onCollisionCallback(otherPhysicalObject.object);
                };
            })
        });

        this._physicalWorld = [];
    }

    private checkCollision(objectA: PhysicsObject, objectB: PhysicsObject): Vec2 | null {
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        if (objectA.isContainer) {
            return this.checkCollisionContainer(objectA, objectB);
        } else if (objectB.isContainer) {
            return this.checkCollisionContainer(objectB, objectA);
        }

        // normal collision detection
        if (
            x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2
        ) {
            return new Vec2();
        }

        return null;
    }

    private checkCollisionContainer(container: PhysicsObject, objectB: PhysicsObject): Vec2 | null {
        const [x1, y1, w1, h1] = container.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        if (x2 + w2 > x1 + w1) {
            return new Vec2();
        }

        if (y2 + h2 > y1 + h1) {
            return new Vec2();
        }

        if(x2 < x1) {
            return new Vec2();
        }

        if (y2 < y1) {
            return new Vec2();
        }
        
        return null;
    }
}