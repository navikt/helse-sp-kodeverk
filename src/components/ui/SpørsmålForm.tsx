'use client'

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DragVerticalIcon, PlusIcon, TrashIcon } from '@navikt/aksel-icons'
import { Button, Checkbox, UNSAFE_Combobox, ExpansionCard, Heading, Modal, Select, TextField } from '@navikt/ds-react'
import { useMemo, useState } from 'react'
import { Control, Controller, FieldErrors, useFieldArray, useWatch, UseFormSetValue, FieldPath } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { HovedspørsmålForm } from '@/schemas/saksbehandlergrensesnitt'
import { useKodeverk } from '@hooks/queries/useKodeverk'
import { kategoriLabels } from '@/kodeverk/kategorier'

type KodeOption = { value: string; label: string }

// Hjelpefunksjon for å få norske navn på varianttyper
const getVariantDisplayName = (variant: string | undefined) => {
    switch (variant) {
        case 'CHECKBOX':
            return 'Checkbox'
        case 'RADIO':
            return 'Radio'
        case 'SELECT':
            return 'Select'
        default:
            return 'Radio'
    }
}

interface VilkårFormProps {
    control: Control<HovedspørsmålForm>
    index: number
    errors: FieldErrors<HovedspørsmålForm>
    onRemove: () => void
    setValue: UseFormSetValue<HovedspørsmålForm>
}

interface UnderspørsmålSectionProps {
    control: Control<HovedspørsmålForm>
    vilkårIndex: number
    underspørsmålPath: string
    errors: FieldErrors<HovedspørsmålForm>
    onRemove: () => void
    level?: number
    setValue?: UseFormSetValue<HovedspørsmålForm>
    allKodeOptions: KodeOption[]
}

interface AlternativSectionProps {
    control: Control<HovedspørsmålForm>
    vilkårIndex: number
    alternativPath: string
    errors: FieldErrors<HovedspørsmålForm>
    onRemove: () => void
    level?: number
    setValue?: UseFormSetValue<HovedspørsmålForm>
    allKodeOptions: KodeOption[]
}

