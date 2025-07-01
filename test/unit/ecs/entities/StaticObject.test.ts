import { BoundingBoxComponentProps, GameObject, StaticObject } from "../../../../src"

describe('ecs/entities/StaticObject', () => {
    let staticObject = new StaticObject();

    afterEach(() => {
       staticObject = new StaticObject();
    })

    describe('.constructor()', () => {
        it('Should extend GameObject class', () => {
            expect(staticObject).toBeInstanceOf(GameObject);
        });

        it('Should have a bounding box by default', () => {
            expect(staticObject.boundingBox).toEqual(expect.objectContaining({
                aabb: { x: 0, y: 0, width: 0, height: 0 },
            }));
        });

        it('Should register this entity as a container of its default components', () => {
            expect(staticObject.boundingBox.getContainer()).toBe(staticObject);
        });

        it('Should create a bounding box component with given configuration', () => {
            const bbConfig: BoundingBoxComponentProps = {
                aabb: {x: 10, y: 5, width: 10, height: 5},
                isContainer: true, 
                matchContainerTransform: false,
                onCollisionCb: () => {}
            }
            
            const staticObject = new StaticObject({
                boundingBox: bbConfig
            });

            expect(staticObject.boundingBox.aabb).toEqual(bbConfig.aabb);
            expect(staticObject.boundingBox.isContainer).toEqual(bbConfig.isContainer);
            expect(staticObject.boundingBox.matchContainerTransform).toEqual(bbConfig.matchContainerTransform);
        })
    })

    describe('.toJson()', () => {
        it('Should return a JSON representation of the entity', () => {
            expect(staticObject.toJson()).toEqual({
                __type: 'StaticObject',
                name: staticObject.name,
                components: expect.arrayContaining([
                    staticObject.transform.toJson(),
                    staticObject.material.toJson(),
                    staticObject.shape.toJson(),
                    staticObject.boundingBox.toJson()
                ]),
            });
        })
    })
})