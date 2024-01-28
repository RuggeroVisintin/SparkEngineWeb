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

export interface OnCollisionCallbackParams {
    otherObject: PhysicsObject;
    simulationResult: PhysicsObject;
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
    onCollisionCallback: (params: OnCollisionCallbackParams) => void;
}

enum CollisionQuadrant {
    TopLeft = 1,
    TopRight,
    BottomLeft,
    BottomRight
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
                const simulationResult = this.checkCollision(physicalObject.object, otherPhysicalObject.object);

                if (idx !== otherIdx && simulationResult) {
                    physicalObject.onCollisionCallback({
                        otherObject: otherPhysicalObject.object,
                        simulationResult
                    });
                };
            })
        });

        this._physicalWorld = [];
    }

    private checkCollision(objectA: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        if (objectA.isContainer) {
            return this.checkCollisionContainer(objectA, objectB);
        } else if (objectB.isContainer) {
            return this.checkCollisionContainer(objectB, objectA);
        }

        return this.checkCollisionClassic(objectA, objectB);
    }

    private checkCollisionClassic(objectA: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;

        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        const result: PhysicsObject = {
            ...objectA
        }

        // normal collision detection
        if (
            x1 < xw2 &&
            xw1 > x2 &&
            y1 < yh2 &&
            yh1 > y2
        ) {
            const absoluteVelocityX = Math.abs(objectA.velocity.x);
            const absoluteVelocityY = Math.abs(objectA.velocity.y);

            if (objectA.velocity.x > 0 && absoluteVelocityX > absoluteVelocityY) {
                const collisionCount = xw1 - x2;
                result.aabb = [x1 - collisionCount, y1, w1, h1];
                
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
            } else if (objectA.velocity.x < 0 && absoluteVelocityX > absoluteVelocityY) {
                const collisionCount = xw2 - x1;
                result.aabb = [x1 + collisionCount, y1, w1, h1];
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                
                result.velocity.reflect(Vec2.RIGHT);
            } else if (objectA.velocity.y > 0 && absoluteVelocityY > absoluteVelocityX) {
                const collisionCount = yh1 - y2;
                result.aabb = [x1, y1 - collisionCount, w1, h1];
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);

                result.velocity.reflect(Vec2.DOWN);
            } else if (objectA.velocity.y < 0 && absoluteVelocityY > absoluteVelocityX) {
                const collisionCount = yh2 - y1;
                result.aabb = [x1, y1 + collisionCount, w1, h1];

                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.UP);
            }  

            return result;
        }

        return null;
    }

    private checkCollisionContainer(container: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        const [x1, y1, w1, h1] = container.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;
        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        if (xw2 > xw1 || 
            yh2 > yh1 || 
            x2 < x1 ||
            y2 < y1
        ) {
            return objectB;
        }
        

        return null;
    }
}