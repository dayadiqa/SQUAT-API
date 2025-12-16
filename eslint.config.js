// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
    /* =====================
       GLOBAL IGNORES (WAJIB)
    ====================== */
    {
        ignores: [
            "eslint.config.js",
            "node_modules/**",
            "dist/**"
        ]
    },

    /* =====================
       Base JS
    ====================== */
    pluginJs.configs.recommended,

    /* =====================
       TypeScript (type-aware)
    ====================== */
    ...tseslint.configs.recommendedTypeChecked,

    /* =====================
       Project rules
    ====================== */
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname
            }
        },

        plugins: {
            prettier: pluginPrettier
        },

        rules: {
            /* Prettier */
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    useTabs: false,
                    singleQuote: false,
                    trailingComma: "none",
                    semi: true,
                    printWidth: 80,
                    arrowParens: "always",
                    bracketSpacing: true,
                    singleAttributePerLine: true
                }
            ],

            /* Disable JS rules */
            "no-unused-vars": "off",
            "indent": "off",

            /* TS rules */
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" }
            ],
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/consistent-type-imports": "error",

            /* Style */
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "no-trailing-spaces": "error",
            "eol-last": ["error", "always"],
            "comma-dangle": ["error", "never"],
            "no-console": "off",
            eqeqeq: ["error", "always"],
            curly: ["error", "all"]
        }
    }
];
