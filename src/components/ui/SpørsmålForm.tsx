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
import { Button, Checkbox, ExpansionCard, Heading, Modal, Select, TextField } from '@navikt/ds-react'
import { useState } from 'react'
import { Control, Controller, FieldErrors, useFieldArray, useWatch, UseFormSetValue, FieldPath } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { kategoriLabels } from '@/kodeverk/lokalSaksbehandlerui'
import { HovedspørsmålForm } from '@/schemas/saksbehandlergrensesnitt'

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
}

interface AlternativSectionProps {
    control: Control<HovedspørsmålForm>
    vilkårIndex: number
    alternativPath: string
    errors: FieldErrors<HovedspørsmålForm>
    onRemove: () => void
    level?: number
    setValue?: UseFormSetValue<HovedspørsmålForm>
}

const AlternativSection = ({
    control,
    vilkårIndex,
    alternativPath,
    errors,
    onRemove,
    level = 0,
    setValue,
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
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4" style={{ marginLeft: `${indent}px` }}>
            <div className="mb-4 space-y-4">
                <div className="flex items-start gap-4">
                    {/* Vis bare kodeinput hvis alternativet IKKE har underspørsmål */}
                    {!harUnderspørsmål && (
                        <Controller
                            name={`${alternativPath}.kode` as FieldPath<HovedspørsmålForm>}
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Kode" size="small" value={field.value || ''} />
                            )}
                        />
                    )}
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

                {/* Checkbox for å kontrollere om alternativet har underspørsmål */}
                <div className="flex items-center gap-4">
                    <Controller
                        name={`${alternativPath}.harUnderspørsmål` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                checked={field.value || false}
                                onChange={(e) => {
                                    const hasSubquestions = e.target.checked
                                    field.onChange(hasSubquestions)

                                    if (hasSubquestions) {
                                        // Sjekk om koden er en gyldig UUID
                                        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(currentKode || '')
                                        
                                        // Generer UUID hvis kode ikke eksisterer eller ikke er en UUID
                                        if (!currentKode || currentKode === '' || !isUuid) {
                                            setValue?.(
                                                `${alternativPath}.kode` as FieldPath<HovedspørsmålForm>,
                                                uuidv4(),
                                            )
                                        }
                                    } else {
                                        // Tøm underspørsmål når checkbox deaktiveres
                                        setValue?.(
                                            `${alternativPath}.underspørsmål` as FieldPath<HovedspørsmålForm>,
                                            [],
                                        )
                                    }
                                }}
                            >
                                Har underspørsmål
                            </Checkbox>
                        )}
                    />
                    {harUnderspørsmål && (
                        <span className="text-sm text-gray-600">Kode: {currentKode || 'Genereres automatisk'}</span>
                    )}
                </div>
            </div>

            {/* Vis underspørsmål og knapp kun hvis checkbox er aktivert */}
            {harUnderspørsmål && (
                <>
                    {/* Nested underspørsmål for this alternativ */}
                    {nestedUnderspørsmålFields.length > 0 && (
                        <div className="mt-6">
                            <h6 className="mb-3 text-sm font-medium text-gray-700">
                                Underspørsmål for dette alternativet
                            </h6>
                            <div className="space-y-4">
                                {nestedUnderspørsmålFields.map((field, nestedIndex) => (
                                    <UnderspørsmålSection
                                        key={field.id}
                                        control={control}
                                        vilkårIndex={vilkårIndex}
                                        underspørsmålPath={`${alternativPath}.underspørsmål.${nestedIndex}`}
                                        errors={errors}
                                        onRemove={() => removeNestedUnderspørsmål(nestedIndex)}
                                        level={level + 1}
                                        setValue={setValue}
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
                                const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(currentKode || '')
                                
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
}: UnderspørsmålSectionProps) => {
    const {
        fields: alternativFields,
        append: appendAlternativ,
        remove: removeAlternativ,
    } = useFieldArray({
        control,
        name: `${underspørsmålPath}.alternativer` as `vilkar.${number}.underspørsmål.${number}.alternativer`,
    })

    const indent = level * 20

    // Watch current kode value for display
    const currentKode = useWatch({
        control,
        name: `${underspørsmålPath}.kode` as FieldPath<HovedspørsmålForm>,
    })

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4" style={{ marginLeft: `${indent}px` }}>
            <div className="mb-4 space-y-4">
                {/* Vis kode som readonly */}
                {currentKode && (
                    <div className="text-sm text-gray-600">
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
                            />
                        )}
                    />
                    <Controller
                        name={`${underspørsmålPath}.variant` as FieldPath<HovedspørsmålForm>}
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Variant" size="small" value={field.value || ''}>
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
                <h5 className="mb-3 text-sm font-medium">Alternativer</h5>
                <div className="space-y-4">
                    {alternativFields.map((field, alternativIndex) => (
                        <AlternativSection
                            key={field.id}
                            control={control}
                            vilkårIndex={vilkårIndex}
                            alternativPath={`${underspørsmålPath}.alternativer.${alternativIndex}`}
                            errors={errors}
                            onRemove={() => removeAlternativ(alternativIndex)}
                            level={level}
                            setValue={setValue}
                        />
                    ))}
                </div>
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
                    Legg til alternativ
                </Button>
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
                className="mt-2 cursor-grab rounded p-2 hover:bg-gray-100"
                role="button"
                tabIndex={0}
            >
                <DragVerticalIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

export const SpørsmålForm = ({ control, index, errors, onRemove, setValue }: VilkårFormProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

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
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
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
                            <SortableUndersporsmalCard key={field.id} id={field.id}>
                                <ExpansionCard aria-label="Underspørsmål">
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title>
                                            {field.navn || field.kode || 'Nytt underspørsmål'}
                                        </ExpansionCard.Title>
                                        <ExpansionCard.Description>
                                            {field.kode && field.navn ? `Kode: ${field.kode}` : ''}
                                        </ExpansionCard.Description>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <UnderspørsmålSection
                                            control={control}
                                            vilkårIndex={index}
                                            underspørsmålPath={`vilkar.${index}.underspørsmål.${underspørsmålIndex}`}
                                            errors={errors}
                                            onRemove={() => removeUnderspørsmål(underspørsmålIndex)}
                                            setValue={setValue}
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
