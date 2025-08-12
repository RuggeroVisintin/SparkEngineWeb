/**
 * @category Core
 * 
 * @todo Convert to a AABB Class
 */
export type AABB = [number, number, number, number];

/**
 * @category Core
 */
export function isCollision(objectA: AABB, objectB: AABB): boolean {
    const [x1, y1, w1, h1] = objectA;
    const [x2, y2, w2, h2] = objectB;

    const xw1 = x1 + w1;
    const yh1 = y1 + h1;

    const xw2 = x2 + w2;
    const yh2 = y2 + h2;

    return x1 < xw2 && xw1 > x2 && y1 < yh2 && yh1 > y2;
}