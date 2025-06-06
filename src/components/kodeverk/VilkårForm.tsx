'use client'

import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { Button, Select, TextField } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'

import { KodeverkForm, kategoriLabels } from '@/kodeverk/kodeverk'

import { VilkårshjemmelForm } from './VilkårshjemmelForm'

interface VilkårFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
}

export const VilkårForm = ({ control, index, errors, onRemove }: VilkårFormProps) => {
    const {
        fields: oppfyltFields,
        append: appendOppfylt,
        remove: removeOppfylt,
    } = useFieldArray({
        control,
        name: `vilkar.${index}.mulige_resultater.OPPFYLT` as const,
    })

    const {
        fields: ikkeOppfyltFields,
        append: appendIkkeOppfylt,
        remove: removeIkkeOppfylt,
    } = useFieldArray({
        control,
        name: `vilkar.${index}.mulige_resultater.IKKE_OPPFYLT` as const,
    })

    const {
        fields: ikkeRelevantFields,
        append: appendIkkeRelevant,
        remove: removeIkkeRelevant,
    } = useFieldArray({
        control,
        name: `vilkar.${index}.mulige_resultater.IKKE_RELEVANT` as const,
    })

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name={`vilkar.${index}.vilkårskode` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Vilkårskode"
                            error={errors?.vilkar?.[index]?.vilkårskode?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.beskrivelse` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Beskrivelse"
                            error={errors?.vilkar?.[index]?.beskrivelse?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.kategori` as const}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Kategori"
                            error={errors?.vilkar?.[index]?.kategori?.message}
                            value={field.value || ''}
                        >
                            <option value="">Velg kategori</option>
                            {Object.entries(kategoriLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            </div>

            <VilkårshjemmelForm control={control} index={index} errors={errors} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mulige resultater</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-md mb-2 font-medium">Oppfylt</h4>
                        {oppfyltFields.map((field, resultIndex) => (
                            <div key={field.id} className="mb-4 flex items-start gap-4">
                                <Controller
                                    name={`vilkar.${index}.mulige_resultater.OPPFYLT.${resultIndex}.kode` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Kode"
                                            error={
                                                errors?.vilkar?.[index]?.mulige_resultater?.OPPFYLT?.[resultIndex]?.kode
                                                    ?.message
                                            }
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                                <Controller
                                    name={
                                        `vilkar.${index}.mulige_resultater.OPPFYLT.${resultIndex}.beskrivelse` as const
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Beskrivelse"
                                            error={
                                                errors?.vilkar?.[index]?.mulige_resultater?.OPPFYLT?.[resultIndex]
                                                    ?.beskrivelse?.message
                                            }
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    onClick={() => removeOppfylt(resultIndex)}
                                    className="mt-6"
                                >
                                    Fjern
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                appendOppfylt({
                                    kode: '',
                                    beskrivelse: '',
                                })
                            }
                        >
                            Legg til oppfylt resultat
                        </Button>
                    </div>

                    <div>
                        <h4 className="text-md mb-2 font-medium">Ikke Oppfylt</h4>
                        {ikkeOppfyltFields.map((field, resultIndex) => (
                            <div key={field.id} className="mb-4 flex items-start gap-4">
                                <Controller
                                    name={`vilkar.${index}.mulige_resultater.IKKE_OPPFYLT.${resultIndex}.kode` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Kode"
                                            error={
                                                errors?.vilkar?.[index]?.mulige_resultater?.IKKE_OPPFYLT?.[resultIndex]
                                                    ?.kode?.message
                                            }
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                                <Controller
                                    name={
                                        `vilkar.${index}.mulige_resultater.IKKE_OPPFYLT.${resultIndex}.beskrivelse` as const
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Beskrivelse"
                                            error={
                                                errors?.vilkar?.[index]?.mulige_resultater?.IKKE_OPPFYLT?.[resultIndex]
                                                    ?.beskrivelse?.message
                                            }
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    onClick={() => removeIkkeOppfylt(resultIndex)}
                                    className="mt-6"
                                >
                                    Fjern
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                appendIkkeOppfylt({
                                    kode: '',
                                    beskrivelse: '',
                                })
                            }
                        >
                            Legg til ikke oppfylt resultat
                        </Button>
                    </div>

                    <div>
                        <h4 className="text-md mb-2 font-medium">Ikke Relevante</h4>
                        {ikkeRelevantFields.map((field, resultIndex) => (
                            <div key={field.id} className="mb-4 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <Controller
                                        name={
                                            `vilkar.${index}.mulige_resultater.IKKE_RELEVANT.${resultIndex}.kode` as const
                                        }
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Kode"
                                                error={
                                                    errors?.vilkar?.[index]?.mulige_resultater?.IKKE_RELEVANT?.[
                                                        resultIndex
                                                    ]?.kode?.message
                                                }
                                                value={field.value || ''}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={
                                            `vilkar.${index}.mulige_resultater.IKKE_RELEVANT.${resultIndex}.beskrivelse` as const
                                        }
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Beskrivelse"
                                                error={
                                                    errors?.vilkar?.[index]?.mulige_resultater?.IKKE_RELEVANT?.[
                                                        resultIndex
                                                    ]?.beskrivelse?.message
                                                }
                                                value={field.value || ''}
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        onClick={() => removeIkkeRelevant(resultIndex)}
                                        className="mt-6"
                                    >
                                        Fjern
                                    </Button>
                                </div>
                                <div className="ml-4">
                                    <VilkårshjemmelForm
                                        control={control}
                                        index={index}
                                        errors={errors}
                                        resultIndex={resultIndex}
                                        resultType="IKKE_RELEVANT"
                                    />
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                appendIkkeRelevant({
                                    kode: '',
                                    beskrivelse: '',
                                    vilkårshjemmel: {
                                        lovverk: '',
                                        lovverksversjon: '',
                                        paragraf: '',
                                        ledd: null,
                                        setning: null,
                                        bokstav: null,
                                    },
                                })
                            }
                        >
                            Legg til ikke relevant resultat
                        </Button>
                    </div>
                </div>
            </div>

            <Button type="button" variant="tertiary" onClick={onRemove}>
                Fjern vilkår
            </Button>
        </div>
    )
}
