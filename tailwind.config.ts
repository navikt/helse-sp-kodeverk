import type { Config } from 'tailwindcss'
import dsTailwind from '@navikt/ds-tailwind'

const config: Config = {
    presets: [dsTailwind],
    content: ['./src/**'],
}
export default config
