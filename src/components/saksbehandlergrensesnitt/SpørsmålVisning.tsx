import { ExpansionCard } from '@navikt/ds-react'

import { Hovedspørsmål } from '@/schemas/saksbehandlergrensesnitt'

type Underspørsmål = Hovedspørsmål['underspørsmål'][number]
type Alternativ = NonNullable<Underspørsmål['alternativer']>[number]

interface SpørsmålVisningProps {
    spørsmål: Underspørsmål
    kjenteKoder: Set<string>
    nivå?: number
}

const harUnderspørsmål = (alternativ: Alternativ) => Boolean(alternativ.underspørsmål?.length)

const harUkjentKode = (alternativ: Alternativ, kjenteKoder: Set<string>) =>
    !harUnderspørsmål(alternativ) && !kjenteKoder.has(alternativ.kode)

export const SpørsmålVisning = ({ spørsmål, kjenteKoder, nivå = 0 }: SpørsmålVisningProps) => {
    return (
        <ExpansionCard size="small" aria-label={`Spørsmål ${spørsmål.kode}`} className={nivå > 0 ? 'mt-3' : ''}>
            <ExpansionCard.Header>
                <ExpansionCard.Title>{spørsmål.navn || spørsmål.kode}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    <span className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Kode: {spørsmål.kode}</span>
                        <span>Variant: {spørsmål.variant}</span>
                    </span>
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {!spørsmål.alternativer?.length ? (
                    <p className="text-sm text-gray-500">Ingen alternativer registrert.</p>
                ) : (
                    <div className="space-y-3">
                        {spørsmål.alternativer.map((alternativ) => (
                            <div key={alternativ.kode} className="rounded-lg border border-gray-200 p-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {alternativ.navn || alternativ.kode}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                                        {alternativ.kode}
                                    </span>
                                    {harUnderspørsmål(alternativ) && (
                                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                            Har underspørsmål
                                        </span>
                                    )}
                                    {harUkjentKode(alternativ, kjenteKoder) && (
                                        <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                                            Finner ikke kode i kodeverk
                                        </span>
                                    )}
                                </div>

                                {alternativ.underspørsmål?.length ? (
                                    <div className="mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
                                        {alternativ.underspørsmål.map((underspørsmål) => (
                                            <SpørsmålVisning
                                                key={`${alternativ.kode}-${underspørsmål.kode}`}
                                                spørsmål={underspørsmål}
                                                kjenteKoder={kjenteKoder}
                                                nivå={nivå + 1}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
