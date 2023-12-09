export interface PhysicsObject {
    // x, y, w, h
    aabb: [number, number, number, number];
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
    onCollisionCallback: (postSimulation: PhysicsObject) => void;
}

export class Physx {
    public readonly physicalWorld: PhysicalObjectCallbackAggregate[] = [];

    public pushPhysicalObject(object: PhysicalObjectCallbackAggregate): void {
        this.physicalWorld.push(object);
    }

    public simulate(): void {
        this.physicalWorld.forEach((physicalObject, idx) => {
            this.physicalWorld.forEach((otherPhysicalObject, otherIdx) => {
                if (idx !== otherIdx && this.checkCollision(physicalObject.object, otherPhysicalObject.object)) {
                    physicalObject.onCollisionCallback(physicalObject.object);
                }
            })
        });
    }

    private checkCollision(objectA: PhysicsObject, objectB: PhysicsObject): boolean {
        const [x1, y1, w1, h1] = objectA.aabb;
        const [x2, y2, w2, h2] = objectB.aabb;

        if (
            x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2
        ) {
            return true;
        }

        return false;
    }
}