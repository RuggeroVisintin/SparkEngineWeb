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

enum CollisionQuadrant {
    TopLeft,
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

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;
        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        let result: Vec2 | null = null;
        let collisionQuadrant: CollisionQuadrant | null = null;

        // another way might be to find the center of mass of each object and get the normal based on the 
        // position of the objectB related to the center of mass of the container 
        const containerCenterOfMass = new Vec2(x1 + w1 / 2, y1 + h1 / 2);
        const objectBCenterOfMass = new Vec2(x2 + w2 / 2, y2 + h2 / 2);

        if (containerCenterOfMass.x <= objectBCenterOfMass.x && containerCenterOfMass.y <= objectBCenterOfMass.y) {
            collisionQuadrant = CollisionQuadrant.TopRight;
        } else if (objectBCenterOfMass.x < containerCenterOfMass.x && containerCenterOfMass.y <= objectBCenterOfMass.y) {
            collisionQuadrant = CollisionQuadrant.TopLeft;
        } else if(containerCenterOfMass.x <= objectBCenterOfMass.x && objectBCenterOfMass.y < containerCenterOfMass.y) {
            collisionQuadrant = CollisionQuadrant.BottomRight;
        } else {
            collisionQuadrant = CollisionQuadrant.BottomLeft;
        }
        
        if (collisionQuadrant === CollisionQuadrant.TopRight && (xw2 > xw1 || yh2 > yh1)) {
            // if xw2 - xw1 < yh2 - yh1 - the smaller negative number wins as it's the one with the greatest collision area
            // normal is a vector facing left
            // else is a vector facing down
            // new velocity is the reflection of the object original velocity related to the normal
            
            result = Vec2.from(objectB.velocity);

            if (xw2 - xw1 < yh2 - yh1) {
                result.reflect(Vec2.LEFT);
            } else {
                result.reflect(Vec2.DOWN);
            }
        } else if (collisionQuadrant === CollisionQuadrant.BottomRight && (xw2 > xw1 || y2 < y1)) {
            // if xw2 - xw1 < y2 - y1
            // normal is a vector facing left
            // else a vector facing up
            // new velocity is the reflection of the object original velocity related to the normal
            
            result = Vec2.from(objectB.velocity);

            if (xw2 - xw1 < y2 - y1) {
                result.reflect(Vec2.LEFT);
            } else {
                result.reflect(Vec2.UP);
            }
        } else if (collisionQuadrant === CollisionQuadrant.BottomLeft && (x2 < x1 || y2 < y1)) {
            // if x2 - x1 > y2 - y1 - on the left the bigger positive number wins
            // normal is a vector facing right
            // else a vector facing up
            // new velocity is the reflection of the object original velocity related to the normal
            
            result = Vec2.from(objectB.velocity);

            if (x2 - x1 > y2 - y1) {
                result.reflect(Vec2.RIGHT);
            } else {
                result.reflect(Vec2.UP);
            }
        } else if (collisionQuadrant === CollisionQuadrant.TopLeft && (x2 < x1 || yh2 > yh1)) {
            // if x2 - x1 > yh2 - yh1 - on the left the bigger positive number wins
            // normal is a vector facing right
            // else a vector facing down
            // new velocity is the reflection of the object original velocity related to the normal
            
            result = Vec2.from(objectB.velocity);

            if (x2 - x1 > yh2 - yh1) {
                result.reflect(Vec2.RIGHT);
            } else {
                result.reflect(Vec2.DOWN);
            }
        }
        
        return result;
    }
}