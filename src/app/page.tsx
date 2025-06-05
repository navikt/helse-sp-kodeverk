'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Vilkår, kodeverkFormSchema, KodeverkForm } from '@/kodeverk/kodeverk'
import { VilkårForm } from '@/components/kodeverk/VilkårForm'

const fetchKodeverk = async (): Promise<KodeverkForm> => {
    const response = await fetch('/api/v1/open/kodeverk')
    if (!response.ok) {
        throw new Error('Failed to fetch kodeverk')
    }
    const arr = await response.json()
    return { vilkar: arr }
}

const saveKodeverk = async (kodeverk: KodeverkForm): Promise<void> => {
    const response = await fetch('/api/v1/kodeverk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kodeverk.vilkar), // send kun array til API
    })
    if (!response.ok) {
        throw new Error('Failed to save kodeverk')
    }
}

interface SortableExpansionCardProps {
    id: string
    children: React.ReactNode
    'aria-label': string
    className?: string
}

const SortableExpansionCard = ({ id, children, ...props }: SortableExpansionCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ExpansionCard {...props}>{children}</ExpansionCard>
        </div>
    )
}

const Page = () => {
    const queryClient = useQueryClient()
    const { data: serverKodeverk, isLoading } = useQuery({
        queryKey: ['kodeverk'],
        queryFn: fetchKodeverk,
    })

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<KodeverkForm>({
        resolver: zodResolver(kodeverkFormSchema),
        defaultValues: { vilkar: [] },
    })

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'vilkar',
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((field) => field.id === active.id)
            const newIndex = fields.findIndex((field) => field.id === over.id)
            move(oldIndex, newIndex)
        }
    }

    const [validationError, setValidationError] = useState<string | null>(null)

    const saveMutation = useMutation({
        mutationFn: saveKodeverk,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kodeverk'] })
            setValidationError(null)
        },
        onError: (error: Error) => {
            setValidationError(error.message)
        },
    })

    useEffect(() => {
        if (serverKodeverk) {
            reset(serverKodeverk)
        }
    }, [serverKodeverk, reset])

    const onSubmit = (data: KodeverkForm) => {
        saveMutation.mutate(data)
    }

    const addVilkår = () => {
        const newVilkår: Vilkår = {
            vilkårshjemmel: {
                lovverk: '',
                lovverksversjon: '',
                paragraf: '',
                ledd: null,
                setning: null,
                bokstav: null,
            },
            vilkårskode: '',
            beskrivelse: '',
            kategori: '',
            mulige_resultater: {
                OPPFYLT: [],
                IKKE_OPPFYLT: [],
                IKKE_RELEVANT: [],
            },
        }
        append(newVilkår)
    }

    if (isLoading) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="p-6">
            {validationError && (
                <ErrorSummary heading="For å gå videre må du rette opp følgende:">
                    <ErrorSummary.Item>{validationError}</ErrorSummary.Item>
                </ErrorSummary>
            )}
            {isDirty && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Button onClick={handleSubmit(onSubmit)} loading={saveMutation.isPending} variant="primary">
                        Lagre endringer
                    </Button>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center justify-between">
                    <Heading level="1" size="large">
                        Rediger Kodeverk
                    </Heading>
                    <Button type="button" onClick={addVilkår} variant="primary">
                        Legg til vilkår
                    </Button>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field, index) => (
                            <SortableExpansionCard key={field.id} id={field.id} aria-label="Vilkår" className="mb-4">
                                <ExpansionCard.Header>
                                    <ExpansionCard.Title>{field.beskrivelse || 'Nytt vilkår'}</ExpansionCard.Title>
                                </ExpansionCard.Header>
                                <ExpansionCard.Content>
                                    <VilkårForm
                                        control={control}
                                        index={index}
                                        errors={errors}
                                        onRemove={() => remove(index)}
                                    />
                                </ExpansionCard.Content>
                            </SortableExpansionCard>
                        ))}
                    </SortableContext>
                </DndContext>
            </form>
        </div>
    )
}

export default Page
