import { nextleton } from 'nextleton'

import { lokalUtviklingKodeverk } from '@/kodeverk/lokalUtviklingKodeverk'
import { saksbehandlerUi } from '@/kodeverk/lokalSaksbehandlerui'

export const kodeverkStore = nextleton('kodeverk', () => {
    return {
        kodeverk: lokalUtviklingKodeverk,
        kodeverkV2: saksbehandlerUi,
    }
})
