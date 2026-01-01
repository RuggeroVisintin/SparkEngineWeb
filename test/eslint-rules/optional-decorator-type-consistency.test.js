// Polyfill for structuredClone if not available (Node < 17)
if (typeof structuredClone === 'undefined') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

const { RuleTester } = require('eslint');
const rule = require('../../eslint-rules/optional-decorator-type-consistency');
const tsParser = require('@typescript-eslint/parser');
const path = require('path');
const fs = require('fs');

// Helper to read fixture file
const readFixture = (filename) => {
    const filepath = path.resolve(__dirname, 'fixtures', filename);
    return {
        code: fs.readFileSync(filepath, 'utf8'),
        filename: filepath,
    };
};

// Create RuleTester with flat config format for ESLint 9
// Note: RuleTester.run() creates its own describe/it blocks, so we don't wrap it
const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            project: path.resolve(__dirname, 'tsconfig.json'),
        },
    },
});

ruleTester.run('optional-decorator-type-consistency', rule, {
    valid: [
        readFixture('valid-string.ts'),
        readFixture('valid-number.ts'),
        readFixture('valid-class.ts'),
        readFixture('valid-nullable.ts'),
        readFixture('valid-getter.ts'),
    ],
    invalid: [
        {
            ...readFixture('invalid-number-on-string.ts'),
            errors: [{ messageId: 'inconsistentType' }],
        },
        {
            ...readFixture('invalid-string-on-number.ts'),
            errors: [{ messageId: 'inconsistentType' }],
        },
        {
            ...readFixture('invalid-class-mismatch.ts'),
            errors: [{ messageId: 'inconsistentType' }],
        },
        {
            ...readFixture('invalid-getter-type.ts'),
            errors: [{ messageId: 'inconsistentType' }],
        },
    ],
});
