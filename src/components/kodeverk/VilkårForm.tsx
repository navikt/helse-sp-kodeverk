'use client'

import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import {
    Button,
    Select,
    TextField,
    Modal,
    Heading,
    Switch,
    RadioGroup,
    Radio,
    ExpansionCard,
    Stack,
} from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    KeyboardSensor,
} from '@dnd-kit/core'
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DragVerticalIcon } from '@navikt/aksel-icons'

import { kategoriLabels } from '@/kodeverk/lokalUtviklingKodeverkV2'
import { KodeverkForm } from '@schemas/kodeverkV2'

import { VilkårshjemmelForm } from './VilkårshjemmelForm'

interface VilkårFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
}

interface UnderspørsmålSectionProps {
    control: Control<KodeverkForm>
    vilkårIndex: number
    underspørsmålPath: string
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
    level?: number
}

interface AlternativSectionProps {
    control: Control<KodeverkForm>
    vilkårIndex: number
    alternativPath: string
    errors: FieldErrors<KodeverkForm>
    onRemove: () => void
    level?: number
}

const AlternativSection = ({
    control,
    vilkårIndex,
    alternativPath,
    errors,
    onRemove,
    level = 0,
}: AlternativSectionProps) => {
    const {
        fields: nestedUnderspørsmålFields,
        append: appendNestedUnderspørsmål,
        remove: removeNestedUnderspørsmål,
    } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: `${alternativPath}.underspørsmål` as any,
    })

    const indent = level * 20

    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4" style={{ marginLeft: `${indent}px` }}>
            <div className="mb-4 flex items-start gap-4">
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${alternativPath}.kode` as any}
                    control={control}
                    render={({ field }) => <TextField {...field} label="Kode" size="small" value={field.value || ''} />}
                />
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${alternativPath}.navn` as any}
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

            <div className="mb-4">
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${alternativPath}.oppfylt` as any}
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend="Oppfylt"
                            size="small"
                            value={field.value || 'N/A'}
                            onChange={(value) => field.onChange(value)}
                        >
                            <Stack gap="0 6" direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                                <Radio value="OPPFYLT">Oppfylt</Radio>
                                <Radio value="IKKE_OPPFYLT">Ikke oppfylt</Radio>
                                <Radio value="N/A">N/A</Radio>
                            </Stack>
                        </RadioGroup>
                    )}
                />
            </div>

            <div className="mt-4 rounded bg-gray-100 p-3">
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${alternativPath}.vilkårshjemmel` as any}
                    control={control}
                    render={({ field }) => (
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <Switch
                                    size="small"
                                    checked={!!field.value}
                                    onChange={(event) => {
                                        const checked = event.target.checked
                                        if (checked) {
                                            field.onChange({
                                                lovverk: '',
                                                lovverksversjon: '',
                                                paragraf: '',
                                                ledd: null,
                                                setning: null,
                                                bokstav: null,
                                            })
                                        } else {
                                            field.onChange(null)
                                        }
                                    }}
                                >
                                    Har vilkårshjemmel
                                </Switch>
                            </div>

                            {field.value && (
                                <div>
                                    <h6 className="mb-3 text-sm font-medium text-gray-700">
                                        Vilkårshjemmel for alternativ
                                    </h6>
                                    <VilkårshjemmelForm
                                        control={control}
                                        index={vilkårIndex}
                                        alternativPath={alternativPath}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>

            {/* Nested underspørsmål for this alternativ */}
            {nestedUnderspørsmålFields.length > 0 && (
                <div className="mt-6">
                    <h6 className="mb-3 text-sm font-medium text-gray-700">Underspørsmål for dette alternativet</h6>
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
                    onClick={() =>
                        appendNestedUnderspørsmål({
                            kode: '',
                            navn: null,
                            variant: 'RADIO',
                            alternativer: [],
                        })
                    }
                >
                    Legg til underspørsmål
                </Button>
            </div>
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
}: UnderspørsmålSectionProps) => {
    const {
        fields: alternativFields,
        append: appendAlternativ,
        remove: removeAlternativ,
    } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: `${underspørsmålPath}.alternativer` as any,
    })

    const indent = level * 20

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4" style={{ marginLeft: `${indent}px` }}>
            <div className="mb-4 flex items-start gap-4">
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${underspørsmålPath}.kode` as any}
                    control={control}
                    render={({ field }) => <TextField {...field} label="Kode" size="small" value={field.value || ''} />}
                />
                <Controller
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${underspørsmålPath}.navn` as any}
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={`${underspørsmålPath}.variant` as any}
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
                            kode: '',
                            navn: null,
                            oppfylt: 'N/A',
                            vilkårshjemmel: null,
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

export const VilkårForm = ({ control, index, errors, onRemove }: VilkårFormProps) => {
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

            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <h4 className="text-md mb-4 font-medium text-gray-700">Hovedvilkårshjemmel</h4>
                <VilkårshjemmelForm control={control} index={index} />
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
                                kode: '',
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
