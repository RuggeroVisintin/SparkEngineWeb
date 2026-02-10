import { Enum } from '../../../../src/core/Enum';

describe('Enum - String', () => {
  /**
 * Test enum for testing purposes
 */
  class TestEnum extends Enum<string> {
    static readonly Option1 = new TestEnum('option1');
    static readonly Option2 = new TestEnum('option2');
    static readonly Option3 = new TestEnum('option3');
  }

  it('Should allow to read value', () => {
    const enumInstance = TestEnum.Option1;
    expect(enumInstance.value).toBe('option1');
  });

  it('Should provide all available enum values', () => {
    const values = TestEnum.getValues();

    expect(values).toHaveLength(3);
    expect(values).toContain(TestEnum.Option1);
    expect(values).toContain(TestEnum.Option2);
    expect(values).toContain(TestEnum.Option3);
  });

  it('Should return enum instances in consistent order', () => {
    const values1 = TestEnum.getValues();
    const values2 = TestEnum.getValues();
    expect(values1).toEqual(values2);
  });

  it('Should support instanceof checks', () => {
    expect(TestEnum.Option1 instanceof TestEnum).toBe(true);
    expect(TestEnum.Option2 instanceof Enum).toBe(true);
    expect(TestEnum.Option3 instanceof Enum).toBe(true);
  });

  it('Should correctly convert to string', () => {
    const enumInstance = TestEnum.Option2;
    expect(enumInstance.toString()).toBe('option2');
  });

  it('Should correctly convert to JSON', () => {
    const enumInstance = TestEnum.Option3;
    expect(enumInstance.toJSON()).toBe('option3');
  });
});

describe('Enum - Number', () => {
  class AutoEnum extends Enum {
    static readonly First = new AutoEnum();
    static readonly Second = new AutoEnum();
    static readonly Third = new AutoEnum();
  }

  class OtherAutoEnum extends Enum {
    static readonly Alpha = new OtherAutoEnum();
    static readonly Beta = new OtherAutoEnum();
  }

  it('Should auto-increment when value is omitted', () => {
    expect(AutoEnum.First.value).toBe(0);
    expect(AutoEnum.Second.value).toBe(1);
    expect(AutoEnum.Third.value).toBe(2);
  });

  it('Should not share auto-increment counters across subclasses', () => {
    expect(OtherAutoEnum.Alpha.value).toBe(0);
    expect(OtherAutoEnum.Beta.value).toBe(1);
  });
});
