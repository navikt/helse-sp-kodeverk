import { nextleton } from 'nextleton'

import { lokalUtviklingBeregningsregler } from '@/kodeverk/mockdata/beregningsregler'
import { lokalUtviklingKodeverk } from '@/kodeverk/mockdata/vilkårKodeverk'
import { saksbehandlerUi } from '@/kodeverk/mockdata/saksbehandlerui'

export const kodeverkStore = nextleton('kodeverk', () => {
    return {
        kodeverk: lokalUtviklingKodeverk,
        kodeverkV2: saksbehandlerUi,
        beregningsregler: lokalUtviklingBeregningsregler,
    }
})
