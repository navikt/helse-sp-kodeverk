import { nextleton } from 'nextleton'

import { lokalUtviklingKodeverk } from '@/kodeverk/lokalUtviklingKodeverk'

export const kodeverkStore = nextleton('kodeverk', () => {
    return {
        kodeverk: lokalUtviklingKodeverk,
    }
})
