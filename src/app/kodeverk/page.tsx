'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading, Alert } from '@navikt/ds-react'
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
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DragVerticalIcon } from '@navikt/aksel-icons'

import { Vilkår, Vilkårshjemmel, kodeverkFormSchema, KodeverkForm } from '@/schemas/kodeverk'
import { VilkårForm } from '@/components/old/kodeverk/VilkårForm'
import { ExcelExport } from '@/components/old/kodeverk/ExcelExport'

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    const { lovverk, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} § ${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
}

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
        <div ref={setNodeRef} style={style} className="flex items-start gap-2">
            <div
                {...attributes}
                {...listeners}
                className="mt-6 cursor-grab rounded p-2 hover:bg-gray-100"
                role="button"
                tabIndex={0}
            >
                <DragVerticalIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
                <ExpansionCard {...props}>{children}</ExpansionCard>
            </div>
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
        }),
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
    const [showSuccess, setShowSuccess] = useState(false)
    const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null)

    const saveMutation = useMutation({
        mutationFn: saveKodeverk,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['kodeverk'] })
            setValidationError(null)

            // Hent de oppdaterte dataene og resett skjemaet eksplisitt
            const updatedData = queryClient.getQueryData<KodeverkForm>(['kodeverk'])
            if (updatedData) {
                reset(updatedData)
            }

            // Vis success-melding
            setShowSuccess(true)

            // Fjern eventuell eksisterende timer
            if (successTimer) {
                clearTimeout(successTimer)
            }

            // Sett ny timer for å skjule success-melding etter 4 sekunder
            const timer = setTimeout(() => {
                setShowSuccess(false)
                setSuccessTimer(null)
            }, 4000)
            setSuccessTimer(timer)
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

    // Cleanup timer ved unmount
    useEffect(() => {
        return () => {
            if (successTimer) {
                clearTimeout(successTimer)
            }
        }
    }, [successTimer])

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        if (successTimer) {
            clearTimeout(successTimer)
            setSuccessTimer(null)
        }
    }

    const onSubmit = (data: KodeverkForm) => {
        // Fjern tomme IKKE_RELEVANT arrays
        const cleanedData = {
            ...data,
            vilkar: data.vilkar.map((vilkår) => ({
                ...vilkår,
            })),
        }

        saveMutation.mutate(cleanedData)
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
            oppfylt: [],
            ikkeOppfylt: [],
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
            {showSuccess && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Alert variant="success" closeButton onClose={handleCloseSuccess}>
                        Kodeverket er lagret!
                    </Alert>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center justify-between">
                    <Heading level="1" size="large">
                        Rediger Kodeverk
                    </Heading>
                    <div className="flex gap-4">
                        <ExcelExport kodeverk={{ vilkar: fields }} />
                        <Button type="button" onClick={addVilkår} variant="primary">
                            Legg til vilkår
                        </Button>
                    </div>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field, index) => (
                            <SortableExpansionCard key={field.id} id={field.id} aria-label="Vilkår" className="mb-4">
                                <ExpansionCard.Header>
                                    <ExpansionCard.Title>{field.beskrivelse || 'Nytt vilkår'}</ExpansionCard.Title>
                                    <ExpansionCard.Description>
                                        {field.vilkårshjemmel ? formatParagraf(field.vilkårshjemmel) : ''}
                                    </ExpansionCard.Description>
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
