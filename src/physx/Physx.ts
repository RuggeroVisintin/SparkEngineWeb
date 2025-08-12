import { Vec2 } from "../core";
import { AAABBCollisionResolver } from "./resolvers/aabbResolver";
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

    /**
     * The rebound of the object when colliding with other objects
     * 
     * @default 1
     */
    rebound?: number;
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
    private readonly _resolver: AAABBCollisionResolver = new AAABBCollisionResolver();

    public get physicalWorld(): PhysicalObjectCallbackAggregate[] {
        return this._physicalWorld;
    }

    public pushPhysicalObject(object: PhysicalObjectCallbackAggregate): void {
        this._physicalWorld.push({
            ...object,
            object: this.copyPhysicsObject(object.object)
        });
    }

    public simulate(cycles = 2): void {
        let next: PhysicalObjectCallbackAggregate[] = [];

        for (let i = 0; i < cycles; i++) {
            this.physicalWorld.forEach((physicalObject) => {
                let postSimulation = undefined;

                this.physicalWorld.forEach((otherPhysicalObject) => {
                    if (physicalObject.object.uuid === otherPhysicalObject.object.uuid) return;

                    postSimulation = this.checkCollision(physicalObject.object, otherPhysicalObject.object);

                    if (postSimulation) {
                        physicalObject.onCollisionCallback({
                            otherObject: otherPhysicalObject.object,
                            postSimulation: postSimulation
                        });
                    };
                })

                next.push({
                    ...physicalObject,
                    object: this.copyPhysicsObject(postSimulation || physicalObject.object),
                })
            });

            this._physicalWorld = next;
            next = [];
        }

        this._physicalWorld = [];
    }

    private checkCollision(objectA: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        if (objectA.isContainer) {
            return this.checkCollisionContainer(objectA, objectB);
        } else if (objectB.isContainer) {
            return this.checkCollisionContainer(objectB, objectA);
        }

        return this._resolver.test(objectA, objectB) ? this._resolver.resolve(objectA, objectB) : null;
    }

    private checkCollisionContainer(container: PhysicsObject, objectB: PhysicsObject): PhysicsObject | null {
        const [x1, y1, w1, h1] = container.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;
        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        const result: PhysicsObject = {
            uuid: objectB.uuid,
            aabb: [...objectB.aabb],
            velocity: new Vec2()
        }

        if (xw2 > xw1 ||
            yh2 > yh1 ||
            x2 < x1 ||
            y2 < y1
        ) {
            const bottomCollisionCount = yh2 - yh1;
            const topCollisionCount = y1 - y2;
            const leftCollisionCount = x1 - x2;
            const rightCollisionCount = xw2 - xw1;

            if (rightCollisionCount > 0 && rightCollisionCount > topCollisionCount && rightCollisionCount > bottomCollisionCount) {
                result.aabb[0] = x2 - rightCollisionCount;
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
            } else if (leftCollisionCount > 0 && leftCollisionCount > topCollisionCount && leftCollisionCount > bottomCollisionCount) {
                result.aabb[0] = x2 + leftCollisionCount;
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.RIGHT);
            } else if (topCollisionCount > 0 && topCollisionCount > leftCollisionCount && topCollisionCount > rightCollisionCount) {
                result.aabb[1] = y2 + topCollisionCount;
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.DOWN);
            } else if (bottomCollisionCount > 0 && bottomCollisionCount > leftCollisionCount && bottomCollisionCount > rightCollisionCount) {
                result.aabb[1] = y2 - bottomCollisionCount;
                result.velocity = new Vec2(objectB.velocity.x, objectB.velocity.y);
                result.velocity.reflect(Vec2.UP);
            }

            return result;
        }


        return null;
    }

    private copyPhysicsObject(object: PhysicsObject): PhysicsObject {
        return {
            // Copy values due to javascript keeping the reference
            ...object,
            aabb: [...object.aabb],
            velocity: Vec2.from(object.velocity),
        }
    }
}