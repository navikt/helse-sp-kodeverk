'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading, Alert } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Vilkår, Vilkårshjemmel, kodeverkFormSchema, KodeverkForm } from '@/schemas/kodeverk'
import { VilkårForm } from '@/components/old/kodeverk/VilkårForm'
import { ExcelExport } from '@/components/old/kodeverk/ExcelExport'
import { useKodeverk } from '@hooks/queries/useKodeverk'

const formatParagraf = (hjemmel: Vilkårshjemmel) => {
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    let result = `${lovverk} kap. ${kapittel} § ${paragraf}`
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

const Page = () => {
    const queryClient = useQueryClient()
    const { data: serverKodeverk, isLoading } = useKodeverk()

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
                    return (
                        <ExpansionCard key={field.id} aria-label="Vilkår" className="mb-4">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>{field.beskrivelse || 'Nytt vilkår'}</ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    {field.vilkårshjemmel ? formatParagraf(field.vilkårshjemmel) : ''}
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
