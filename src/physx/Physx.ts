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
     * A container is always consider as a static entity at the moment, i.e. its movement will be not taken into account
     * in the physx math and could case janky results
     * 
     * @default false
     */
    isContainer?: boolean;
}

export interface OnCollisionCallbackParams {
    otherObject: PhysicsObject;

    /**
     * An object conatining the post simulation result
     * 
     * @property velocity - the new Velocity of the object after the collision assuming the object is in a vacuum
     * @property position - the new Position of the object after the collision
     */
    postSimulation: PhysicsObject;
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
                        postSimulation: simulationResult
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
            // TODO: this method is much more precise but does not take into account objectB velocity yet
            if (objectA.velocity.x > 0 && xw1 - objectA.velocity.x <= x2 && (yh1 - objectA.velocity.y > y2 || y1 + objectA.velocity.y > yh2)) {
                const collisionCount = xw1 - x2;
                result.aabb = [x1 - collisionCount, y1, w1, h1];

                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
            } else if (objectA.velocity.x < 0 && x1 + objectA.velocity.x <= xw2 && (yh1 - objectA.velocity.y > y2 || y1 + objectA.velocity.y > yh2)) {
                const collisionCount = xw2 - x1;
                result.aabb = [x1 + collisionCount, y1, w1, h1];
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                
                result.velocity.reflect(Vec2.RIGHT);
            } else if (objectA.velocity.y > 0 && yh1 - objectA.velocity.y <= y2 && (xw1 - objectA.velocity.x > x2 || x1 + objectA.velocity.x > xw2)) {
                const collisionCount = yh1 - y2;
                result.aabb = [x1, y1 - collisionCount, w1, h1];
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);

                result.velocity.reflect(Vec2.DOWN);
            } else if (objectA.velocity.y < 0 && y1 + objectA.velocity.y <= yh2 && (xw1 - objectA.velocity.x > x2 || x1 + objectA.velocity.x > xw2)) {
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

        const result: PhysicsObject = {
            ...objectB,
            velocity: new Vec2()
        }

        if (xw2 > xw1 || 
            yh2 > yh1 || 
            x2 < x1 ||
            y2 < y1
        ) {

            const topCollisionCount = yh2 - yh1;
            const bottomCollisionCount = y1 - y2;
            const leftCollisionCount = x1 - x2;
            const rightCollisionCount = xw2 - xw1;

            if(rightCollisionCount > 0 && rightCollisionCount > topCollisionCount && rightCollisionCount > bottomCollisionCount) {
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
            } else if (leftCollisionCount > 0 && leftCollisionCount > topCollisionCount && leftCollisionCount > bottomCollisionCount) {
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.RIGHT);
            } else if (topCollisionCount > 0 && topCollisionCount > leftCollisionCount && topCollisionCount > rightCollisionCount) {
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.DOWN);
            } else if (bottomCollisionCount > 0 && bottomCollisionCount > leftCollisionCount && bottomCollisionCount > rightCollisionCount) {                
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.UP);
            }

            return result;
        }
        

        return null;
    }
}