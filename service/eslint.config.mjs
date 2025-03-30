import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.ts"]},
  {languageOptions: { globals: globals.node }},
  {ignores: ["node_modules/", "jest.config.js", "build/"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
