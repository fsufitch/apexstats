module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    ignorePatterns: ['**/*.generated.*', '**/gen/**/*', '**/*.sass.d.ts'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 'linebreak-style': [
        //     'error',
        //     'unix'
        // ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
};
