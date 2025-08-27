/**
 * @category Core
 * @todo Convert to a AABB Class
 */
export type AABB = [number, number, number, number];

/**
 * Checks if two AABBs are colliding, including empty AABBs (zero width and height).
 * 
 * @category Core
 * @return true if two AABBs are colliding
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

/**
 * Converts a centered AABB to a top-left AABB.
 * 
 * @category Core
 * @param aabb - the centered AABB to convert
 * @returns - a new top-left AABB
 */
export function toTopLeftAABB(aabb: AABB): AABB {
    const [x, y, width, height] = aabb;
    return [x - width / 2, y - height / 2, width, height];
}

/**
 * Converts a top-left AABB to a centered AABB.
 * 
 * @category Core
 * @param aabb - the top-left AABB to convert
 * @returns - a new centered AABB
 */
export function toCenteredAABB(aabb: AABB): AABB {
    const [x, y, width, height] = aabb;
    return [x + width / 2, y + height / 2, width, height];
}