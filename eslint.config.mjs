import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jestExtended from "eslint-plugin-jest-extended";
import tsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import noReadonlyInComponents from "./eslint-rules/no-readonly-in-components.js";
import requireOptionalDecorator from "./eslint-rules/require-optional-decorator-on-component-optional-properties.js";
import optionalDecoratorTypeConsistency from "./eslint-rules/optional-decorator-type-consistency.js";

export default defineConfig([{
    files: ["src/**/*.ts"],
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "jest-extended": jestExtended,
        tsdoc,
        "no-readonly-in-components": { rules: { "no-readonly": noReadonlyInComponents } },
        "require-optional-decorator": { rules: { "require-optional": requireOptionalDecorator } },
        "optional-decorator-type-consistency": { rules: { "type-consistency": optionalDecoratorTypeConsistency } },
    },
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        camelcase: "error",
        "default-case-last": "error",
        curly: ["error", "multi-line"],
        "default-param-last": "error",
        eqeqeq: "error",
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-readonly-in-components/no-readonly": "error",
        "require-optional-decorator/require-optional": "error",
        "optional-decorator-type-consistency/type-consistency": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "classProperty",
                modifiers: ["private"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            },
            {
                selector: "classProperty",
                modifiers: ["protected"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            },
            {
                selector: "classProperty",
                modifiers: ["public"],
                format: ["camelCase"],
                leadingUnderscore: "forbid",
            },
        ],
    },
}]);