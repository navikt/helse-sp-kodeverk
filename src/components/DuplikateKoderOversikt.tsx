'use client'

import { ExpansionCard, Tag } from '@navikt/ds-react'
import { useMemo } from 'react'

import { useKodeverk } from '@/hooks/queries/useKodeverk'

interface DuplikatKode {
    kode: string
    beskrivelse: string
    forekomster: Array<{
        vilkårskode: string
        vilkårBeskrivelse: string
        type: 'oppfylt' | 'ikkeOppfylt'
    }>
}

const DuplikateKoderOversikt = () => {
    const { data: kodeverkData } = useKodeverk()

    const duplikateKoder = useMemo(() => {
        if (!kodeverkData) return []

        // Map for å holde styr på alle koder og hvor de forekommer
        const kodeMap = new Map<
            string,
            Array<{
                beskrivelse: string
                vilkårskode: string
                vilkårBeskrivelse: string
                type: 'oppfylt' | 'ikkeOppfylt'
            }>
        >()

        // Samle alle koder fra kodeverket
        for (const vilkar of kodeverkData.data.vilkar) {
            // Sjekk oppfylt-koder
            for (const årsak of vilkar.oppfylt) {
                if (!kodeMap.has(årsak.kode)) {
                    kodeMap.set(årsak.kode, [])
                }
                kodeMap.get(årsak.kode)!.push({
                    beskrivelse: årsak.beskrivelse,
                    vilkårskode: vilkar.vilkårskode,
                    vilkårBeskrivelse: vilkar.beskrivelse,
                    type: 'oppfylt',
                })
            }

            // Sjekk ikkeOppfylt-koder
            for (const årsak of vilkar.ikkeOppfylt) {
                if (!kodeMap.has(årsak.kode)) {
                    kodeMap.set(årsak.kode, [])
                }
                kodeMap.get(årsak.kode)!.push({
                    beskrivelse: årsak.beskrivelse,
                    vilkårskode: vilkar.vilkårskode,
                    vilkårBeskrivelse: vilkar.beskrivelse,
                    type: 'ikkeOppfylt',
                })
            }
        }

        // Finn duplikater (koder som forekommer mer enn én gang)
        const duplikater: DuplikatKode[] = []

        for (const [kode, forekomster] of kodeMap.entries()) {
            if (forekomster.length > 1) {
                // Ta første beskrivelse som "hovedbeskrivelse"
                const hovedbeskrivelse = forekomster[0].beskrivelse

                duplikater.push({
                    kode,
                    beskrivelse: hovedbeskrivelse,
                    forekomster: forekomster.map((f) => ({
                        vilkårskode: f.vilkårskode,
                        vilkårBeskrivelse: f.vilkårBeskrivelse,
                        type: f.type,
                    })),
                })
            }
        }

        return duplikater.sort((a, b) => a.kode.localeCompare(b.kode))
    }, [kodeverkData])

    if (duplikateKoder.length === 0) {
        return null
    }

    return (
        <ExpansionCard className="mt-6" aria-labelledby="duplikate-koder-heading">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="duplikate-koder-heading">
                    🔄 Duplikate koder i kodeverket ({duplikateKoder.length})
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">Disse kodene forekommer flere ganger i kodeverket:</p>
                    <div className="space-y-4">
                        {duplikateKoder.map((duplikat, index) => (
                            <div key={index} className="border-orange-500 bg-orange-50 rounded border-l-4 px-2">
                                <div className="mb-3 flex items-start gap-3">
                                    <Tag variant="warning" size="small">
                                        {duplikat.kode}
                                    </Tag>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{duplikat.beskrivelse}</div>
                                        <div className="text-gray-600 mt-1 text-xs">
                                            <strong>Forekommer {duplikat.forekomster.length} ganger:</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6 space-y-2 pb-3">
                                    {duplikat.forekomster.map((forekomst, fIndex) => (
                                        <div key={fIndex} className="flex items-center gap-2 text-xs">
                                            <Tag
                                                variant={forekomst.type === 'oppfylt' ? 'success' : 'error'}
                                                size="xsmall"
                                            >
                                                {forekomst.type === 'oppfylt' ? 'Oppfylt' : 'Ikke oppfylt'}
                                            </Tag>
                                            <span className="text-gray-600 font-mono">{forekomst.vilkårskode}</span>
                                            <span className="text-gray-700">{forekomst.vilkårBeskrivelse}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default DuplikateKoderOversikt
