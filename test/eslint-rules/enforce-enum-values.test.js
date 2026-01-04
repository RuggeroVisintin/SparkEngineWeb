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
        // ✅ Class-based enums are allowed
        {
            code: `
                class BlendMethod {
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
        }
    ]
});
