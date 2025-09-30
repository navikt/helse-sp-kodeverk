'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button, ErrorSummary, Heading, Alert, ToggleGroup, Textarea } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray, useWatch, FieldErrors } from 'react-hook-form'
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
import { MetadataVisning } from '@/components/MetadataVisning'
import { KonfliktModal } from '@/components/KonfliktModal'
import { useKodeverk } from '@/hooks/queries/useKodeverk'
import { useSaksbehandlerui } from '@hooks/queries/useSaksbehandlerui'
import { useBrukerinfo } from '@hooks/queries/useBrukerinfo'
import { useSaksbehandleruiMutation } from '@hooks/mutations/useSaksbehandleruiMutation'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'

// Funksjon for å sjekke om et hovedspørsmål har valideringsfeil og returnere antall feil
const getHovedspørsmålErrors = (
    index: number,
    errors: FieldErrors<HovedspørsmålForm>,
): { hasErrors: boolean; errorCount: number } => {
    const spørsmålErrors = errors?.vilkar?.[index]
    if (!spørsmålErrors) return { hasErrors: false, errorCount: 0 }

    let errorCount = 0

    // Sjekk hovedfeltene
    if (spørsmålErrors.kode?.message) errorCount++
    if (spørsmålErrors.beskrivelse?.message) errorCount++
    if (spørsmålErrors.kategori?.message) errorCount++

    // Sjekk underspørsmål array
    if (spørsmålErrors.underspørsmål) {
        for (let i = 0; i < (spørsmålErrors.underspørsmål.length || 0); i++) {
            const underspørsmålError = spørsmålErrors.underspørsmål[i]
            if (underspørsmålError?.kode?.message) errorCount++
            if (underspørsmålError?.alternativer) {
                for (let j = 0; j < (underspørsmålError.alternativer.length || 0); j++) {
                    const alternativError = underspørsmålError.alternativer[j]
                    if (alternativError?.kode?.message) errorCount++
                    if (alternativError?.navn?.message) errorCount++
                    if (alternativError?.underspørsmål) {
                        // Rekursivt sjekk nested underspørsmål
                        const nestedErrors = getNestedUnderspørsmålErrors(alternativError.underspørsmål)
                        errorCount += nestedErrors
                    }
                }
            }
        }
    }

    return { hasErrors: errorCount > 0, errorCount }
}

