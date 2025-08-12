import { Vec2 } from "../../core";
import { PhysicsObject } from "../Physx";

/** @internal */
export class AAABBCollisionResolver {
    test(objectA: PhysicsObject, objectB: PhysicsObject): boolean {
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;

        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        return x1 < xw2 && xw1 > x2 && y1 < yh2 && yh1 > y2;
    }

    resolve(objectA: PhysicsObject, objectB: PhysicsObject) {
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        const result: PhysicsObject = {
            uuid: objectA.uuid,
            aabb: [...objectA.aabb],
            velocity: objectA.velocity
        }

        const xw1 = x1 + w1;
        const yh1 = y1 + h1;

        const xw2 = x2 + w2;
        const yh2 = y2 + h2;

        const overlapX = Math.min(xw1, xw2) - Math.max(x1, x2);
        const overlapY = Math.min(yh1, yh2) - Math.max(y1, y2);

        const rebound = objectA.rebound ?? 1;

        if (overlapX < overlapY) {
            if (x1 < x2) {
                result.aabb[0] = x1 - overlapX;
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.LEFT);
                result.velocity.multiply(rebound);
            } else {
                result.aabb[0] = x1 + overlapX;
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.RIGHT);
                result.velocity.multiply(rebound);
            }
        } else {
            if (y1 < y2) {
                result.aabb[1] = y1 - overlapY;
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.UP);
                result.velocity.multiply(rebound);
            } else {
                result.aabb[1] = y1 + overlapY;
                result.velocity = new Vec2(result.velocity.x, result.velocity.y);
                result.velocity.reflect(Vec2.DOWN);
                result.velocity.multiply(rebound);
            }
        }

        return result;
    }
}