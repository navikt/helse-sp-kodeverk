// eslint-disable-next-line @typescript-eslint/no-require-imports
const baseConfig = require('@navikt/tsm-prettier')

module.exports = {
    ...baseConfig,
    plugins: [...(baseConfig.plugins || []), 'prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/styles/globals.css',
    tailwindFunctions: ['clsx', 'cn'],
}
