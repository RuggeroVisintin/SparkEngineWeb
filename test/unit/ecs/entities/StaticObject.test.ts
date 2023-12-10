import { BoundingBoxComponent, GameObject, StaticObject } from "../../../../src"

describe('ecs/entities/StaticObject', () => {
    let staticObject = new StaticObject();

    afterEach(() => {
       staticObject = new StaticObject();
    })

    describe('.constructor()', () => {
        it('Should extend GameObject class', () => {
            expect(staticObject).toBeInstanceOf(GameObject);
        })

        it('Should have a bounding box by default', () => {
            expect(staticObject.boundingBox).toEqual(expect.objectContaining({
                aabb: { x: 0, y: 0, width: 0, height: 0 },
            }));
        })
    })
})