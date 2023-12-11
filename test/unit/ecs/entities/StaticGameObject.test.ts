import { GameObject, StaticGameObject } from "../../../../src"

describe('ecs/entities/StaticGameObject', () => {
    let staticObject = new StaticGameObject();

    afterEach(() => {
       staticObject = new StaticGameObject();
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

        it('Should register this entity as a container of its default components', () => {
            expect(staticObject.boundingBox.getContainer()).toBe(staticObject);
        })
    })
})