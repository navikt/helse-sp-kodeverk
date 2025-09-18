import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { ExpansionCard, TextField, Button, Fieldset } from '@navikt/ds-react'
import { TrashIcon } from '@navikt/aksel-icons'

import { BeregningsregelForm } from '@/schemas/beregningsregler'
import { MetadataVisning } from '@/components/MetadataVisning'
import { VilkårshjemmelForm } from '@/components/kodeverk/VilkårshjemmelForm'
import { Vilkårshjemmel } from '@/schemas/kodeverk'

interface BeregningsregelExpansionCardProps {
    control: Control<BeregningsregelForm>
    index: number
    errors: FieldErrors<BeregningsregelForm>
    onRemove: () => void
    kode: string
    beskrivelse: string
    vilkårshjemmel: Vilkårshjemmel
    sistEndretAv?: string | null
    sistEndretDato?: string
    hasErrors: boolean
    errorCount: number
}

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    if (!hjemmel.lovverk) return ''
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} §${kapittel}-${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
}

export const BeregningsregelExpansionCard = ({
    control,
    index,
    errors,
    onRemove,
    kode,
    beskrivelse,
    vilkårshjemmel,
    sistEndretAv,
    sistEndretDato,
    hasErrors,
    errorCount,
}: BeregningsregelExpansionCardProps) => {
    return (
        <ExpansionCard
            size="small"
            aria-label="Beregningsregel"
            className={`mb-4 ${hasErrors ? 'border-2 border-ax-border-danger' : ''}`}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title className="flex items-center gap-2">
                    {beskrivelse || 'Ny beregningsregel'}
                    {hasErrors && <span className="text-red-500 text-sm font-medium">({errorCount} feil)</span>}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    <span className="block space-y-1">
                        {kode && <span className="text-gray-600 block text-sm">Kode: {kode}</span>}
                        {vilkårshjemmel && (
                            <span className="text-gray-600 block text-sm">{formatParagraf(vilkårshjemmel)}</span>
                        )}
                        <MetadataVisning
                            sistEndretAv={sistEndretAv}
                            sistEndretDato={sistEndretDato}
                            size="small"
                            className="mt-2"
                        />
                    </span>
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <Fieldset legend="Beregningsregel" className="flex-1">
                            <div className="space-y-4">
                                <TextField
                                    {...control.register(`beregningsregler.${index}.kode`)}
                                    label="Kode"
                                    error={errors?.beregningsregler?.[index]?.kode?.message}
                                    className="max-w-md"
                                    placeholder="f.eks. 65_PROSENT_DEKNING"
                                />
                                <TextField
                                    {...control.register(`beregningsregler.${index}.beskrivelse`)}
                                    label="Beskrivelse"
                                    error={errors?.beregningsregler?.[index]?.beskrivelse?.message}
                                    className="max-w-2xl"
                                    placeholder="Beskriv beregningsregelen"
                                />
                            </div>
                        </Fieldset>
                        <Button
                            variant="tertiary"
                            size="small"
                            onClick={onRemove}
                            icon={<TrashIcon aria-hidden />}
                            className="mt-2 ml-4"
                        >
                            Slett
                        </Button>
                    </div>

                    <Fieldset legend="Vilkårshjemmel" className="mt-6">
                        <VilkårshjemmelForm
                            control={control}
                            basePath={`beregningsregler.${index}.vilkårshjemmel`}
                            errors={errors}
                        />
                    </Fieldset>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
