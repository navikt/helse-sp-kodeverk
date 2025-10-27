'use client'

import { useState, useEffect, useRef } from 'react'
import { Button, ErrorSummary, Heading, Alert } from '@navikt/ds-react'
import { FilesIcon } from '@navikt/aksel-icons'
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Vilkår, Vilkårshjemmel, kodeverkFormSchema, KodeverkForm } from '@/schemas/kodeverk'
import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'
import { VilkårForm } from '@/components/kodeverk/VilkårForm'
import { ExcelExport } from '@/components/kodeverk/ExcelExport'
import { MetadataVisning } from '@/components/MetadataVisning'
import { KonfliktModal } from '@/components/KonfliktModal'
import { Sidemeny } from '@/components/kodeverk/Sidemeny'
import { BekreftelsesModal } from '@/components/BekreftelsesModal'
import { useKodeverk } from '@hooks/queries/useKodeverk'
import { useBekreftelsesModal } from '@hooks/useBekreftelsesModal'
import { useSaksbehandlerui } from '@hooks/queries/useSaksbehandlerui'
import { useBrukerinfo } from '@hooks/queries/useBrukerinfo'
import { useKodeverkMutation } from '@hooks/mutations/useKodeverkMutation'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'
import { redactKodeverkSistEndretAv, copyKodeverkToClipboard } from '@utils/redactSistEndretAv'

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} §${kapittel}-${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
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
    const { data: serverKodeverk, isLoading } = useKodeverk()
    const { data: saksbehandleruiData } = useSaksbehandlerui()
    const { data: brukerinfo } = useBrukerinfo()
    const saveMutation = useKodeverkMutation()

    const { control, handleSubmit, formState, reset } = useForm<KodeverkForm>({
        resolver: zodResolver(kodeverkFormSchema),
        defaultValues: { vilkar: [] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'vilkar',
    })

    // Sorter vilkårene før visning
    const sortedFields = sortVilkår(fields as FieldWithId[])

    // Refs for scroll til vilkår
    const vilkårRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const [activeVilkårId, setActiveVilkårId] = useState<string | undefined>()
    const [isSidemenyCollapsed, setIsSidemenyCollapsed] = useState(false)
    const {
        isOpen: bekreftelsesModalOpen,
        modalProps,
        visBekreftelsesmodal,
        handleBekreft,
        handleAvbryt,
    } = useBekreftelsesModal()

    // Sjekk etter vilkår med begrunnelser som ikke finnes i saksbehandlergrensesnittet
    const vilkårWithUnknownBegrunnelser = getVilkårWithUnknownBegrunnelser(fields, saksbehandleruiData?.data)

    // Sjekk etter vilkår uten begrunnelser
    const vilkårWithoutBegrunnelser = getVilkårWithoutBegrunnelser(fields)

    const [validationError, setValidationError] = useState<string | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null)
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [copySuccessTimer, setCopySuccessTimer] = useState<NodeJS.Timeout | null>(null)
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
        if (serverKodeverk) {
            reset(serverKodeverk.data)
            // Sett første vilkår som aktivt når data lastes fra server
            if (serverKodeverk.data.vilkar && serverKodeverk.data.vilkar.length > 0) {
                const sortedVilkår = sortVilkår(serverKodeverk.data.vilkar as FieldWithId[])
                setActiveVilkårId(sortedVilkår[0].id)
            }
        }
    }, [serverKodeverk, reset])

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
        if (!serverKodeverk?.data) return

        const redactedData = redactKodeverkSistEndretAv(serverKodeverk.data.vilkar)
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

    const onSubmit = (data: KodeverkForm) => {
        // Oppdater metadata kun for vilkår som er endret
        const cleanedData = {
            ...data,
            vilkar: data.vilkar.map((vilkår, index) => {
                // Sammenlign med original data for å sjekke om endringer er gjort
                const originalVilkår = serverKodeverk?.data?.vilkar?.[index]

                const isVilkårEndret =
                    !originalVilkår ||
                    vilkår.beskrivelse !== originalVilkår.beskrivelse ||
                    vilkår.vilkårskode !== originalVilkår.vilkårskode ||
                    JSON.stringify(vilkår.vilkårshjemmel) !== JSON.stringify(originalVilkår.vilkårshjemmel) ||
                    JSON.stringify(vilkår.oppfylt) !== JSON.stringify(originalVilkår.oppfylt) ||
                    JSON.stringify(vilkår.ikkeOppfylt) !== JSON.stringify(originalVilkår.ikkeOppfylt)

                return {
                    ...vilkår,
                    // Oppdater metadata kun hvis vilkåret er endret
                    ...(isVilkårEndret && {
                        sistEndretAv: brukerinfo?.navn || 'unknown',
                        sistEndretDato: new Date().toISOString(),
                    }),
                }
            }),
        }

        saveMutation.mutate(
            {
                data: cleanedData,
                etag: serverKodeverk?.etag,
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

    const handleVilkårClick = async (vilkårId: string): Promise<boolean> => {
        // Sjekk om form er dirty og bekreft navigasjon
        if (formState.isDirty) {
            const bekreftet = await visBekreftelsesmodal({
                tittel: 'Ulagrede endringer',
                melding:
                    'Du har ulagrede endringer. Hvis du navigerer til et annet vilkår vil disse endringene gå tapt. Er du sikker på at du vil fortsette?',
            })

            if (!bekreftet) {
                return false
            }

            // Reset form state hvis bruker bekrefter
            reset(serverKodeverk?.data)
        }

        setActiveVilkårId(vilkårId)
        return true
    }

    // Sett første vilkår som aktivt når data lastes
    useEffect(() => {
        if (sortedFields.length > 0 && !activeVilkårId) {
            setActiveVilkårId(sortedFields[0].id)
        }
    }, [sortedFields, activeVilkårId])

    // Automatisk sett siste lagt til vilkår som aktivt
    useEffect(() => {
        if (fields.length > 0) {
            const sortedVilkår = sortVilkår(fields as FieldWithId[])
            // Finn det siste vilkåret som har tom beskrivelse (nytt vilkår)
            const newVilkår = sortedVilkår.find(
                (field) => field.beskrivelse === '' && field.vilkårskode === '' && field.vilkårshjemmel.lovverk === '',
            )
            if (newVilkår) {
                setActiveVilkårId(newVilkår.id)
            }
        }
    }, [fields]) // Når fields endres

    if (isLoading) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="flex h-screen">
            {/* Sidemeny */}
            <Sidemeny
                vilkår={sortedFields}
                onVilkårClick={handleVilkårClick}
                activeVilkårId={activeVilkårId}
                isCollapsed={isSidemenyCollapsed}
                onToggleCollapse={() => setIsSidemenyCollapsed(!isSidemenyCollapsed)}
            />

            {/* Hovedinnhold */}
            <div className="flex-1 overflow-y-auto">
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
                                Kodeverket er lagret!
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
                        <KonfliktModal
                            isOpen={!!konfliktProblem}
                            onClose={handleCloseKonflikt}
                            problem={konfliktProblem}
                        />
                    )}
                    <BekreftelsesModal
                        isOpen={bekreftelsesModalOpen}
                        tittel={modalProps?.tittel || ''}
                        melding={modalProps?.melding || ''}
                        onBekreft={handleBekreft}
                        onAvbryt={handleAvbryt}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6 flex items-center justify-between">
                            <Heading level="1" size="large">
                                Kodeverk
                            </Heading>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={handleCopyKodeverk}
                                    variant="secondary"
                                    icon={<FilesIcon />}
                                >
                                    Kopier som json
                                </Button>
                                <ExcelExport kodeverk={{ vilkar: fields }} />
                                <Button type="button" onClick={addVilkår} variant="primary">
                                    Legg til
                                </Button>
                            </div>
                        </div>
                        {(() => {
                            const activeField = sortedFields.find((field) => field.id === activeVilkårId)
                            if (!activeField) {
                                return (
                                    <div className="flex h-64 items-center justify-center">
                                        <p className="text-gray-500">Velg et vilkår fra sidemenyen</p>
                                    </div>
                                )
                            }

                            // Finn den opprinnelige indeksen i fields-arrayet
                            const originalIndex = fields.findIndex((f) => f.id === activeField.id)
                            const { hasErrors, errorCount } = getVilkårErrors(originalIndex, formState.errors)
                            const hasUnknownBegrunnelser = vilkårWithUnknownBegrunnelser.has(originalIndex)
                            const hasNoBegrunnelser = vilkårWithoutBegrunnelser.has(originalIndex)

                            return (
                                <div
                                    key={activeField.id}
                                    ref={(el) => {
                                        vilkårRefs.current[activeField.id] = el
                                    }}
                                    data-vilkår-id={activeField.id}
                                    className={`${hasErrors ? 'border-2 border-ax-border-danger' : ''}`}
                                >
                                    <div className="mb-4">
                                        <h2 className="text-gray-900 flex items-center gap-2 text-xl font-semibold">
                                            {activeField.beskrivelse || 'Nytt vilkår'}
                                            {hasErrors && (
                                                <span className="text-red-500 text-sm font-medium">
                                                    ({errorCount} feil)
                                                </span>
                                            )}
                                        </h2>
                                        <div className="text-gray-600 mt-1 text-sm">
                                            {activeField.vilkårshjemmel
                                                ? formatParagraf(activeField.vilkårshjemmel)
                                                : ''}
                                        </div>
                                        {hasUnknownBegrunnelser && (
                                            <div className="bg-yellow-50 border-yellow-200 mt-2 rounded-md border p-3">
                                                <span className="text-yellow-800 text-sm">
                                                    ⚠️ Dette vilkåret inneholder begrunnelser som ikke finnes i
                                                    saksbehandlergrensesnittet
                                                </span>
                                            </div>
                                        )}
                                        {hasNoBegrunnelser && (
                                            <div className="bg-yellow-50 border-yellow-200 mt-2 rounded-md border p-3">
                                                <span className="text-yellow-800 text-sm">
                                                    ⚠️ Dette vilkåret har ingen begrunnelser
                                                </span>
                                            </div>
                                        )}
                                        <MetadataVisning
                                            sistEndretAv={activeField.sistEndretAv}
                                            sistEndretDato={activeField.sistEndretDato}
                                            size="small"
                                            className="mt-2"
                                        />
                                    </div>
                                    <VilkårForm
                                        control={control}
                                        index={originalIndex}
                                        errors={formState.errors}
                                        onRemove={() => remove(originalIndex)}
                                    />
                                </div>
                            )
                        })()}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page
