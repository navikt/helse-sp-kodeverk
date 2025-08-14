import type { Config } from 'tailwindcss'
import dsTailwind from '@navikt/ds-tailwind/darkside-tw3'

const config: Config = {
    presets: [dsTailwind],
    content: ['./src/**'],
}
export default config
