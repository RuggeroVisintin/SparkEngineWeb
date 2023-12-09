export interface PhysicsObject {
    // x, y, w, h
    aabb: [number, number, number, number];
}

export class Physx {
    public readonly physicsObjects: PhysicsObject[] = [];

    public pushPhysicalObject(object: PhysicsObject): void {
        this.physicsObjects.push(object);
    }
}