// Hjelpefunksjon for å sjekke nested underspørsmål
const getNestedUnderspørsmålErrors = (underspørsmål: unknown): number => {
    let errorCount = 0

    if (Array.isArray(underspørsmål)) {
        for (const spørsmål of underspørsmål) {
            if (spørsmål && typeof spørsmål === 'object' && 'kode' in spørsmål && spørsmål.kode?.message) errorCount++
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
                <ExpansionCard size="small" {...props}>
                    {children}
                </ExpansionCard>
            </div>
        </div>
    )
}

const Page = () => {
    const { data: serverKodeverk, isLoading } = useSaksbehandlerui()
    const { data: kodeverkData } = useKodeverk()
    const { data: brukerinfo } = useBrukerinfo()
    const saveMutation = useSaksbehandleruiMutation()

    const { control, handleSubmit, formState, reset, setValue } = useForm<HovedspørsmålForm>({
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
    const [konfliktProblem, setKonfliktProblem] = useState<{
        status: number
        type: string
        title?: string
        detail?: string | null
        instance?: string | null
        lastModifiedBy?: string
        lastModifiedAt?: string
        expectedVersion?: string
        currentVersion?: string
    } | null>(null)
    const [editMode, setEditMode] = useState<'form' | 'json'>('form')
    const [jsonText, setJsonText] = useState('')
    const [jsonError, setJsonError] = useState<string | null>(null)

    useEffect(() => {
        if (serverKodeverk?.data) {
            reset({ vilkar: serverKodeverk.data })
            setJsonText(JSON.stringify(serverKodeverk.data, null, 2))
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

    const handleCloseKonflikt = () => {
        setKonfliktProblem(null)
    }

    const handleModeChange = (mode: 'form' | 'json') => {
        if (mode === 'json') {
            // Konverter form data til JSON
            const formData = formState.defaultValues
            if (formData?.vilkar) {
                setJsonText(JSON.stringify(formData.vilkar, null, 2))
            }
        } else {
            // Konverter JSON til form data
            try {
                const parsedData = JSON.parse(jsonText)
                reset({ vilkar: parsedData })
                setJsonError(null)
            } catch (error) {
                setJsonError('Ugyldig JSON-format')
            }
        }
        setEditMode(mode)
    }

    const handleJsonChange = (value: string) => {
        setJsonText(value)
        setJsonError(null)

        // Valider JSON i sanntid
        try {
            JSON.parse(value)
        } catch (error) {
            setJsonError('Ugyldig JSON-format')
        }
    }

    const onSubmit = (data?: HovedspørsmålForm) => {
        let dataToSubmit: HovedspørsmålForm

        if (editMode === 'json') {
            // Hvis vi er i JSON-modus, parse JSON og valider
            try {
                const parsedData = JSON.parse(jsonText)
                dataToSubmit = { vilkar: parsedData }
            } catch (error) {
                setJsonError('Ugyldig JSON-format')
                return
            }
        } else {
            // Hvis vi er i form-modus, bruk form data
            dataToSubmit = data || { vilkar: [] }
        }

        // Oppdater metadata kun for hovedspørsmål som er endret
        const cleanedData = {
            ...dataToSubmit,
            vilkar: dataToSubmit.vilkar.map((hovedspørsmål, index) => {
                // Sammenlign med original data for å sjekke om endringer er gjort
                const originalHovedspørsmål = serverKodeverk?.data?.[index]

                const isHovedspørsmålEndret =
                    !originalHovedspørsmål ||
                    hovedspørsmål.beskrivelse !== originalHovedspørsmål.beskrivelse ||
                    hovedspørsmål.kode !== originalHovedspørsmål.kode ||
                    hovedspørsmål.kategori !== originalHovedspørsmål.kategori ||
                    JSON.stringify(hovedspørsmål.underspørsmål) !== JSON.stringify(originalHovedspørsmål.underspørsmål)

                // Hvis hovedspørsmålet er endret, oppdater metadata
                if (isHovedspørsmålEndret) {
                    return {
                        ...hovedspørsmål,
                        sistEndretAv: brukerinfo?.navn || 'unknown',
                        sistEndretDato: new Date().toISOString(),
                    }
                }

                // Hvis ikke endret, behold eksisterende metadata
                return {
                    ...hovedspørsmål,
                    sistEndretAv: originalHovedspørsmål?.sistEndretAv || hovedspørsmål.sistEndretAv,
                    sistEndretDato: originalHovedspørsmål?.sistEndretDato || hovedspørsmål.sistEndretDato,
                }
            }),
        }

        saveMutation.mutate(
            {
                data: cleanedData.vilkar,
                etag: serverKodeverk?.etag,
            },
            {
                onSuccess: () => {
                    setValidationError(null)
                    setKonfliktProblem(null)
                    setJsonError(null)

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
                    if (error instanceof ProblemDetailsError && error.problem.status === 409) {
                        setKonfliktProblem(error.problem)
                    } else {
                        setValidationError(error.message)
                    }
                },
            },
        )
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
    const watchedVilkar = useWatch({ control, name: 'vilkar' })

    // Memoized funksjon for å sjekke etter ukjente koder
    const vilkarWithUnknownCodes = useMemo(() => {
        const allVilkar = watchedVilkar || []
        if (!kodeverkData?.data?.vilkar || !allVilkar) return new Set<number>()

        const alleKjenteKoder = new Set<string>()
        for (const vilkar of kodeverkData.data.vilkar) {
            for (const årsak of vilkar.oppfylt) {
                alleKjenteKoder.add(årsak.kode)
            }
            for (const årsak of vilkar.ikkeOppfylt) {
                alleKjenteKoder.add(årsak.kode)
            }
        }

        // Rekursiv funksjon for å sjekke alternativer
        const checkAlternativer = (alternativer: unknown[]): boolean => {
            for (const alternativ of alternativer || []) {
                // Type guard for alternativ
                if (typeof alternativ !== 'object' || alternativ === null) continue
                const alt = alternativ as Record<string, unknown>

                // Sjekk kun alternativer som IKKE har underspørsmål
                if (!alt.harUnderspørsmål && typeof alt.kode === 'string') {
                    if (!alleKjenteKoder.has(alt.kode)) {
                        return true
                    }
                }
                // Rekursivt sjekk underspørsmål
                if (Array.isArray(alt.underspørsmål)) {
                    for (const underspørsmål of alt.underspørsmål) {
                        if (typeof underspørsmål === 'object' && underspørsmål !== null) {
                            const undersp = underspørsmål as Record<string, unknown>
                            if (Array.isArray(undersp.alternativer) && checkAlternativer(undersp.alternativer)) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }

        const vilkarWithIssues = new Set<number>()

        // Sjekk alle vilkår
        allVilkar.forEach((vilkar: Hovedspørsmål | undefined, index: number) => {
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
    }, [kodeverkData, watchedVilkar])

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
            {jsonError && (
                <ErrorSummary heading="JSON-feil:">
                    <ErrorSummary.Item>{jsonError}</ErrorSummary.Item>
                </ErrorSummary>
            )}
            {(formState.isDirty ||
                (editMode === 'json' && jsonText !== JSON.stringify(serverKodeverk?.data || [], null, 2))) && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Button onClick={() => onSubmit()} loading={saveMutation.isPending} variant="primary">
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
            {konfliktProblem && (
                <KonfliktModal isOpen={!!konfliktProblem} onClose={handleCloseKonflikt} problem={konfliktProblem} />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center justify-between">
                    <Heading level="1" size="large">
                        Rediger saksbehandlergrensesnitt
                    </Heading>
                    <div className="flex gap-4">
                        <ToggleGroup
                            value={editMode}
                            onChange={(value) => handleModeChange(value as 'form' | 'json')}
                            size="small"
                        >
                            <ToggleGroup.Item value="form">Form</ToggleGroup.Item>
                            <ToggleGroup.Item value="json">JSON</ToggleGroup.Item>
                        </ToggleGroup>
                        {editMode === 'form' && (
                            <Button type="button" onClick={addSpørsmål} variant="primary">
                                Legg til spørsmål
                            </Button>
                        )}
                    </div>
                </div>
                {editMode === 'form' ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                            {fields.map((field, index) => {
                                const hasUnknownCodes = vilkarWithUnknownCodes.has(index)
                                const { hasErrors, errorCount } = getHovedspørsmålErrors(index, formState.errors)
                                const hasNoUnderspørsmål = !field.underspørsmål || field.underspørsmål.length === 0

                                return (
                                    <SortableExpansionCard
                                        key={field.id}
                                        id={field.id}
                                        aria-label="Spørsmål"
                                        className={`mb-4 ${hasErrors ? 'border-2 border-ax-border-danger' : ''}`}
                                    >
                                        <ExpansionCard.Header>
                                            <ExpansionCard.Title className="flex items-center gap-2">
                                                {field.beskrivelse || 'Nytt spørsmål'}
                                                {hasErrors && (
                                                    <span className="text-red-500 text-sm font-medium">
                                                        ({errorCount} feil)
                                                    </span>
                                                )}
                                            </ExpansionCard.Title>
                                            <ExpansionCard.Description>
                                                {(hasUnknownCodes || hasNoUnderspørsmål) && (
                                                    <>
                                                        {hasUnknownCodes &&
                                                            '⚠️ Dette spørsmålet inneholder svaralternativer med koder som ikke finnes i kodeverket'}
                                                        {hasNoUnderspørsmål &&
                                                            '⚠️ Dette spørsmålet har ingen underspørsmål'}
                                                    </>
                                                )}
                                                <MetadataVisning
                                                    sistEndretAv={field.sistEndretAv}
                                                    sistEndretDato={field.sistEndretDato}
                                                    size="small"
                                                    className="mt-2"
                                                />
                                            </ExpansionCard.Description>
                                        </ExpansionCard.Header>
                                        <ExpansionCard.Content>
                                            <SpørsmålForm
                                                control={control}
                                                index={index}
                                                errors={formState.errors}
                                                onRemove={() => remove(index)}
                                                setValue={setValue}
                                            />
                                        </ExpansionCard.Content>
                                    </SortableExpansionCard>
                                )
                            })}
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="json-editor" className="text-gray-700 mb-2 block text-sm font-medium">
                                JSON-redigering
                            </label>
                            <Textarea
                                id="json-editor"
                                label="JSON-redigering"
                                value={jsonText}
                                onChange={(e) => handleJsonChange(e.target.value)}
                                rows={20}
                                className="font-mono text-sm"
                                placeholder="Rediger JSON her..."
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Page
