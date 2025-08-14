'use client'

import { ExpansionCard, Tag } from '@navikt/ds-react'
import { useMemo } from 'react'

import { useKodeverk } from '@/hooks/queries/useKodeverk'
import { saksbehandlerUi } from '@/kodeverk/lokalSaksbehandlerui'

interface UkjentKode {
    kode: string
    navn?: string | null
    vilkårBeskrivelse: string
    sti: string // For å vise hvor koden finnes
}

const UkjenteKoderOversikt = () => {
    const { data: kodeverkData } = useKodeverk()

    const ukjenteKoder = useMemo(() => {
        if (!kodeverkData) return []

        const alleKjentekoder = new Set<string>()

        // Samle alle kjente koder fra kodeverket
        for (const vilkar of kodeverkData.vilkar) {
            for (const årsak of vilkar.oppfylt) {
                alleKjentekoder.add(årsak.kode)
            }
            for (const årsak of vilkar.ikkeOppfylt) {
                alleKjentekoder.add(årsak.kode)
            }
        }

        const ukjente: UkjentKode[] = []

        // Rekursiv funksjon for å traversere alle alternativer
        const traverserAlternativer = (
            alternativer: Array<{
                kode?: string
                navn?: string | null
                harUnderspørsmål?: boolean
                underspørsmål?: Array<{
                    kode?: string
                    navn?: string | null
                    alternativer?: unknown[]
                }>
            }>,
            vilkårBeskrivelse: string,
            sti: string,
        ) => {
            for (const alternativ of alternativer) {
                // Sjekk kun alternativer som IKKE har underspørsmål
                if (!alternativ.harUnderspørsmål && alternativ.kode) {
                    // Sjekk om koden er en UUID (disse skal ikke valideres)

                    if (!alleKjentekoder.has(alternativ.kode)) {
                        ukjente.push({
                            kode: alternativ.kode,
                            navn: alternativ.navn,
                            vilkårBeskrivelse,
                            sti,
                        })
                    }
                }

                // Rekursivt sjekk underspørsmål hvis de finnes
                if (alternativ.underspørsmål && alternativ.underspørsmål.length > 0) {
                    for (const underspørsmål of alternativ.underspørsmål) {
                        if (underspørsmål.alternativer) {
                            traverserAlternativer(
                                underspørsmål.alternativer as Array<{
                                    kode?: string
                                    navn?: string | null
                                    harUnderspørsmål?: boolean
                                    underspørsmål?: Array<{
                                        kode?: string
                                        navn?: string | null
                                        alternativer?: unknown[]
                                    }>
                                }>,
                                vilkårBeskrivelse,
                                `${sti} → ${underspørsmål.navn || underspørsmål.kode}`,
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
                    traverserAlternativer(
                        underspørsmål.alternativer,
                        hovedspørsmål.beskrivelse,
                        underspørsmål.navn || underspørsmål.kode,
                    )
                }
            }
        }

        return ukjente.sort((a, b) => a.kode.localeCompare(b.kode))
    }, [kodeverkData])

    if (ukjenteKoder.length === 0) {
        return null
    }

    return (
        <ExpansionCard className="mt-6" aria-labelledby="ukjente-koder-heading">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="ukjente-koder-heading">
                    ⚠️ Ukjente koder i saksbehandlergrensesnitt ({ukjenteKoder.length})
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        Disse svaralternativene har koder som ikke finnes i kodeverket som oppfylt eller ikke oppfylt:
                    </p>
                    <div className="space-y-3">
                        {ukjenteKoder.map((ukjent, index) => (
                            <div key={index} className="border-red-500 bg-red-50 rounded border-l-4 px-2">
                                <Tag variant="error" size="small">
                                    {ukjent.kode}
                                </Tag>
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{ukjent.navn || 'Uten navn'}</div>
                                        <div className="text-gray-600 mt-1 text-xs">
                                            <strong>Vilkår:</strong> {ukjent.vilkårBeskrivelse}
                                        </div>
                                        <div className="text-gray-600 text-xs">
                                            <strong>Sti:</strong> {ukjent.sti}
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

export default UkjenteKoderOversikt
