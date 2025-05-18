import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jestExtended from "eslint-plugin-jest-extended";
import tsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([{
    files: ["**/*.ts"],
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "jest-extended": jestExtended,
        tsdoc,
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
    },
}]);