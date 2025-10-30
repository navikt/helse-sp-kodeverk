'use client'

import { useState, useEffect } from 'react'
import { Button, ErrorSummary, Heading, Alert, Chips } from '@navikt/ds-react'
import { FilesIcon } from '@navikt/aksel-icons'
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Beregningsregel, beregningsregelFormSchema, BeregningsregelForm } from '@/schemas/beregningsregler'
import { BeregningsregelExpansionCard } from '@/components/beregningsregler/BeregningsregelExpansionCard'
import { KonfliktModal } from '@/components/KonfliktModal'
import { useBeregningsregler } from '@hooks/queries/useBeregningsregler'
import { useBrukerinfo } from '@hooks/queries/useBrukerinfo'
import { useBakrommetBeregningskoder } from '@hooks/queries/useBakrommetBeregningskoder'
import { useBeregningsregelMutation } from '@hooks/mutations/useBeregningsregelMutation'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'
import { redactBeregningsreglerSistEndretAv, copyKodeverkToClipboard } from '@utils/redactSistEndretAv'

// Filteralternativer for beregningsregler
const filterAlternativer = [
    { visningstekst: 'Dekningsgrad', filtereringstekst: 'DEKNINGSGRAD' },
    { visningstekst: 'Sykepengegrunnlag', filtereringstekst: 'SYKEPENGEGRUNNLAG' },
    { visningstekst: 'Arbeidstaker', filtereringstekst: 'ARBEIDSTAKER' },
    { visningstekst: 'Selvstendig næringsdrivende', filtereringstekst: 'SELVSTENDIG' },
    { visningstekst: 'Frilanser', filtereringstekst: 'FRILANSER' },
    { visningstekst: 'Inaktiv', filtereringstekst: 'INAKTIV' },
    { visningstekst: 'Arbeidsledig', filtereringstekst: 'ARBEIDSLEDIG' },
    { visningstekst: 'Ubrukt', filtereringstekst: 'UBRUKT' },
]

// Funksjon for å sortere beregningsregler basert på vilkårshjemmel
const sortBeregningsregler = (regler: Beregningsregel[]): Beregningsregel[] => {
    return [...regler].sort((a, b) => {
        const aHjemmel = a.vilkårshjemmel
        const bHjemmel = b.vilkårshjemmel

        // Sammenlign kapittel først
        const aKapittel = parseInt(aHjemmel.kapittel) || 0
        const bKapittel = parseInt(bHjemmel.kapittel) || 0

        if (aKapittel !== bKapittel) {
            return aKapittel - bKapittel
        }

        // Sammenlign paragraf hvis kapittel er likt
        const aParagraf = parseInt(aHjemmel.paragraf) || 0
        const bParagraf = parseInt(bHjemmel.paragraf) || 0

        if (aParagraf !== bParagraf) {
            return aParagraf - bParagraf
        }

        // Sammenlign ledd hvis paragraf er likt
        const aLedd = parseInt(aHjemmel.ledd || '0') || 0
        const bLedd = parseInt(bHjemmel.ledd || '0') || 0

        if (aLedd !== bLedd) {
            return aLedd - bLedd
        }

        // Sammenlign setning hvis ledd er likt
        const aSetning = parseInt(aHjemmel.setning || '0') || 0
        const bSetning = parseInt(bHjemmel.setning || '0') || 0

        if (aSetning !== bSetning) {
            return aSetning - bSetning
        }

        // Sammenlign bokstav hvis setning er likt
        const aBokstav = aHjemmel.bokstav || ''
        const bBokstav = bHjemmel.bokstav || ''

        return aBokstav.localeCompare(bBokstav)
    })
}

// Funksjon for å sjekke om en beregningsregel har valideringsfeil
const getBeregningsregelErrors = (
    index: number,
    errors: FieldErrors<BeregningsregelForm>,
): { hasErrors: boolean; errorCount: number } => {
    const regelErrors = errors?.beregningsregler?.[index]
    if (!regelErrors) return { hasErrors: false, errorCount: 0 }

    let errorCount = 0

    // Sjekk hovedfeltene
    if (regelErrors.kode?.message) errorCount++
    if (regelErrors.beskrivelse?.message) errorCount++

    // Sjekk vilkårshjemmel
    const hjemmelErrors = regelErrors.vilkårshjemmel
    if (hjemmelErrors?.lovverk?.message) errorCount++
    if (hjemmelErrors?.lovverksversjon?.message) errorCount++
    if (hjemmelErrors?.kapittel?.message) errorCount++
    if (hjemmelErrors?.paragraf?.message) errorCount++

    return { hasErrors: errorCount > 0, errorCount }
}

