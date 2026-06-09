// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import boundariesPlugin from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "build/**",
      "**/*.cjs",
      "src/vite-env.d.ts",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/main.tsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "unused-imports": unusedImportsPlugin,
      boundaries: boundariesPlugin,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          projectService: true,
        },
      },
      "boundaries/elements": [
        { mode: "full", type: "app", pattern: "src/app" },
        {
          mode: "full",
          type: "pages",
          pattern: "src/pages/*",
          capture: ["page"],
        },
        {
          mode: "full",
          type: "widgets",
          pattern: "src/widgets/*",
          capture: ["widget"],
        },
        {
          mode: "full",
          type: "features",
          pattern: "src/features/*",
          capture: ["feature"],
        },
        {
          mode: "full",
          type: "entities",
          pattern: "src/entities/*",
          capture: ["entity"],
        },
        {
          mode: "full",
          type: "shared",
          pattern: "src/shared/*",
          capture: ["segment"],
        },
      ],
    },

    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "enum", format: ["PascalCase"] },
      ],

      "react/jsx-curly-brace-presence": ["error", "never"],
      "react/jsx-no-useless-fragment": "error",
      "react/self-closing-comp": "error",
      "react/jsx-sort-props": [
        "error",
        { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
      ],
      "react/hook-use-state": "error",

      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "jsx-a11y/no-autofocus": "off",

      "import/no-default-export": "error",
      "import/no-cycle": ["error", { maxDepth: 2 }],
      "import/no-duplicates": "error",

      "simple-import-sort/imports": [
        "error",
        { groups: [["^react", "^@?\\w"], ["^@/"], ["^\\."], ["^.+\\.s?css$"]] },
      ],
      "simple-import-sort/exports": "error",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["pages", "shared"] },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
      "boundaries/no-unknown": "error",
      "boundaries/no-unknown-files": "error",

      ...prettierConfig.rules,

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["src/main.tsx"],
    rules: {
      "boundaries/no-unknown": "off",
      "boundaries/no-unknown-files": "off",
      "import/no-default-export": "off",
    },
  },
  {
    files: ["**/*.config.{ts,js}", "eslint.config.js"],
    rules: {
      "import/no-default-export": "off",
    },
  },
);