const AlternativSection = ({
    control,
    vilkårIndex,
    alternativPath,
    errors,
    onRemove,
    level = 0,
    setValue,
    allKodeOptions,
}: AlternativSectionProps) => {
    const {
        fields: nestedUnderspørsmålFields,
        append: appendNestedUnderspørsmål,
        remove: removeNestedUnderspørsmål,
    } = useFieldArray({
        control,
        name: `${alternativPath}.underspørsmål` as `vilkar.${number}.underspørsmål.${number}.alternativer.${number}.underspørsmål`,
    })

    // Watch harUnderspørsmål checkbox to determine UI behavior
    const harUnderspørsmål = useWatch({
        control,
        name: `${alternativPath}.harUnderspørsmål` as FieldPath<HovedspørsmålForm>,
    })

    // Watch current kode value
    const currentKode = useWatch({
        control,
        name: `${alternativPath}.kode` as FieldPath<HovedspørsmålForm>,
    })

    const indent = level * 20

    return (
        <div className="border-gray-200 bg-gray-50 rounded-lg border p-4" style={{ marginLeft: `${indent}px` }}>
            <div className="mb-4 space-y-2">
                <div className="flex items-start gap-4">
                    {/* Vis combobox for kodevalg hvis alternativet IKKE har underspørsmål */}

                    <Controller
                        name={`${alternativPath}.navn` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Navn"
                                size="small"
                                className="flex-1"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                            />
                        )}
                    />
                    <Button type="button" variant="tertiary" onClick={onRemove} className="mt-6">
                        Fjern
                    </Button>
                </div>
                <Controller
                    name={`${alternativPath}.harUnderspørsmål` as FieldPath<HovedspørsmålForm>}
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            {...field}
                            size="small"
                            checked={field.value || false}
                            onChange={(e) => {
                                const hasSubquestions = e.target.checked
                                field.onChange(hasSubquestions)

                                if (hasSubquestions) {
                                    // Sjekk om koden er en gyldig UUID
                                    const isUuid =
                                        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                                            currentKode || '',
                                        )

                                    // Generer UUID hvis kode ikke eksisterer eller ikke er en UUID
                                    if (!currentKode || currentKode === '' || !isUuid) {
                                        setValue?.(`${alternativPath}.kode` as FieldPath<HovedspørsmålForm>, uuidv4())
                                    }
                                } else {
                                    // Tøm underspørsmål når checkbox deaktiveres
                                    setValue?.(`${alternativPath}.underspørsmål` as FieldPath<HovedspørsmålForm>, [])
                                }
                            }}
                        >
                            Har underspørsmål
                        </Checkbox>
                    )}
                />
                {!harUnderspørsmål && (
                    <Controller
                        name={`${alternativPath}.kode` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => {
                            const kodeOptions = allKodeOptions
                            const currentValue = field.value

                            // Sjekk om valgt kode finnes i kodeverket
                            const isValidKode =
                                !currentValue ||
                                currentValue === '' ||
                                kodeOptions.some((opt) => opt.value === currentValue)

                            // Hvis koden ikke finnes i kodeverket, vis den som et alternativ med spesiell markering
                            const displayOptions = isValidKode
                                ? kodeOptions
                                : [...kodeOptions, { value: currentValue, label: `⚠️ ${currentValue} - UKJENT KODE` }]

                            const selectedOptions = currentValue
                                ? displayOptions.filter((opt) => opt.value === currentValue)
                                : []

                            // Sjekk for valideringsfeil - bruk en enklere tilnærming
                            const fieldError = field.value === '' ? 'Kode er påkrevd' : undefined

                            return (
                                <UNSAFE_Combobox
                                    label="Kode"
                                    size="small"
                                    allowNewValues={true}
                                    options={displayOptions}
                                    selectedOptions={selectedOptions}
                                    onToggleSelected={(option, isSelected) => {
                                        if (isSelected) {
                                            // option er string-verdien (value fra objektet)
                                            field.onChange(option)
                                        } else {
                                            field.onChange('')
                                        }
                                    }}
                                    isMultiSelect={false}
                                    error={
                                        fieldError ||
                                        (!isValidKode ? `Koden "${currentValue}" finnes ikke i kodeverket` : undefined)
                                    }
                                />
                            )
                        }}
                    />
                )}

                {/* Checkbox for å kontrollere om alternativet har underspørsmål */}
                <div className="flex items-center gap-4">
                    {harUnderspørsmål && (
                        <span className="text-gray-600 text-sm">Kode: {currentKode || 'Genereres automatisk'}</span>
                    )}
                </div>
            </div>

            {/* Vis underspørsmål og knapp kun hvis checkbox er aktivert */}
            {harUnderspørsmål && (
                <>
                    {/* Nested underspørsmål for this alternativ */}
                    {nestedUnderspørsmålFields.length > 0 && (
                        <div className="mt-6">
                            <h6 className="text-gray-700 mb-3 text-sm font-medium">
                                Underspørsmål for dette alternativet
                            </h6>
                            <div className="space-y-4">
                                {nestedUnderspørsmålFields.map((field, nestedIndex) => (
                                    <UnderspørsmålSection
                                        key={`${alternativPath}-nested-${field.id}`}
                                        control={control}
                                        vilkårIndex={vilkårIndex}
                                        underspørsmålPath={`${alternativPath}.underspørsmål.${nestedIndex}`}
                                        errors={errors}
                                        onRemove={() => removeNestedUnderspørsmål(nestedIndex)}
                                        level={level + 1}
                                        setValue={setValue}
                                        allKodeOptions={allKodeOptions}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-4 flex gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            icon={<PlusIcon />}
                            size="small"
                            onClick={() => {
                                // Sjekk om koden er en gyldig UUID
                                const isUuid =
                                    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                                        currentKode || '',
                                    )

                                // Generer UUID for alternativet hvis ikke allerede en UUID
                                if (!currentKode || currentKode === '' || !isUuid) {
                                    setValue?.(`${alternativPath}.kode` as FieldPath<HovedspørsmålForm>, uuidv4())
                                }

                                appendNestedUnderspørsmål({
                                    kode: uuidv4(),
                                    navn: null,
                                    variant: 'RADIO',
                                    alternativer: [],
                                })
                            }}
                        >
                            Legg til underspørsmål
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

const UnderspørsmålSection = ({
    control,
    vilkårIndex,
    underspørsmålPath,
    errors,
    onRemove,
    level = 0,
    setValue,
    allKodeOptions,
}: UnderspørsmålSectionProps) => {
    const {
        fields: alternativFields,
        append: appendAlternativ,
        remove: removeAlternativ,
        move: moveAlternativ,
    } = useFieldArray({
        control,
        name: `${underspørsmålPath}.alternativer` as `vilkar.${number}.underspørsmål.${number}.alternativer`,
    })

    const indent = level * 20

    // DnD-kit setup for alternativer
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleAlternativDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = alternativFields.findIndex((field) => field.id === active.id)
            const newIndex = alternativFields.findIndex((field) => field.id === over.id)
            moveAlternativ(oldIndex, newIndex)
        }
    }

    // Watch current kode value for display
    const currentKode = useWatch({
        control,
        name: `${underspørsmålPath}.kode` as FieldPath<HovedspørsmålForm>,
    })

    // Sjekk for feil i dette underspørsmålet
    const getUnderspørsmålErrors = () => {
        const pathParts = underspørsmålPath.split('.')
        const vilkårIndex = parseInt(pathParts[1])
        const underspørsmålIndex = parseInt(pathParts[3])

        const underspørsmålErrors = errors?.vilkar?.[vilkårIndex]?.underspørsmål?.[underspørsmålIndex]
        if (!underspørsmålErrors) return { hasErrors: false, errorCount: 0, errorMessages: [] }

        let errorCount = 0
        const errorMessages: string[] = []

        // Sjekk hovedfeltene for underspørsmålet
        if (underspørsmålErrors.kode?.message) {
            errorCount++
            errorMessages.push(underspørsmålErrors.kode.message)
        }
        if (underspørsmålErrors.navn?.message) {
            errorCount++
            errorMessages.push(underspørsmålErrors.navn.message)
        }
        if (underspørsmålErrors.variant?.message) {
            errorCount++
            errorMessages.push(underspørsmålErrors.variant.message)
        }

        // Sjekk alternativer
        if (underspørsmålErrors.alternativer) {
            for (let i = 0; i < (underspørsmålErrors.alternativer.length || 0); i++) {
                const alternativError = underspørsmålErrors.alternativer[i]
                if (alternativError?.kode?.message) errorCount++
                if (alternativError?.navn?.message) errorCount++
                if (alternativError?.underspørsmål) {
                    // Rekursivt sjekk nested underspørsmål
                    const nestedErrors = getNestedUnderspørsmålErrors(alternativError.underspørsmål)
                    errorCount += nestedErrors
                }
            }
        }

        return { hasErrors: errorCount > 0, errorCount, errorMessages }
    }

    // Hjelpefunksjon for å sjekke nested underspørsmål
    const getNestedUnderspørsmålErrors = (underspørsmål: unknown): number => {
        let errorCount = 0

        if (Array.isArray(underspørsmål)) {
            for (const spørsmål of underspørsmål) {
                if (spørsmål && typeof spørsmål === 'object' && 'kode' in spørsmål && spørsmål.kode?.message)
                    errorCount++
                if (
                    spørsmål &&
                    typeof spørsmål === 'object' &&
                    'alternativer' in spørsmål &&
                    Array.isArray(spørsmål.alternativer)
                ) {
                    for (const alternativ of spørsmål.alternativer) {
                        if (
                            alternativ &&
                            typeof alternativ === 'object' &&
                            'kode' in alternativ &&
                            alternativ.kode?.message
                        )
                            errorCount++
                        if (
                            alternativ &&
                            typeof alternativ === 'object' &&
                            'navn' in alternativ &&
                            alternativ.navn?.message
                        )
                            errorCount++
                        if (alternativ && typeof alternativ === 'object' && 'underspørsmål' in alternativ) {
                            errorCount += getNestedUnderspørsmålErrors(alternativ.underspørsmål)
                        }
                    }
                }
            }
        }

        return errorCount
    }

    const { hasErrors, errorCount, errorMessages } = getUnderspørsmålErrors()

    return (
        <div
            className={`bg-white ${hasErrors ? 'rounded-lg border-2 border-ax-border-danger p-4' : ''}`}
            style={{ marginLeft: `${indent}px` }}
        >
            {hasErrors && (
                <div className="bg-red-50 border-red-200 mb-4 rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-red-600 font-medium">⚠️ Valideringsfeil ({errorCount} feil)</span>
                    </div>
                    {errorMessages.length > 0 && (
                        <ul className="text-red-700 space-y-1 text-sm">
                            {errorMessages.map((message, index) => (
                                <li key={index}>• {message}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="mb-4 space-y-4">
                {/* Vis kode som readonly */}
                {currentKode && (
                    <div className="text-gray-600 text-sm">
                        <strong>Kode:</strong> {currentKode}
                    </div>
                )}

                <div className="flex items-start gap-4">
                    <Controller
                        name={`${underspørsmålPath}.navn` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Navn"
                                size="small"
                                className="flex-1"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                                error={
                                    errors?.vilkar?.[vilkårIndex]?.underspørsmål?.[
                                        parseInt(underspørsmålPath.split('.')[3])
                                    ]?.navn?.message
                                }
                            />
                        )}
                    />
                    <Controller
                        name={`${underspørsmålPath}.variant` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Variant"
                                size="small"
                                value={field.value || ''}
                                error={
                                    errors?.vilkar?.[vilkårIndex]?.underspørsmål?.[
                                        parseInt(underspørsmålPath.split('.')[3])
                                    ]?.variant?.message
                                }
                            >
                                <option value="">Velg variant</option>
                                <option value="CHECKBOX">Checkbox</option>
                                <option value="RADIO">Radio</option>
                                <option value="SELECT">Select</option>
                            </Select>
                        )}
                    />
                    <Button type="button" variant="tertiary" onClick={onRemove} className="mt-6">
                        Fjern
                    </Button>
                </div>
            </div>

            <div className="mt-6">
                <ExpansionCard
                    size="small"
                    aria-labelledby={`alternativer-${underspørsmålPath}-header`}
                    className={errors?.vilkar?.[vilkårIndex]?.underspørsmål ? 'border-2 border-ax-border-danger' : ''}
                >
                    <ExpansionCard.Header>
                        <ExpansionCard.Title as="h5" size="small" id={`alternativer-${underspørsmålPath}-header`}>
                            {alternativFields.length === 0
                                ? '0 svaralternativer'
                                : `${alternativFields.length} svaralternativ${alternativFields.length === 1 ? '' : 'er'}`}
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <div className="space-y-4">
                            <Button
                                type="button"
                                variant="secondary"
                                icon={<PlusIcon />}
                                size="small"
                                onClick={() =>
                                    appendAlternativ({
                                        kode: '', // Starter tom, vil bli satt til UUID hvis underspørsmål legges til
                                        navn: null,
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    })
                                }
                                className="mt-4"
                            >
                                Legg til svaralternativ
                            </Button>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleAlternativDragEnd}
                            >
                                <SortableContext
                                    items={alternativFields.map((field) => field.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {alternativFields.map((field, alternativIndex) => (
                                        <SortableAlternativCard key={`alternativ-${field.id}`} id={field.id}>
                                            <AlternativSection
                                                control={control}
                                                vilkårIndex={vilkårIndex}
                                                alternativPath={`${underspørsmålPath}.alternativer.${alternativIndex}`}
                                                errors={errors}
                                                onRemove={() => removeAlternativ(alternativIndex)}
                                                level={level}
                                                setValue={setValue}
                                                allKodeOptions={allKodeOptions}
                                            />
                                        </SortableAlternativCard>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </div>
        </div>
    )
}

// Legg til SortableUndersporsmalCard-komponent
const SortableUndersporsmalCard = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <div ref={setNodeRef} style={style} className="flex items-start gap-2">
            <div
                {...attributes}
                {...listeners}
                className="hover:bg-gray-100 mt-2 cursor-grab rounded p-2"
                role="button"
                tabIndex={0}
            >
                <DragVerticalIcon className="text-gray-400 h-5 w-5" />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

// Legg til SortableAlternativCard-komponent for svaralternativer
const SortableAlternativCard = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <div ref={setNodeRef} style={style} className="flex items-start gap-2">
            <div
                {...attributes}
                {...listeners}
                className="hover:bg-gray-100 mt-2 cursor-grab rounded p-2"
                role="button"
                tabIndex={0}
            >
                <DragVerticalIcon className="text-gray-400 h-5 w-5" />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

export const SpørsmålForm = ({ control, index, errors, onRemove, setValue }: VilkårFormProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data: kodeverkData } = useKodeverk()
    const allKodeOptions: KodeOption[] = useMemo(() => {
        if (!kodeverkData) return []
        const options: KodeOption[] = []
        for (const vilkar of kodeverkData.data.vilkar) {
            for (const årsak of vilkar.oppfylt) {
                options.push({ value: årsak.kode, label: `✅ ${årsak.kode} - ${årsak.beskrivelse}` })
            }
            for (const årsak of vilkar.ikkeOppfylt) {
                options.push({ value: årsak.kode, label: `❌ ${årsak.kode} - ${årsak.beskrivelse}` })
            }
        }
        return options.sort((a, b) => a.value.localeCompare(b.value))
    }, [kodeverkData])

    const {
        fields: underspørsmålFields,
        append: appendUnderspørsmål,
        remove: removeUnderspørsmål,
        move: moveUnderspørsmål,
    } = useFieldArray({
        control,
        name: `vilkar.${index}.underspørsmål` as const,
    })

    // DnD-kit setup for underspørsmål
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = underspørsmålFields.findIndex((field) => field.id === active.id)
            const newIndex = underspørsmålFields.findIndex((field) => field.id === over.id)
            moveUnderspørsmål(oldIndex, newIndex)
        }
    }

    const handleDeleteConfirm = () => {
        onRemove()
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 gap-4">
                <Controller
                    name={`vilkar.${index}.paragrafTag` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Paragraf-tag"
                            description="Vises foran vilkåret i spillerom"
                            error={errors?.vilkar?.[index]?.paragrafTag?.message}
                            value={field.value || ''}
                            onChange={(e) => {
                                const newValue = e.target.value
                                // Siden paragrafTag er påkrevd, sett til tom string hvis feltet er tomt
                                field.onChange(newValue)
                            }}
                        />
                    )}
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Underspørsmål</h3>
                    <Button
                        type="button"
                        variant="secondary"
                        icon={<PlusIcon />}
                        size="small"
                        onClick={() =>
                            appendUnderspørsmål({
                                kode: uuidv4(),
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [],
                            })
                        }
                    >
                        Legg til underspørsmål
                    </Button>
                </div>
                {/* Drag and drop context for underspørsmål */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={underspørsmålFields.map((field) => field.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {underspørsmålFields.map((field, underspørsmålIndex) => (
                            <SortableUndersporsmalCard key={`underspørsmål-${field.id}`} id={field.id}>
                                <ExpansionCard aria-label="Underspørsmål" size="small">
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title>
                                            {field.navn || `${getVariantDisplayName(field.variant)} gruppe`}
                                        </ExpansionCard.Title>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <UnderspørsmålSection
                                            control={control}
                                            vilkårIndex={index}
                                            underspørsmålPath={`vilkar.${index}.underspørsmål.${underspørsmålIndex}`}
                                            errors={errors}
                                            onRemove={() => removeUnderspørsmål(underspørsmålIndex)}
                                            setValue={setValue}
                                            allKodeOptions={allKodeOptions}
                                        />
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </SortableUndersporsmalCard>
                        ))}
                    </SortableContext>
                </DndContext>
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
