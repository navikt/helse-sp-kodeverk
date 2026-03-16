import { ExpansionCard } from '@navikt/ds-react'

import { MetadataVisning } from '@/components/MetadataVisning'
import { Årsak, Vilkår } from '@/schemas/kodeverk'
import { formatVilkårshjemmel } from '@/utils/formatVilkårshjemmel'

interface ÅrsakListeProps {
    tittel: string
    årsaker: Årsak[]
    tomTekst: string
    oppfylt: boolean
}

const ÅrsakListe = ({ tittel, årsaker, tomTekst, oppfylt }: ÅrsakListeProps) => {
    return (
        <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900">{tittel}</h3>
            {årsaker.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">{tomTekst}</p>
            ) : (
                <div className="mt-3 space-y-3">
                    {årsaker.map((årsak) => {
                        const vilkårshjemmel = formatVilkårshjemmel(årsak.vilkårshjemmel)

                        return (
                            <div
                                key={`${årsak.kode}-${årsak.beskrivelse}`}
                                className={`rounded-md border bg-gray-50 p-3${oppfylt ? ' bg-ax-success-100' : '  bg-ax-danger-100'}`}
                            >
                                <div className="text-sm font-medium text-gray-900">{årsak.beskrivelse}</div>
                                <div className="text-sm text-gray-600">Kode: {årsak.kode}</div>
                                {vilkårshjemmel && <div className="text-sm text-gray-600">{vilkårshjemmel}</div>}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

interface VilkårReadOnlyProps {
    vilkår: Vilkår
    hasUnknownBegrunnelser: boolean
    hasNoBegrunnelser: boolean
}

export const VilkårReadOnly = ({ vilkår, hasUnknownBegrunnelser, hasNoBegrunnelser }: VilkårReadOnlyProps) => {
    const vilkårshjemmel = formatVilkårshjemmel(vilkår.vilkårshjemmel)

    return (
        <ExpansionCard size="small" aria-label={`Vilkår ${vilkår.vilkårskode || vilkår.beskrivelse}`} className="mb-4">
            <ExpansionCard.Header>
                <ExpansionCard.Title>{vilkår.beskrivelse || vilkår.vilkårskode || 'Vilkår'}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    <span className="flex flex-col gap-1">
                        {vilkår.vilkårskode && (
                            <span className="text-sm text-gray-600">Kode: {vilkår.vilkårskode}</span>
                        )}
                        {vilkårshjemmel && <span className="text-sm text-gray-600">{vilkårshjemmel}</span>}
                        <MetadataVisning
                            sistEndretAv={vilkår.sistEndretAv}
                            sistEndretDato={vilkår.sistEndretDato}
                            size="small"
                            className="mt-2"
                        />
                    </span>
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    {hasUnknownBegrunnelser && (
                        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                            Dette vilkåret inneholder begrunnelser som ikke finnes i saksbehandlergrensesnittet.
                        </div>
                    )}
                    {hasNoBegrunnelser && (
                        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                            Dette vilkåret har ingen begrunnelser.
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Hovedvilkårshjemmel</h3>
                        <p className="text-sm text-gray-700">{vilkårshjemmel || 'Mangler vilkårshjemmel'}</p>
                        {vilkår.vilkårshjemmel.lovverksversjon && (
                            <p className="text-sm text-gray-500">
                                Lovverksversjon: {vilkår.vilkårshjemmel.lovverksversjon}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <ÅrsakListe
                            tittel="Begrunnelser for oppfylt"
                            årsaker={vilkår.oppfylt}
                            oppfylt={true}
                            tomTekst="Ingen begrunnelser registrert for oppfylt."
                        />
                        <ÅrsakListe
                            tittel="Begrunnelser for ikke oppfylt"
                            årsaker={vilkår.ikkeOppfylt}
                            oppfylt={false}
                            tomTekst="Ingen begrunnelser registrert for ikke oppfylt."
                        />
                    </div>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
