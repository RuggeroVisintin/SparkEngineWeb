import { allOf, Type, typeOf, typesOf } from "../../../../src"

describe('core/decorators/Type', () => {
    @Type('TestClass', 'TestCategory')
    class TestClass {

    }

    @Type('InheritedTestClass')
    class InerithedTestClass extends TestClass {

    }

    it.each([[
        'TestClass',
        new TestClass(),
    ], [
        'InheritedTestClass',
        new InerithedTestClass(),
    ]])('Should track the type of the class', (expected, classInstance) => {
        expect(typeOf(classInstance)).toEqual(expected);
    })

    it('Should track the whole type chain of the class', () => {
        expect(typesOf(new InerithedTestClass())).toEqual(['InheritedTestClass', 'TestClass']);
    })

    it('Should allow to retrieve all registered types for a given class', () => {
        expect(allOf('TestCategory')).toEqual({ 'TestClass': TestClass });
    });
})