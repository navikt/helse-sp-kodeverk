'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading, Alert } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Vilkår, Vilkårshjemmel, kodeverkFormSchema, KodeverkForm } from '@/schemas/kodeverk'
import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'
import { VilkårForm } from '@/components/kodeverk/VilkårForm'
import { ExcelExport } from '@/components/kodeverk/ExcelExport'
import { useKodeverk } from '@hooks/queries/useKodeverk'
import { useSaksbehandlerui } from '@hooks/queries/useSaksbehandlerui'

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} §${kapittel}-${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
}

const saveKodeverk = async (kodeverk: KodeverkForm): Promise<void> => {
    const response = await fetch('/api/v2/kodeverk', {
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

// Type for fields med id fra useFieldArray
type FieldWithId = Vilkår & { id: string }

// Funksjon for å sortere vilkår basert på lovverk, kapittel og paragraf
const sortVilkår = (vilkår: FieldWithId[]): FieldWithId[] => {
    return [...vilkår].sort((a, b) => {
        // Nye vilkår (uten lovverk) skal vises øverst
        if (!a.vilkårshjemmel.lovverk && !b.vilkårshjemmel.lovverk) return 0
        if (!a.vilkårshjemmel.lovverk) return -1
        if (!b.vilkårshjemmel.lovverk) return 1

        // Sorter på lovverk
        const lovverkCompare = a.vilkårshjemmel.lovverk.localeCompare(b.vilkårshjemmel.lovverk)
        if (lovverkCompare !== 0) return lovverkCompare

        // Sorter på kapittel (numerisk)
        const kapittelA = parseInt(a.vilkårshjemmel.kapittel) || 0
        const kapittelB = parseInt(b.vilkårshjemmel.kapittel) || 0
        if (kapittelA !== kapittelB) return kapittelA - kapittelB

        // Sorter på paragraf (numerisk)
        const paragrafA = parseInt(a.vilkårshjemmel.paragraf) || 0
        const paragrafB = parseInt(b.vilkårshjemmel.paragraf) || 0
        if (paragrafA !== paragrafB) return paragrafA - paragrafB

        // Sorter på ledd
        const leddA = a.vilkårshjemmel.ledd ? parseInt(a.vilkårshjemmel.ledd.toString()) : 0
        const leddB = b.vilkårshjemmel.ledd ? parseInt(b.vilkårshjemmel.ledd.toString()) : 0
        if (leddA !== leddB) return leddA - leddB

        // Sorter på setning
        const setningA = a.vilkårshjemmel.setning ? parseInt(a.vilkårshjemmel.setning.toString()) : 0
        const setningB = b.vilkårshjemmel.setning ? parseInt(b.vilkårshjemmel.setning.toString()) : 0
        if (setningA !== setningB) return setningA - setningB

        // Sorter på bokstav
        const bokstavA = a.vilkårshjemmel.bokstav || ''
        const bokstavB = b.vilkårshjemmel.bokstav || ''
        return bokstavA.localeCompare(bokstavB)
    })
}

// Funksjon for å sjekke om et vilkår har valideringsfeil og returnere antall feil
const getVilkårErrors = (
    index: number,
    errors: FieldErrors<KodeverkForm>,
): { hasErrors: boolean; errorCount: number } => {
    const vilkårErrors = errors?.vilkar?.[index]
    if (!vilkårErrors) return { hasErrors: false, errorCount: 0 }

    let errorCount = 0

    // Sjekk hovedfeltene
    if (vilkårErrors.vilkårskode?.message) errorCount++
    if (vilkårErrors.beskrivelse?.message) errorCount++

    // Sjekk vilkårshjemmel
    const hjemmelErrors = vilkårErrors.vilkårshjemmel
    if (hjemmelErrors?.lovverk?.message) errorCount++
    if (hjemmelErrors?.lovverksversjon?.message) errorCount++
    if (hjemmelErrors?.kapittel?.message) errorCount++
    if (hjemmelErrors?.paragraf?.message) errorCount++

    // Sjekk oppfylt array
    if (vilkårErrors.oppfylt) {
        for (let i = 0; i < (vilkårErrors.oppfylt.length || 0); i++) {
            const oppfyltError = vilkårErrors.oppfylt[i]
            if (oppfyltError?.kode?.message) errorCount++
            if (oppfyltError?.beskrivelse?.message) errorCount++
            if (oppfyltError?.vilkårshjemmel) errorCount++
        }
    }

    // Sjekk ikkeOppfylt array
    if (vilkårErrors.ikkeOppfylt) {
        for (let i = 0; i < (vilkårErrors.ikkeOppfylt.length || 0); i++) {
            const ikkeOppfyltError = vilkårErrors.ikkeOppfylt[i]
            if (ikkeOppfyltError?.kode?.message) errorCount++
            if (ikkeOppfyltError?.beskrivelse?.message) errorCount++
            if (ikkeOppfyltError?.vilkårshjemmel) errorCount++
        }
    }

    return { hasErrors: errorCount > 0, errorCount }
}

// Funksjon for å sjekke om et vilkår har begrunnelser som ikke finnes i saksbehandlergrensesnittet
const getVilkårWithUnknownBegrunnelser = (
    vilkår: (Vilkår & { id?: string })[],
    saksbehandlerui: HovedspørsmålArray | undefined,
): Set<number> => {
    if (!saksbehandlerui || !vilkår) return new Set<number>()

    // Samle alle tilgjengelige koder fra saksbehandlergrensesnittet
    const alleTilgjengeligeKoder = new Set<string>()

    // Rekursiv funksjon for å samle alle koder fra saksbehandlergrensesnittet
    const samleKoder = (alternativer: unknown[]) => {
        for (const alternativ of alternativer || []) {
            if (typeof alternativ === 'object' && alternativ !== null) {
                const alt = alternativ as Record<string, unknown>
                if (typeof alt.kode === 'string') {
                    alleTilgjengeligeKoder.add(alt.kode)
                }
                if (Array.isArray(alt.underspørsmål)) {
                    for (const underspørsmål of alt.underspørsmål) {
                        if (typeof underspørsmål === 'object' && underspørsmål !== null) {
                            const undersp = underspørsmål as Record<string, unknown>
                            if (Array.isArray(undersp.alternativer)) {
                                samleKoder(undersp.alternativer)
                            }
                        }
                    }
                }
            }
        }
    }

    // Gå gjennom alle hovedspørsmål og samle koder
    for (const hovedspørsmål of saksbehandlerui) {
        for (const underspørsmål of hovedspørsmål.underspørsmål || []) {
            if (Array.isArray(underspørsmål.alternativer)) {
                samleKoder(underspørsmål.alternativer)
            }
        }
    }

    // Sjekk hvilke vilkår som har begrunnelser som ikke finnes
    const vilkårWithIssues = new Set<number>()

    vilkår.forEach((vilkår, index) => {
        // Sjekk oppfylt begrunnelser
        for (const begrunnelse of vilkår.oppfylt || []) {
            if (!alleTilgjengeligeKoder.has(begrunnelse.kode)) {
                vilkårWithIssues.add(index)
                break
            }
        }

        // Sjekk ikkeOppfylt begrunnelser
        for (const begrunnelse of vilkår.ikkeOppfylt || []) {
            if (!alleTilgjengeligeKoder.has(begrunnelse.kode)) {
                vilkårWithIssues.add(index)
                break
            }
        }
    })

    return vilkårWithIssues
}

// Funksjon for å sjekke om et vilkår har begrunnelser
const getVilkårWithoutBegrunnelser = (vilkår: (Vilkår & { id?: string })[]): Set<number> => {
    const vilkårWithoutBegrunnelser = new Set<number>()

    vilkår.forEach((vilkår, index) => {
        const hasOppfylt = vilkår.oppfylt && vilkår.oppfylt.length > 0
        const hasIkkeOppfylt = vilkår.ikkeOppfylt && vilkår.ikkeOppfylt.length > 0

        if (!hasOppfylt && !hasIkkeOppfylt) {
            vilkårWithoutBegrunnelser.add(index)
        }
    })

    return vilkårWithoutBegrunnelser
}

const Page = () => {
    const queryClient = useQueryClient()
    const { data: serverKodeverk, isLoading } = useKodeverk()
    const { data: saksbehandleruiData } = useSaksbehandlerui()

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<KodeverkForm>({
        resolver: zodResolver(kodeverkFormSchema),
        defaultValues: { vilkar: [] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'vilkar',
    })

    // Sorter vilkårene før visning
    const sortedFields = sortVilkår(fields as FieldWithId[])

    // Sjekk etter vilkår med begrunnelser som ikke finnes i saksbehandlergrensesnittet
    const vilkårWithUnknownBegrunnelser = getVilkårWithUnknownBegrunnelser(fields, saksbehandleruiData)

    // Sjekk etter vilkår uten begrunnelser
    const vilkårWithoutBegrunnelser = getVilkårWithoutBegrunnelser(fields)

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
                kapittel: '',
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
                {sortedFields.map((field) => {
                    // Finn den opprinnelige indeksen i fields-arrayet
                    const originalIndex = fields.findIndex((f) => f.id === field.id)
                    const { hasErrors, errorCount } = getVilkårErrors(originalIndex, errors)
                    const hasUnknownBegrunnelser = vilkårWithUnknownBegrunnelser.has(originalIndex)
                    const hasNoBegrunnelser = vilkårWithoutBegrunnelser.has(originalIndex)
                    return (
                        <ExpansionCard
                            size="small"
                            key={field.id}
                            aria-label="Vilkår"
                            className={`mb-4 ${hasErrors ? 'border-2 border-ax-border-danger' : ''}`}
                        >
                            <ExpansionCard.Header>
                                <ExpansionCard.Title className="flex items-center gap-2">
                                    {field.beskrivelse || 'Nytt vilkår'}
                                    {hasErrors && (
                                        <span className="text-red-500 text-sm font-medium">({errorCount} feil)</span>
                                    )}
                                </ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    {field.vilkårshjemmel ? formatParagraf(field.vilkårshjemmel) : ''}
                                    {hasUnknownBegrunnelser && (
                                        <>
                                            <br></br>
                                            ⚠️ Dette vilkåret inneholder begrunnelser som ikke finnes i
                                            saksbehandlergrensesnittet
                                        </>
                                    )}
                                    {hasNoBegrunnelser && (
                                        <>
                                            <br></br>
                                            ⚠️ Dette vilkåret har ingen begrunnelser
                                        </>
                                    )}
                                </ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VilkårForm
                                    control={control}
                                    index={originalIndex}
                                    errors={errors}
                                    onRemove={() => remove(originalIndex)}
                                />
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    )
                })}
            </form>
        </div>
    )
}

export default Page
