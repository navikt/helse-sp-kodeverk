import { ExpansionCard } from '@navikt/ds-react'

import { MetadataVisning } from '@/components/MetadataVisning'
import { Beregningsregel } from '@/schemas/beregningsregler'
import { formatVilkårshjemmel } from '@/utils/formatVilkårshjemmel'

interface BeregningsregelExpansionCardProps {
    regel: Beregningsregel
}

export const BeregningsregelExpansionCard = ({ regel }: BeregningsregelExpansionCardProps) => {
    const vilkårshjemmel = formatVilkårshjemmel(regel.vilkårshjemmel)

    return (
        <ExpansionCard size="small" aria-label={`Beregningsregel ${regel.kode || regel.beskrivelse}`} className="mb-4">
            <ExpansionCard.Header>
                <ExpansionCard.Title>{regel.beskrivelse || regel.kode || 'Beregningsregel'}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    <span className="flex flex-col gap-1">
                        {regel.kode && <span className="text-sm text-gray-600">Kode: {regel.kode}</span>}
                        {vilkårshjemmel && <span className="text-sm text-gray-600">{vilkårshjemmel}</span>}
                        <MetadataVisning
                            sistEndretAv={regel.sistEndretAv}
                            sistEndretDato={regel.sistEndretDato}
                            size="small"
                            className="mt-2"
                        />
                    </span>
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Beskrivelse</h3>
                        <p className="text-sm text-gray-700">{regel.beskrivelse}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Vilkårshjemmel</h3>
                            <p className="text-sm text-gray-700">{vilkårshjemmel || 'Mangler vilkårshjemmel'}</p>
                            {regel.vilkårshjemmel.lovverksversjon && (
                                <p className="text-sm text-gray-500">
                                    Lovverksversjon: {regel.vilkårshjemmel.lovverksversjon}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
