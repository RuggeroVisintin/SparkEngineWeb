import { GameObject } from "../../../../src"

describe('ecs/entities/GameObject', () => {
    let gameObject: GameObject;

    beforeEach(() => {
        gameObject = new GameObject();
    })

    describe('.constructor()', () => {
        it('Should have a transform by default', () => {
            expect(gameObject.transform).toBeDefined();
        });

        it('Should register the transform to the entity', () => {
            expect(gameObject.transform.getContainer()).toBe(gameObject);
        })

        it('Should have a material by default', () => {
            expect(gameObject.material).toBeDefined();
        })

        it('Should register the transform to the entity', () => {
            expect(gameObject.material.getContainer()).toBe(gameObject);
        })

        it('Should have a shape by default', () => {
            expect(gameObject.shape).toBeDefined();
        })

        it('Should register the transform to the entity', () => {
            expect(gameObject.shape.getContainer()).toBe(gameObject);
        })
    })
})