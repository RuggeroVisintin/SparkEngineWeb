import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jestExtended from "eslint-plugin-jest-extended";
import tsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import noReadonlyInComponents from "./eslint-rules/no-readonly-in-components.js";

export default defineConfig([{
    files: ["**/*.ts"],
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "jest-extended": jestExtended,
        tsdoc,
        "no-readonly-in-components": { rules: { "no-readonly": noReadonlyInComponents } },
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "script",
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
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "classProperty",
                modifiers: ["private", "protected"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            },
            {
                selector: "classProperty",
                modifiers: ["public"],
                format: ["camelCase"],
                leadingUnderscore: "forbid",
            },
            {
                selector: "classMethod",
                modifiers: ["private", "protected"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            },
            {
                selector: "classMethod",
                modifiers: ["public"],
                format: ["camelCase"],
                leadingUnderscore: "forbid",
            },
        ],
    },
}]);