'use client'

import { Control, FieldErrors, useFieldArray, useWatch, FieldArrayWithId } from 'react-hook-form'
import { Button, Select, TextField, Modal, Heading, Box } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'

import { kategoriLabels } from '@/kodeverk/lokalUtviklingKodeverk'
import { KodeverkForm, Årsak, Vilkårshjemmel } from '@schemas/kodeverk'

import { VilkårshjemmelForm } from './VilkårshjemmelForm'

interface VilkårFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
}

type ResultatType = 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT'

interface ResultatBegrunnelserSectionProps {
    title: string
    fields: FieldArrayWithId<KodeverkForm, `vilkar.${number}.mulige_resultater.${ResultatType}`, 'id'>[]
    onAppend: (value: Årsak) => void
    onRemove: (index: number) => void
    control: Control<KodeverkForm>
    vilkårIndex: number
    errors: FieldErrors<KodeverkForm>
    resultType: ResultatType
    mainVilkårshjemmel: Vilkårshjemmel | undefined
}

const ResultatBegrunnelserSection = ({
    title,
    fields,
    onAppend,
    onRemove,
    control,
    vilkårIndex,
    errors,
    resultType,
    mainVilkårshjemmel,
}: ResultatBegrunnelserSectionProps) => {
    const getDefaultVilkårshjemmel = () => {
        if (resultType === 'IKKE_RELEVANT') {
            return mainVilkårshjemmel
                ? { ...mainVilkårshjemmel }
                : {
                      lovverk: '',
                      lovverksversjon: '',
                      paragraf: '',
                      ledd: null,
                      setning: null,
                      bokstav: null,
                  }
        }
        return mainVilkårshjemmel ? { ...mainVilkårshjemmel } : undefined
    }

    return (
        <Box padding="4" borderWidth="1" borderRadius="medium" className="bg-gray-50">
            <h4 className="text-md mb-4 font-medium">{title}</h4>
            {fields.map((field, resultIndex) => (
                <div key={field.id} className="mb-6 rounded-lg border border-gray-200 bg-gray-100 p-4">
                    <div className="mb-4 flex items-start gap-4">
                        <Controller
                            name={`vilkar.${vilkårIndex}.mulige_resultater.${resultType}.${resultIndex}.kode` as const}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Kode"
                                    error={
                                        errors?.vilkar?.[vilkårIndex]?.mulige_resultater?.[resultType]?.[resultIndex]
                                            ?.kode?.message
                                    }
                                    value={field.value || ''}
                                />
                            )}
                        />
                        <Controller
                            name={
                                `vilkar.${vilkårIndex}.mulige_resultater.${resultType}.${resultIndex}.beskrivelse` as const
                            }
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Tekst"
                                    className="w-100"
                                    error={
                                        errors?.vilkar?.[vilkårIndex]?.mulige_resultater?.[resultType]?.[resultIndex]
                                            ?.beskrivelse?.message
                                    }
                                    value={field.value || ''}
                                />
                            )}
                        />
                        <Button type="button" variant="tertiary" onClick={() => onRemove(resultIndex)} className="mt-6">
                            Fjern
                        </Button>
                    </div>
                    <div className="p-4">
                        <h5 className="mb-3 text-sm font-medium text-gray-700">Vilkårshjemmel for begrunnelse</h5>
                        <VilkårshjemmelForm
                            control={control}
                            index={vilkårIndex}
                            errors={errors}
                            resultIndex={resultIndex}
                            resultType={resultType}
                        />
                    </div>
                </div>
            ))}
            <Button
                type="button"
                variant="secondary"
                icon={<PlusIcon />}
                size="small"
                onClick={() =>
                    onAppend({
                        kode: '',
                        beskrivelse: '',
                        vilkårshjemmel: getDefaultVilkårshjemmel(),
                    })
                }
            >
                Legg til
            </Button>
        </Box>
    )
}

export const VilkårForm = ({ control, index, errors, onRemove }: VilkårFormProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // Watch the main vilkårshjemmel to get current values for pre-filling
    const mainVilkårshjemmel = useWatch({
        control,
        name: `vilkar.${index}.vilkårshjemmel`,
    })

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

    const handleDeleteConfirm = () => {
        onRemove()
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
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
                    name={`vilkar.${index}.spørsmålstekst` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Spørsmålstekst (valgfritt)"
                            error={errors?.vilkar?.[index]?.spørsmålstekst?.message}
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
                            label="Tekst"
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

            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <h4 className="text-md mb-4 font-medium text-gray-700">Hovedvilkårshjemmel</h4>
                <VilkårshjemmelForm control={control} index={index} errors={errors} />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mulige resultater</h3>
                <div className="space-y-6">
                    <ResultatBegrunnelserSection
                        title="Begrunnelser for oppfylt"
                        fields={oppfyltFields}
                        onAppend={appendOppfylt}
                        onRemove={removeOppfylt}
                        control={control}
                        vilkårIndex={index}
                        errors={errors}
                        resultType="OPPFYLT"
                        mainVilkårshjemmel={mainVilkårshjemmel}
                    />

                    <ResultatBegrunnelserSection
                        title="Begrunnelser for ikke oppfylt"
                        fields={ikkeOppfyltFields}
                        onAppend={appendIkkeOppfylt}
                        onRemove={removeIkkeOppfylt}
                        control={control}
                        vilkårIndex={index}
                        errors={errors}
                        resultType="IKKE_OPPFYLT"
                        mainVilkårshjemmel={mainVilkårshjemmel}
                    />

                    <ResultatBegrunnelserSection
                        title="Begrunnelser for ikke relevant / unntak"
                        fields={ikkeRelevantFields}
                        onAppend={appendIkkeRelevant}
                        onRemove={removeIkkeRelevant}
                        control={control}
                        vilkårIndex={index}
                        errors={errors}
                        resultType="IKKE_RELEVANT"
                        mainVilkårshjemmel={mainVilkårshjemmel}
                    />
                </div>
            </div>

            <Button
                type="button"
                variant="danger"
                size="small"
                icon={<TrashIcon />}
                onClick={() => setShowDeleteModal(true)}
            >
                Fjern hele vilkåret
            </Button>

            {showDeleteModal && (
                <Modal open={showDeleteModal} onClose={handleDeleteCancel} aria-label="Bekreft sletting">
                    <Modal.Header>
                        <Heading size="medium">Bekreft sletting</Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Er du sikker på at du vil slette dette vilkåret? Alle data knyttet til vilkåret vil gå tapt.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Ja, slett vilkåret
                        </Button>
                        <Button variant="secondary" onClick={handleDeleteCancel}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}
