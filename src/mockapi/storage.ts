import { nextleton } from 'nextleton'

import { lokalUtviklingKodeverk } from '@/kodeverk/lokalUtviklingKodeverk'
import { lokalUtviklingKodeverkV2 } from '@/kodeverk/lokalUtviklingKodeverkV2'

export const kodeverkStore = nextleton('kodeverk', () => {
    return {
        kodeverk: lokalUtviklingKodeverk,
        kodeverkV2: lokalUtviklingKodeverkV2,
    }
})
