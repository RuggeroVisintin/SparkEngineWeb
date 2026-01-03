import { Enum } from '../../../../src/core/Enum';

describe('Enum - String', () => {
  /**
 * Test enum for testing purposes
 */
  class TestEnum extends Enum<string> {
    static readonly Option1 = new TestEnum('option1');
    static readonly Option2 = new TestEnum('option2');
    static readonly Option3 = new TestEnum('option3');

    static getValues(): TestEnum[] {
      return [this.Option1, this.Option2, this.Option3];
    }
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
});
