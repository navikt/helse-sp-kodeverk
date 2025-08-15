'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading, Alert } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
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

import { Hovedspørsmål, hovedspørsmålFormSchema, HovedspørsmålForm } from '@/schemas/saksbehandlergrensesnitt'
import { SpørsmålForm } from '@/components/ui/SpørsmålForm'
import { useKodeverk } from '@/hooks/queries/useKodeverk'

const fetchKodeverk = async (): Promise<HovedspørsmålForm> => {
    const response = await fetch('/api/v2/open/saksbehandlerui')
    if (!response.ok) {
        throw new Error('Failed to fetch kodeverk')
    }
    const arr = await response.json()
    return { vilkar: arr }
}

const saveKodeverk = async (kodeverk: HovedspørsmålForm): Promise<void> => {
    const response = await fetch('/api/v2/saksbehandlerui', {
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
                className="hover:bg-gray-100 mt-6 cursor-grab rounded p-2"
                role="button"
                tabIndex={0}
            >
                <DragVerticalIcon className="text-gray-400 h-5 w-5" />
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
        queryKey: ['saksbehandlergrensesnitt'],
        queryFn: fetchKodeverk,
    })
    const { data: kodeverkData } = useKodeverk()

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
    } = useForm<HovedspørsmålForm>({
        resolver: zodResolver(hovedspørsmålFormSchema),
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
            await queryClient.invalidateQueries({ queryKey: ['saksbehandlergrensesnitt'] })
            setValidationError(null)

            // Hent de oppdaterte dataene og resett skjemaet eksplisitt
            const updatedData = queryClient.getQueryData<HovedspørsmålForm>(['saksbehandlergrensesnitt'])
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

    const onSubmit = (data: HovedspørsmålForm) => {
        saveMutation.mutate(data)
    }

    const addSpørsmål = () => {
        const newVilkår: Hovedspørsmål = {
            kode: crypto.randomUUID(),
            beskrivelse: '',
            kategori: 'generelle_bestemmelser',
            underspørsmål: [],
        }
        append(newVilkår)
    }

    // Watch alle vilkår for å sjekke etter ukjente koder
    const allVilkar = useWatch({ control, name: 'vilkar' }) || []

    // Memoized funksjon for å sjekke etter ukjente koder
    const vilkarWithUnknownCodes = useMemo(() => {
        if (!kodeverkData || !allVilkar) return new Set<number>()

        const alleKjenteKoder = new Set<string>()
        for (const vilkar of kodeverkData.vilkar) {
            for (const årsak of vilkar.oppfylt) {
                alleKjenteKoder.add(årsak.kode)
            }
            for (const årsak of vilkar.ikkeOppfylt) {
                alleKjenteKoder.add(årsak.kode)
            }
        }

        // Rekursiv funksjon for å sjekke alternativer
        const checkAlternativer = (alternativer: any[]): boolean => {
            for (const alternativ of alternativer || []) {
                // Sjekk kun alternativer som IKKE har underspørsmål
                if (!alternativ.harUnderspørsmål && alternativ.kode) {
                    if (!alleKjenteKoder.has(alternativ.kode)) {
                        return true
                    }
                }
                // Rekursivt sjekk underspørsmål
                if (alternativ.underspørsmål) {
                    for (const underspørsmål of alternativ.underspørsmål) {
                        if (checkAlternativer(underspørsmål.alternativer || [])) {
                            return true
                        }
                    }
                }
            }
            return false
        }

        const vilkarWithIssues = new Set<number>()

        // Sjekk alle vilkår
        allVilkar.forEach((vilkar: any, index: number) => {
            if (!vilkar) return

            // Sjekk alle underspørsmål
            for (const underspørsmål of vilkar.underspørsmål || []) {
                if (checkAlternativer(underspørsmål.alternativer || [])) {
                    vilkarWithIssues.add(index)
                    break
                }
            }
        })

        return vilkarWithIssues
    }, [kodeverkData, allVilkar])

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
                        Grensesnitt er lagret!
                    </Alert>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center justify-between">
                    <Heading level="1" size="large">
                        Rediger saksbehandlergrensesnitt
                    </Heading>
                    <div className="flex gap-4">
                        <Button type="button" onClick={addSpørsmål} variant="primary">
                            Legg til spørsmål
                        </Button>
                    </div>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field, index) => {
                            const hasUnknownCodes = vilkarWithUnknownCodes.has(index)
                            return (
                                <SortableExpansionCard
                                    key={field.id}
                                    id={field.id}
                                    aria-label="Spørsmål"
                                    className="mb-4"
                                >
                                    <ExpansionCard.Header>
                                        <ExpansionCard.Title>
                                            {field.beskrivelse || 'Nytt spørsmål'}
                                        </ExpansionCard.Title>
                                        {hasUnknownCodes && (
                                            <ExpansionCard.Description>
                                                ⚠️ Dette spørsmålet inneholder svaralternativer med koder som ikke
                                                finnes i kodeverket
                                            </ExpansionCard.Description>
                                        )}
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <SpørsmålForm
                                            control={control}
                                            index={index}
                                            errors={errors}
                                            onRemove={() => remove(index)}
                                            setValue={setValue}
                                        />
                                    </ExpansionCard.Content>
                                </SortableExpansionCard>
                            )
                        })}
                    </SortableContext>
                </DndContext>
            </form>
        </div>
    )
}

export default Page
