import { allOf, Type, typeOf, typesOf } from "../../../../src"

describe('core/decorators/Type', () => {
    @Type('TestClass', 'TestCategory')
    class TestClass {

    }
    @Type('InheritedTestClass')
    class InerithedTestClass extends TestClass {

    }

    it('Should allow to retrieve all registered types for a given category', () => {
        expect(allOf('TestCategory')).toEqual({ 'TestClass': TestClass });
    });

    describe('From string', () => {
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
    })

    describe('From class name', () => {
        it.each([[
            TestClass,
            'TestClass',
        ], [
            InerithedTestClass,
            'InheritedTestClass',
        ]])('Should track the type of the class', (classRef, expected) => {
            expect(typeOf(classRef)).toEqual(expected);
        })

        it('Should track the whole type chain of the class', () => {
            expect(typesOf(InerithedTestClass)).toEqual(['InheritedTestClass', 'TestClass']);
        })
    });


})