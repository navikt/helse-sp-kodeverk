'use client'

import { ExpansionCard, Tag } from '@navikt/ds-react'
import { useMemo } from 'react'

import { useBeregningsregler } from '@/hooks/queries/useBeregningsregler'
import { useBakrommetBeregningskoder } from '@/hooks/queries/useBakrommetBeregningskoder'

interface SpilleromBeregningskode {
    kode: string
    beskrivelse: string
}

const SpilleromBeregningskoderOversikt = () => {
    const { data: spilleromData } = useBeregningsregler()
    const { data: bakrommetKoder } = useBakrommetBeregningskoder()

    const spilleromKoderIkkeIBakrommet = useMemo(() => {
        if (!spilleromData || !bakrommetKoder) return []

        const spilleromKoder: SpilleromBeregningskode[] = []

        // Samle alle koder fra spillerom beregningsregler
        for (const regel of spilleromData.data.beregningsregler) {
            if (regel.kode) {
                spilleromKoder.push({
                    kode: regel.kode,
                    beskrivelse: regel.beskrivelse,
                })
            }
        }

        // Finn koder som er i spillerom men ikke i bakrommet
        const ikkeIBakrommet = spilleromKoder.filter(
            (spilleromKode) => !(bakrommetKoder as string[]).includes(spilleromKode.kode),
        )

        return ikkeIBakrommet.sort((a, b) => a.kode.localeCompare(b.kode))
    }, [spilleromData, bakrommetKoder])

    if (spilleromKoderIkkeIBakrommet.length === 0) {
        return null
    }

    return (
        <ExpansionCard className="mt-6" aria-labelledby="spillerom-beregningskoder-heading">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="spillerom-beregningskoder-heading">
                    🔍 Beregningskoder som ikke er i spillerom applikasjonen ({spilleromKoderIkkeIBakrommet.length})
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Disse beregningskodene finnes i kodeverket men ikke i spillerom applikasjonen:
                    </p>
                    <div className="space-y-3">
                        {spilleromKoderIkkeIBakrommet.map((kode, index) => (
                            <div key={index} className="border-orange-500 bg-orange-50 rounded border-l-4 px-2">
                                <div className="flex items-start gap-3 py-3">
                                    <Tag variant="warning" size="small">
                                        {kode.kode}
                                    </Tag>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{kode.beskrivelse}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default SpilleromBeregningskoderOversikt
