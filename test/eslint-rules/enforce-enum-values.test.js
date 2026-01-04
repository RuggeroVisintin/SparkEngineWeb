// Polyfill for structuredClone (required by ESLint internally)
if (typeof structuredClone === 'undefined') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

const { RuleTester } = require('eslint');
const rule = require('../../eslint-rules/enforce-enum-values');
const tsParser = require('@typescript-eslint/parser');

// Create RuleTester with flat config format for ESLint 9
const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module'
        },
    },
});

ruleTester.run('enforce-enum-values', rule, {
    valid: [
        // ✅ Class-based enums with static readonly are allowed
        {
            code: `
                class BlendMethod extends Enum {
                    static readonly Overwrite = new BlendMethod('source-over');
                    static readonly Add = new BlendMethod('lighter');
                }
            `,
        },
        // ✅ Regular classes are fine
        {
            code: `
                class MyClass {
                    name: string = 'test';
                    count: number = 42;
                }
            `,
        },
        // ✅ Enum subclass with both static readonly and instance properties
        {
            code: `
                class Status extends Enum {
                    static readonly Idle = new Status(0);
                    static readonly Running = new Status(1);
                    
                    value: number;
                    name: string = 'status';
                }
            `,
        },
        // ✅ Static properties in non-Enum classes don't need readonly
        {
            code: `
                class Helper {
                    static count = 0;
                    static getValue() { return 42; }
                }
            `,
        }
    ],

    invalid: [
        // ❌ TypeScript enum declarations are not allowed
        {
            code: `
                enum BlendMethod {
                    Overwrite = 'source-over',
                    Add = 'lighter'
                }
            `,
            errors: [{ messageId: 'noNativeEnum' }],
        },
        // ❌ Numeric enum also not allowed
        {
            code: `
                enum Status {
                    Idle = 0,
                    Running = 1
                }
            `,
            errors: [{ messageId: 'noNativeEnum' }],
        },
        // ❌ Enum subclass with static member missing readonly
        {
            code: `
                class BlendMethod extends Enum {
                    static Overwrite = new BlendMethod('source-over');
                    static readonly Add = new BlendMethod('lighter');
                }
            `,
            output: `
                class BlendMethod extends Enum {
                    static readonly Overwrite = new BlendMethod('source-over');
                    static readonly Add = new BlendMethod('lighter');
                }
            `,
            errors: [{ messageId: 'staticEnumMemberMustBeReadonly' }],
        },
        // ❌ Multiple enum members without readonly
        {
            code: `
                class Status extends Enum {
                    static Idle = new Status(0);
                    static Running = new Status(1);
                }
            `,
            output: `
                class Status extends Enum {
                    static readonly Idle = new Status(0);
                    static readonly Running = new Status(1);
                }
            `,
            errors: [
                { messageId: 'staticEnumMemberMustBeReadonly' },
                { messageId: 'staticEnumMemberMustBeReadonly' }
            ],
        }
    ]
});
