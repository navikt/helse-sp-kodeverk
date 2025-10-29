'use client'

import { ExpansionCard, Tag } from '@navikt/ds-react'
import { useMemo } from 'react'

import { useBeregningsregler } from '@/hooks/queries/useBeregningsregler'
import { useBakrommetBeregningskoder } from '@/hooks/queries/useBakrommetBeregningskoder'

const BakrommetBeregningskoderOversikt = () => {
    const { data: spilleromData } = useBeregningsregler()
    const { data: bakrommetKoder } = useBakrommetBeregningskoder()

    const bakrommetKoderIkkeISpillerom = useMemo(() => {
        if (!spilleromData || !bakrommetKoder) return []

        // Samle alle koder fra spillerom beregningsregler
        const spilleromKoder = new Set<string>()
        for (const regel of spilleromData.data.beregningsregler) {
            if (regel.kode) {
                spilleromKoder.add(regel.kode)
            }
        }

        // Finn koder som er i bakrommet men ikke i spillerom
        const ikkeISpillerom = (bakrommetKoder as string[])
            .filter((bakrommetKode) => !spilleromKoder.has(bakrommetKode))
            .sort((a, b) => a.localeCompare(b))

        return ikkeISpillerom
    }, [spilleromData, bakrommetKoder])

    if (bakrommetKoderIkkeISpillerom.length === 0) {
        return null
    }

    return (
        <ExpansionCard className="mt-6" aria-labelledby="bakrommet-beregningskoder-heading">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="bakrommet-beregningskoder-heading">
                    🔍 Beregningskoder i applikasjonen som ikke er i kodeverket ({bakrommetKoderIkkeISpillerom.length})
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Disse beregningskodene finnes i bakrommet applikasjonen men ikke i spillerom kodeverket:
                    </p>
                    <div className="space-y-3">
                        {bakrommetKoderIkkeISpillerom.map((kode, index) => (
                            <div key={index} className="border-red-500 bg-red-50 rounded border-l-4 px-2">
                                <div className="flex items-start gap-3 py-3">
                                    <Tag variant="error" size="small">
                                        {kode}
                                    </Tag>
                                    <div className="flex-1">
                                        <div className="text-gray-600 text-sm font-medium">
                                            Kode finnes kun i bakrommet applikasjonen
                                        </div>
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

export default BakrommetBeregningskoderOversikt
