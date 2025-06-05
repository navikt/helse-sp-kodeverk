'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, Heading } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'vilkar',
    })

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
                {fields.map((field, index) => (
                    <ExpansionCard key={field.id} aria-label="Vilkår" className="mb-4">
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
                    </ExpansionCard>
                ))}
            </form>
        </div>
    )
}

export default Page
