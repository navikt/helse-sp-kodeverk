'use client'

import { Control, FieldErrors, useFieldArray, useWatch, FieldArrayWithId } from 'react-hook-form'
import { Button, TextField, Modal, Heading, ExpansionCard } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'

import { KodeverkForm, Årsak, Vilkårshjemmel } from '@schemas/kodeverk'

import { VilkårshjemmelForm } from './VilkårshjemmelForm'

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} §${kapittel}-${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
}

interface VilkårFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
}

type ResultatType = 'oppfylt' | 'ikkeOppfylt'

interface ResultatBegrunnelserSectionProps {
    fields: FieldArrayWithId<KodeverkForm, `vilkar.${number}.${ResultatType}`, 'id'>[]
    onAppend: (value: Årsak) => void
    onRemove: (index: number) => void
    control: Control<KodeverkForm>
    vilkårIndex: number
    errors: FieldErrors<KodeverkForm>
    resultType: ResultatType
    mainVilkårshjemmel: Vilkårshjemmel | undefined
    variant: 'oppfylt' | 'ikkeOppfylt'
}

const ResultatBegrunnelserSection = ({
    fields,
    onAppend,
    onRemove,
    control,
    vilkårIndex,
    errors,
    resultType,
    mainVilkårshjemmel,
    variant,
}: ResultatBegrunnelserSectionProps) => {
    const getDefaultVilkårshjemmel = () => {
        return mainVilkårshjemmel ? { ...mainVilkårshjemmel } : undefined
    }

    // Watch all vilkårshjemmel values for begrunnelser
    const begrunnelseVilkårshjemler = useWatch({
        control,
        name: `vilkar.${vilkårIndex}.${resultType}`,
    })

    const getTitle = () => {
        const baseTitle = variant === 'oppfylt' ? 'Begrunnelser for oppfylt' : 'Begrunnelser for ikke oppfylt'
        const countText =
            fields.length === 0 ? 'Ingen begrunnelser' : `${fields.length} begrunnelse${fields.length === 1 ? '' : 'r'}`
        return `${baseTitle} (${countText})`
    }

    // Sjekk om det er valideringsfeil i noen av underfeltene
    const hasErrors = () => {
        const resultErrors = errors?.vilkar?.[vilkårIndex]?.[resultType]
        if (!resultErrors || !Array.isArray(resultErrors)) return false

        return resultErrors.some((fieldError) => {
            return fieldError?.kode?.message || fieldError?.beskrivelse?.message || fieldError?.vilkårshjemmel
        })
    }

    return (
        <div className="subtle-card">
            <ExpansionCard
                size="small"
                aria-labelledby={`${resultType}-header`}
                className={hasErrors() ? 'border-2 border-ax-border-danger' : ''}
                style={
                    {
                        '--ax-bg-raised':
                            variant === 'oppfylt' ? 'var(--ax-bg-success-softA)' : 'var(--ax-bg-danger-softA)',
                    } as React.CSSProperties
                }
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title as="h4" size="small" id={`${resultType}-header`}>
                        {getTitle()}
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <div className="space-y-2">
                        {fields.map((field, resultIndex) => {
                            const begrunnelse = begrunnelseVilkårshjemler?.[resultIndex]
                            const vilkårshjemmel = begrunnelse?.vilkårshjemmel
                            const kode = begrunnelse?.kode || ''
                            const beskrivelse = begrunnelse?.beskrivelse || ''

                            return (
                                <ExpansionCard
                                    key={field.id}
                                    size="small"
                                    aria-labelledby={`begrunnelse-${resultIndex}-header`}
                                    className={
                                        errors?.vilkar?.[vilkårIndex]?.[resultType]?.[resultIndex]
                                            ? 'border-2 border-ax-border-danger'
                                            : ''
                                    }
                                >
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title
                                            as="h5"
                                            size="small"
                                            id={`begrunnelse-${resultIndex}-header`}
                                        >
                                            {beskrivelse || kode || 'Ny begrunnelse'}
                                        </ExpansionCard.Title>
                                        {(kode || vilkårshjemmel) && (
                                            <ExpansionCard.Description>
                                                {vilkårshjemmel && (
                                                    <span className="text-gray-600 block text-sm">
                                                        {formatParagraf(vilkårshjemmel)}
                                                    </span>
                                                )}
                                                {kode && <span className="text-gray-600 block text-sm">{kode}</span>}
                                            </ExpansionCard.Description>
                                        )}
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <div className="space-y-4">
                                            <div className="flex items-end gap-4">
                                                <Controller
                                                    name={
                                                        `vilkar.${vilkårIndex}.${resultType}.${resultIndex}.kode` as const
                                                    }
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Kode"
                                                            error={
                                                                errors?.vilkar?.[vilkårIndex]?.[resultType]?.[
                                                                    resultIndex
                                                                ]?.kode?.message
                                                            }
                                                            value={field.value || ''}
                                                            className="flex-1"
                                                        />
                                                    )}
                                                />
                                                <Button
                                                    icon={<TrashIcon />}
                                                    type="button"
                                                    variant="tertiary"
                                                    onClick={() => onRemove(resultIndex)}
                                                >
                                                    Fjern
                                                </Button>
                                            </div>

                                            <Controller
                                                name={
                                                    `vilkar.${vilkårIndex}.${resultType}.${resultIndex}.beskrivelse` as const
                                                }
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Tekst"
                                                        error={
                                                            errors?.vilkar?.[vilkårIndex]?.[resultType]?.[resultIndex]
                                                                ?.beskrivelse?.message
                                                        }
                                                        value={field.value || ''}
                                                    />
                                                )}
                                            />

                                            <ExpansionCard
                                                size="small"
                                                aria-labelledby={`vilkårshjemmel-${resultIndex}-header`}
                                                className={
                                                    errors?.vilkar?.[vilkårIndex]?.[resultType]?.[resultIndex]
                                                        ?.vilkårshjemmel
                                                        ? 'border-2 border-ax-border-danger'
                                                        : ''
                                                }
                                            >
                                                <ExpansionCard.Header>
                                                    <ExpansionCard.Title
                                                        as="h6"
                                                        size="small"
                                                        id={`vilkårshjemmel-${resultIndex}-header`}
                                                    >
                                                        {(vilkårshjemmel && formatParagraf(vilkårshjemmel)) ||
                                                            'Vilkårshjemmel for begrunnelse'}
                                                    </ExpansionCard.Title>
                                                </ExpansionCard.Header>
                                                <ExpansionCard.Content>
                                                    <VilkårshjemmelForm
                                                        control={control}
                                                        index={vilkårIndex}
                                                        errors={errors}
                                                        resultIndex={resultIndex}
                                                        resultType={resultType}
                                                    />
                                                </ExpansionCard.Content>
                                            </ExpansionCard>
                                        </div>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            )
                        })}
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
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>
        </div>
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
        name: `vilkar.${index}.oppfylt` as const,
    })

    const {
        fields: ikkeOppfyltFields,
        append: appendIkkeOppfylt,
        remove: removeIkkeOppfylt,
    } = useFieldArray({
        control,
        name: `vilkar.${index}.ikkeOppfylt` as const,
    })

    const handleDeleteConfirm = () => {
        onRemove()
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Controller
                    name={`vilkar.${index}.vilkårskode` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Vilkårskode"
                            size="small"
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
                            size="small"
                            error={errors?.vilkar?.[index]?.beskrivelse?.message}
                            value={field.value || ''}
                        />
                    )}
                />
            </div>

            <ExpansionCard
                size="small"
                aria-labelledby="hovedvilkårshjemmel-header"
                style={
                    {
                        '--ax-bg-raised': 'var(--ax-bg-accent-softA)',
                    } as React.CSSProperties
                }
                className={errors?.vilkar?.[index]?.vilkårshjemmel ? 'border-2 border-ax-border-danger' : ''}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title as="h4" size="small" id="hovedvilkårshjemmel-header">
                        Hovedvilkårshjemmel
                    </ExpansionCard.Title>
                    {mainVilkårshjemmel && (
                        <ExpansionCard.Description>{formatParagraf(mainVilkårshjemmel)}</ExpansionCard.Description>
                    )}
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VilkårshjemmelForm control={control} index={index} errors={errors} />
                </ExpansionCard.Content>
            </ExpansionCard>

            <div className="space-y-4">
                <div className="space-y-6">
                    <ResultatBegrunnelserSection
                        fields={oppfyltFields}
                        onAppend={appendOppfylt}
                        onRemove={removeOppfylt}
                        control={control}
                        vilkårIndex={index}
                        errors={errors}
                        resultType="oppfylt"
                        variant="oppfylt"
                        mainVilkårshjemmel={mainVilkårshjemmel}
                    />

                    <ResultatBegrunnelserSection
                        fields={ikkeOppfyltFields}
                        onAppend={appendIkkeOppfylt}
                        onRemove={removeIkkeOppfylt}
                        control={control}
                        vilkårIndex={index}
                        errors={errors}
                        resultType="ikkeOppfylt"
                        variant="ikkeOppfylt"
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
