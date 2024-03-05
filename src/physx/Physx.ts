import { Vec2 } from "../core";
import { AAABBResolver } from "./resolvers/aabbResolver";
import { AABB } from "./types";

/**
 * @category Physx
 */
export interface PhysicsObject {
    /**
     * The unique id of the object. Use it to identify with wich objects the collision is happening
     */
    uuid: string;

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

/**
 * @category Physx
 */
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

/**
 * @category Physx
 */
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

/**
 * @category Physx
 */
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
                if (idx === otherIdx) return;

                const postSimulationObject = this.checkCollision(physicalObject.object, otherPhysicalObject.object);

                if (postSimulationObject) {
                    physicalObject.onCollisionCallback({
                        otherObject: otherPhysicalObject.object,
                        postSimulation: postSimulationObject
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
        // TODO: implement swept AABB
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xv1 = x1 + objectA.velocity.x;
        const yv1 = y1 + objectA.velocity.y;
        const xv2 = x2 + objectB.velocity.x;
        const yv2 = y2 + objectB.velocity.y;

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;

        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        const result: PhysicsObject = {
            uuid: objectA.uuid,
            aabb: [...objectA.aabb],
            velocity: objectA.velocity
        }

        // if(new AAABBResolver().resolve(objectA.aabb, objectB.aabb)) {}

        // normal collision detection
        // TODO: this one has an issue with clipping
        if(new AAABBResolver().resolve(objectA.aabb, objectB.aabb)) {
            const overlapX = Math.min(xw1, xw2) - Math.max(x1, x2);
            const overlapY = Math.min(yh1, yh2) - Math.max(y1, y2);

            if (overlapX < overlapY) {
                if (x1 < x2) {
                    const collisionCount = xw1 - x2;
                    result.aabb[0] = x1 - (collisionCount % objectA.velocity.x || collisionCount);
                    result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                    result.velocity.reflect(Vec2.LEFT);
                } else {
                    const collisionCount = xw2 - x1;
                    result.aabb[0] = x1 + (collisionCount % objectA.velocity.x || collisionCount);
                    result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                    result.velocity.reflect(Vec2.RIGHT);
                }
            } else {
                if (y1 < y2) {
                    const collisionCount = yh1 - y2;
                    result.aabb[1] = y1 - (collisionCount % objectA.velocity.y || collisionCount);
                    result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                    result.velocity.reflect(Vec2.UP);
                } else {
                    const collisionCount = yh2 - y1;
                    result.aabb[1] = y1 + (collisionCount % objectA.velocity.y || collisionCount);
                    result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                    result.velocity.reflect(Vec2.DOWN);
                }
            }

            return result;
        }

        return null;
    }

    private checkCollisionContainer(container: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        const [x1, y1, w1, h1] = container.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xv1 = x1 + container.velocity.x;
        const yv1 = y1 + container.velocity.y;
        const xv2 = x2 + objectB.velocity.x;
        const yv2 = y2 + objectB.velocity.y;

        const xw1 = xv1 + w1;
        const yh1 = yv1 + h1;
        const xw2 = xv2 + w2;
        const yh2 = yv2 + h2;

        const result: PhysicsObject = {
            uuid: objectB.uuid,
            aabb: [...objectB.aabb],
            velocity: new Vec2()
        }

        if (xw2 > xw1 || 
            yh2 > yh1 || 
            xv2 < xv1 ||
            yv2 < yv1
        ) {

            const bottomCollisionCount = yh2 - yh1;
            const topCollisionCount = yv1 - yv2;
            const leftCollisionCount = xv1 - xv2;
            const rightCollisionCount = xw2 - xw1;

            if (rightCollisionCount > 0 && rightCollisionCount > topCollisionCount && rightCollisionCount > bottomCollisionCount) {
                result.aabb[0] = x2 - (rightCollisionCount % objectB.velocity.x);
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
            } else if (leftCollisionCount > 0 && leftCollisionCount > topCollisionCount && leftCollisionCount > bottomCollisionCount) {
                result.aabb[0] = x1 - (objectB.velocity.x % leftCollisionCount);
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.RIGHT);
            } else if (topCollisionCount > 0 && topCollisionCount > leftCollisionCount && topCollisionCount > rightCollisionCount) {
                result.aabb[1] = y1 + (topCollisionCount % objectB.velocity.y);
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.DOWN);
            } else if (bottomCollisionCount > 0 && bottomCollisionCount > leftCollisionCount && bottomCollisionCount > rightCollisionCount) {      
                result.aabb[1] = y2 - (objectB.velocity.y - bottomCollisionCount);
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.UP);
            }

            return result;
        }
        

        return null;
    }
}