'use client'

import { ExpansionCard, Tag } from '@navikt/ds-react'
import { useMemo } from 'react'

import { useKodeverk } from '@/hooks/queries/useKodeverk'
import { saksbehandlerUi } from '@/kodeverk/lokalSaksbehandlerui'

interface UbruktKode {
    kode: string
    beskrivelse: string
    vilkårskode: string
    vilkårBeskrivelse: string
    type: 'oppfylt' | 'ikkeOppfylt'
}

const UbrukteKoderOversikt = () => {
    const { data: kodeverkData } = useKodeverk()

    const ubrukteKoder = useMemo(() => {
        if (!kodeverkData) return []

        // Samle alle koder som brukes i saksbehandlergrensesnittet
        const bruktekoder = new Set<string>()

        // Rekursiv funksjon for å samle alle koder fra saksbehandlerui
        const samleBrukteKoder = (
            alternativer: Array<{
                kode?: string
                harUnderspørsmål?: boolean
                underspørsmål?: Array<{
                    alternativer?: unknown[]
                }>
            }>,
        ) => {
            for (const alternativ of alternativer) {
                if (alternativ.kode && !alternativ.harUnderspørsmål) {
                    // Ignorer UUID-er (disse er genererte)
                    const erUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                        alternativ.kode,
                    )
                    if (!erUuid) {
                        bruktekoder.add(alternativ.kode)
                    }
                }

                // Rekursivt sjekk underspørsmål
                if (alternativ.underspørsmål && alternativ.underspørsmål.length > 0) {
                    for (const underspørsmål of alternativ.underspørsmål) {
                        if (underspørsmål.alternativer) {
                            samleBrukteKoder(
                                underspørsmål.alternativer as Array<{
                                    kode?: string
                                    harUnderspørsmål?: boolean
                                    underspørsmål?: Array<{
                                        alternativer?: unknown[]
                                    }>
                                }>,
                            )
                        }
                    }
                }
            }
        }

        // Gå gjennom alle hovedspørsmål i saksbehandlergrensesnittet
        for (const hovedspørsmål of saksbehandlerUi) {
            for (const underspørsmål of hovedspørsmål.underspørsmål) {
                if (underspørsmål.alternativer) {
                    samleBrukteKoder(
                        underspørsmål.alternativer as Array<{
                            kode?: string
                            harUnderspørsmål?: boolean
                            underspørsmål?: Array<{
                                alternativer?: unknown[]
                            }>
                        }>,
                    )
                }
            }
        }

        // Finn koder i kodeverket som ikke brukes
        const ubrukte: UbruktKode[] = []

        for (const vilkar of kodeverkData.vilkar) {
            // Sjekk oppfylt-koder
            for (const årsak of vilkar.oppfylt) {
                if (!bruktekoder.has(årsak.kode)) {
                    ubrukte.push({
                        kode: årsak.kode,
                        beskrivelse: årsak.beskrivelse,
                        vilkårskode: vilkar.vilkårskode,
                        vilkårBeskrivelse: vilkar.beskrivelse,
                        type: 'oppfylt',
                    })
                }
            }

            // Sjekk ikkeOppfylt-koder
            for (const årsak of vilkar.ikkeOppfylt) {
                if (!bruktekoder.has(årsak.kode)) {
                    ubrukte.push({
                        kode: årsak.kode,
                        beskrivelse: årsak.beskrivelse,
                        vilkårskode: vilkar.vilkårskode,
                        vilkårBeskrivelse: vilkar.beskrivelse,
                        type: 'ikkeOppfylt',
                    })
                }
            }
        }

        return ubrukte.sort((a, b) => a.kode.localeCompare(b.kode))
    }, [kodeverkData])

    if (ubrukteKoder.length === 0) {
        return null
    }

    return (
        <ExpansionCard className="mt-6" aria-labelledby="ubrukte-koder-heading">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="ubrukte-koder-heading">
                    📦 Ubrukte koder i kodeverket ({ubrukteKoder.length})
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Disse kodene finnes i kodeverket men brukes ikke i saksbehandlergrensesnittet:
                    </p>
                    <div className="space-y-3">
                        {ubrukteKoder.map((ubrukt, index) => (
                            <div key={index} className="border-blue-500 bg-blue-50 rounded border-l-4 px-2">
                                <div className="flex items-start gap-3 py-3">
                                    <Tag variant="info" size="small">
                                        {ubrukt.kode}
                                    </Tag>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{ubrukt.beskrivelse}</div>
                                        <div className="text-gray-600 mt-1 text-xs">
                                            <Tag
                                                variant={ubrukt.type === 'oppfylt' ? 'success' : 'error'}
                                                size="xsmall"
                                                className="mr-2"
                                            >
                                                {ubrukt.type === 'oppfylt' ? 'Oppfylt' : 'Ikke oppfylt'}
                                            </Tag>
                                            <span className="text-gray-600 font-mono">{ubrukt.vilkårskode}</span>
                                            <span className="text-gray-700 ml-2">{ubrukt.vilkårBeskrivelse}</span>
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

export default UbrukteKoderOversikt
