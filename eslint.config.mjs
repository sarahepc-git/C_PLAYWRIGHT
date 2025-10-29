import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores:[
      "node_modules/**",
      "dist/**",
      "reports/**",
      "artifacts/**",
      "eslint.config.mjs"
    ]},
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { 
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
  },
    rules:{
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  eslintConfigPrettier,
]);