// Funksjon for å sjekke om en kode er i bruk i bakrommet
const erKodeIBrukIBakrommet = (kode: string, bakrommetKoder: string[]): boolean => {
    if (!bakrommetKoder || !kode) return false
    return bakrommetKoder.includes(kode)
}

const Page = () => {
    const { data: serverBeregningsregler, isLoading } = useBeregningsregler()
    const { data: brukerinfo } = useBrukerinfo()
    const { data: bakrommetKoder, isLoading: isLoadingBakrommet } = useBakrommetBeregningskoder()
    const saveMutation = useBeregningsregelMutation()

    const { control, handleSubmit, formState, reset } = useForm<BeregningsregelForm>({
        resolver: zodResolver(beregningsregelFormSchema),
        defaultValues: { beregningsregler: [] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'beregningsregler',
    })

    const [validationError, setValidationError] = useState<string | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null)
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [copySuccessTimer, setCopySuccessTimer] = useState<NodeJS.Timeout | null>(null)
    const [valgteFiltre, setValgteFiltre] = useState<string[]>([])
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

    useEffect(() => {
        if (serverBeregningsregler?.data) {
            // Sorter beregningsreglene basert på vilkårshjemmel før vi setter dem i formen
            const sortedData = {
                ...serverBeregningsregler.data,
                beregningsregler: sortBeregningsregler(serverBeregningsregler.data.beregningsregler),
            }
            reset(sortedData)
        }
    }, [serverBeregningsregler, reset])

    // Cleanup timer ved unmount
    useEffect(() => {
        return () => {
            if (successTimer) {
                clearTimeout(successTimer)
            }
            if (copySuccessTimer) {
                clearTimeout(copySuccessTimer)
            }
        }
    }, [successTimer, copySuccessTimer])

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        if (successTimer) {
            clearTimeout(successTimer)
            setSuccessTimer(null)
        }
    }

    const handleCloseCopySuccess = () => {
        setShowCopySuccess(false)
        if (copySuccessTimer) {
            clearTimeout(copySuccessTimer)
            setCopySuccessTimer(null)
        }
    }

    const handleCopyKodeverk = async () => {
        if (!serverBeregningsregler?.data) return

        const redactedData = redactBeregningsreglerSistEndretAv(serverBeregningsregler.data.beregningsregler)
        await copyKodeverkToClipboard(redactedData)
        setShowCopySuccess(true)

        // Fjern eventuell eksisterende timer
        if (copySuccessTimer) {
            clearTimeout(copySuccessTimer)
        }

        // Sett ny timer for å skjule copy-success-melding etter 3 sekunder
        const timer = setTimeout(() => {
            setShowCopySuccess(false)
            setCopySuccessTimer(null)
        }, 3000)
        setCopySuccessTimer(timer)
    }

    const handleCloseKonflikt = () => {
        setKonfliktProblem(null)
    }

    // Håndter filtervalg
    const handleFilterToggle = (filterTekst: string, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setValgteFiltre((prev) =>
            prev.includes(filterTekst) ? prev.filter((f) => f !== filterTekst) : [...prev, filterTekst],
        )
    }

    // Filtrer beregningsregler basert på valgte filtre (AND-logikk)
    const filtrerteBeregningsregler = fields.filter((field) => {
        if (valgteFiltre.length === 0) return true

        // Spesialhåndtering for UBRUKT filter
        if (valgteFiltre.includes('UBRUKT')) {
            const erIBrukIBakrommet = erKodeIBrukIBakrommet(field.kode, (bakrommetKoder as string[]) ?? [])
            return !erIBrukIBakrommet
        }

        // AND-logikk: alle valgte filtre må matche
        return valgteFiltre.every((filterTekst) => field.kode.toUpperCase().includes(filterTekst))
    })

    const onSubmit = (data: BeregningsregelForm) => {
        // Oppdater metadata kun for beregningsregler som er endret
        const cleanedData = {
            ...data,
            beregningsregler: data.beregningsregler.map((regel, index) => {
                // Sammenlign med original data for å sjekke om endringer er gjort
                const originalRegel = serverBeregningsregler?.data?.beregningsregler?.[index]

                const isRegelEndret =
                    !originalRegel ||
                    regel.beskrivelse !== originalRegel.beskrivelse ||
                    regel.kode !== originalRegel.kode ||
                    JSON.stringify(regel.vilkårshjemmel) !== JSON.stringify(originalRegel.vilkårshjemmel)

                return {
                    ...regel,
                    // Oppdater metadata kun hvis beregningsregelen er endret
                    ...(isRegelEndret && {
                        sistEndretAv: brukerinfo?.navn || 'unknown',
                        sistEndretDato: new Date().toISOString(),
                    }),
                }
            }),
        }

        saveMutation.mutate(
            {
                data: cleanedData,
                etag: serverBeregningsregler?.etag,
            },
            {
                onSuccess: () => {
                    setValidationError(null)
                    setKonfliktProblem(null)

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

    const addBeregningsregel = () => {
        const newBeregningsregel: Beregningsregel = {
            kode: '',
            beskrivelse: '',
            vilkårshjemmel: {
                lovverk: '',
                lovverksversjon: '',
                kapittel: '',
                paragraf: '',
                ledd: null,
                setning: null,
                bokstav: null,
            },
        }
        append(newBeregningsregel)
    }

    if (isLoading || isLoadingBakrommet) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="p-6">
            {validationError && (
                <ErrorSummary heading="For å gå videre må du rette opp følgende:">
                    <ErrorSummary.Item>{validationError}</ErrorSummary.Item>
                </ErrorSummary>
            )}
            {formState.isDirty && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Button onClick={handleSubmit(onSubmit)} loading={saveMutation.isPending} variant="primary">
                        Lagre endringer
                    </Button>
                </div>
            )}
            {showSuccess && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Alert variant="success" closeButton onClose={handleCloseSuccess}>
                        Beregningsreglene er lagret!
                    </Alert>
                </div>
            )}
            {showCopySuccess && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Alert variant="success" closeButton onClose={handleCloseCopySuccess}>
                        Kodeverk kopiert til utklippstavlen!
                    </Alert>
                </div>
            )}
            {konfliktProblem && (
                <KonfliktModal isOpen={!!konfliktProblem} onClose={handleCloseKonflikt} problem={konfliktProblem} />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center justify-between">
                    <Heading level="1" size="large">
                        Beregningsregler
                    </Heading>
                    <div className="flex gap-4">
                        <Button type="button" onClick={handleCopyKodeverk} variant="secondary" icon={<FilesIcon />}>
                            Kopier som json
                        </Button>
                        <Button type="button" onClick={addBeregningsregel} variant="primary">
                            Legg til
                        </Button>
                    </div>
                </div>

                {/* Filter chips */}
                <div className="mb-6">
                    <Chips>
                        {filterAlternativer.map((alternativ) => (
                            <Chips.Toggle
                                key={alternativ.filtereringstekst}
                                selected={valgteFiltre.includes(alternativ.filtereringstekst)}
                                onClick={(event) => handleFilterToggle(alternativ.filtereringstekst, event)}
                                type="button"
                            >
                                {alternativ.visningstekst}
                            </Chips.Toggle>
                        ))}
                    </Chips>
                </div>

                <div>
                    {filtrerteBeregningsregler.map((field) => {
                        // Finn den faktiske index i fields array
                        const actualIndex = fields.findIndex((f) => f.id === field.id)
                        const { hasErrors, errorCount } = getBeregningsregelErrors(actualIndex, formState.errors)
                        const erIBrukIBakrommet = erKodeIBrukIBakrommet(field.kode, (bakrommetKoder as string[]) ?? [])

                        return (
                            <BeregningsregelExpansionCard
                                key={field.id}
                                control={control}
                                index={actualIndex}
                                errors={formState.errors}
                                onRemove={() => remove(actualIndex)}
                                kode={field.kode}
                                beskrivelse={field.beskrivelse}
                                vilkårshjemmel={field.vilkårshjemmel}
                                sistEndretAv={field.sistEndretAv}
                                sistEndretDato={field.sistEndretDato}
                                hasErrors={hasErrors}
                                errorCount={errorCount}
                                erIBrukIBakrommet={erIBrukIBakrommet}
                            />
                        )
                    })}
                </div>
            </form>
        </div>
    )
}

export default Page
