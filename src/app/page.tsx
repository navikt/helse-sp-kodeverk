'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ErrorSummary, TextField, Textarea, Heading, Box } from '@navikt/ds-react'
import { ExpansionCard } from '@navikt/ds-react'

import { Kodeverk, Vilkår, Vilkårshjemmel, Årsak, kodeverkSchema } from '@/kodeverk/kodeverk'

const fetchKodeverk = async (): Promise<Kodeverk> => {
    const response = await fetch('/api/v1/open/kodeverk')
    if (!response.ok) {
        throw new Error('Failed to fetch kodeverk')
    }
    return response.json()
}

const saveKodeverk = async (kodeverk: Kodeverk): Promise<void> => {
    // Validate the kodeverk against the schema
    const validationResult = kodeverkSchema.safeParse(kodeverk)
    if (!validationResult.success) {
        throw new Error(`Validation failed: ${validationResult.error.message}`)
    }

    const response = await fetch('/api/v1/kodeverk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kodeverk),
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

    const [localKodeverk, setLocalKodeverk] = useState<Kodeverk>([])
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [validationError, setValidationError] = useState<string | null>(null)

    const saveMutation = useMutation({
        mutationFn: saveKodeverk,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kodeverk'] })
            setHasUnsavedChanges(false)
            setValidationError(null)
        },
        onError: (error: Error) => {
            setValidationError(error.message)
        },
    })

    useEffect(() => {
        if (serverKodeverk) {
            setLocalKodeverk(serverKodeverk)
        }
    }, [serverKodeverk])

    useEffect(() => {
        if (serverKodeverk) {
            setHasUnsavedChanges(JSON.stringify(localKodeverk) !== JSON.stringify(serverKodeverk))
        }
    }, [localKodeverk, serverKodeverk])

    const handleVilkårChange = (index: number, field: keyof Vilkår, value: string) => {
        const newKodeverk = [...localKodeverk]
        newKodeverk[index] = {
            ...newKodeverk[index],
            [field]: value,
        }
        setLocalKodeverk(newKodeverk)
    }

    const handleVilkårshjemmelChange = (vilkårIndex: number, field: keyof Vilkårshjemmel, value: string | null) => {
        const newKodeverk = [...localKodeverk]
        newKodeverk[vilkårIndex] = {
            ...newKodeverk[vilkårIndex],
            vilkårshjemmel: {
                ...newKodeverk[vilkårIndex].vilkårshjemmel,
                [field]: value,
            },
        }
        setLocalKodeverk(newKodeverk)
    }

    const handleÅrsakChange = (
        vilkårIndex: number,
        resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT',
        årsakIndex: number,
        field: keyof Årsak,
        value: string,
    ) => {
        const newKodeverk = [...localKodeverk]
        // @ts-expect-error temporary workaround for TypeScript error
        const årsaker = [...newKodeverk[vilkårIndex].mulige_resultater[resultatType]]
        årsaker[årsakIndex] = {
            ...årsaker[årsakIndex],
            [field]: value,
        }
        newKodeverk[vilkårIndex].mulige_resultater[resultatType] = årsaker
        setLocalKodeverk(newKodeverk)
    }

    const addVilkår = () => {
        const newVilkår: Vilkår = {
            vilkårskode: '',
            beskrivelse: '',
            kategori: '',
            vilkårshjemmel: {
                lovverk: '',
                lovverksversjon: '',
                paragraf: '',
                ledd: null,
                setning: null,
                bokstav: null,
            },
            mulige_resultater: {
                OPPFYLT: [],
                IKKE_OPPFYLT: [],
                IKKE_RELEVANT: [],
            },
        }
        setLocalKodeverk([...localKodeverk, newVilkår])
    }

    const removeVilkår = (index: number) => {
        const newKodeverk = [...localKodeverk]
        newKodeverk.splice(index, 1)
        setLocalKodeverk(newKodeverk)
    }

    const addÅrsak = (vilkårIndex: number, resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT') => {
        const newKodeverk = [...localKodeverk]
        const newÅrsak: Årsak = {
            kode: '',
            beskrivelse: '',
        }
        if (!newKodeverk[vilkårIndex].mulige_resultater[resultatType]) {
            newKodeverk[vilkårIndex].mulige_resultater[resultatType] = []
        }
        newKodeverk[vilkårIndex].mulige_resultater[resultatType] = [
            ...newKodeverk[vilkårIndex].mulige_resultater[resultatType],
            newÅrsak,
        ]
        setLocalKodeverk(newKodeverk)
    }

    const removeÅrsak = (
        vilkårIndex: number,
        resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT',
        årsakIndex: number,
    ) => {
        const newKodeverk = [...localKodeverk]
        if (newKodeverk[vilkårIndex]?.mulige_resultater[resultatType]) {
            newKodeverk[vilkårIndex].mulige_resultater[resultatType].splice(årsakIndex, 1)
            setLocalKodeverk(newKodeverk)
        }
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
            {hasUnsavedChanges && (
                <div className="fixed right-4 bottom-4 z-50">
                    <Button
                        onClick={() => saveMutation.mutate(localKodeverk)}
                        loading={saveMutation.isPending}
                        variant="primary"
                    >
                        Lagre endringer
                    </Button>
                </div>
            )}
            <div className="mb-6 flex items-center justify-between">
                <Heading level="1" size="large">
                    Rediger Kodeverk
                </Heading>
                <Button onClick={addVilkår} variant="primary">
                    Legg til vilkår
                </Button>
            </div>
            {localKodeverk.map((vilkår, vilkårIndex) => (
                <ExpansionCard key={vilkårIndex} aria-label="Vilkår" className="mb-4">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>{vilkår.beskrivelse}</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <Box padding="4">
                            <div className="mb-4 flex items-center justify-between">
                                <Button onClick={() => removeVilkår(vilkårIndex)} variant="danger" size="small">
                                    Fjern vilkår
                                </Button>
                            </div>

                            {/* Vilkårshjemmel */}
                            <div className="mb-4">
                                <Heading level="3" size="small" className="mb-2">
                                    Vilkårshjemmel
                                </Heading>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        label="Lovverk"
                                        value={vilkår.vilkårshjemmel.lovverk}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'lovverk', e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Lovverksversjon"
                                        value={vilkår.vilkårshjemmel.lovverksversjon}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'lovverksversjon', e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Paragraf"
                                        value={vilkår.vilkårshjemmel.paragraf}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'paragraf', e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Ledd"
                                        value={vilkår.vilkårshjemmel.ledd || ''}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'ledd', e.target.value || null)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Vilkårskode og beskrivelse */}
                            <div className="mb-4">
                                <TextField
                                    label="Vilkårskode"
                                    value={vilkår.vilkårskode}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'vilkårskode', e.target.value)}
                                    className="mb-2"
                                />
                                <TextField
                                    label="Kategori"
                                    value={vilkår.kategori}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'kategori', e.target.value)}
                                    className="mb-2"
                                />
                                <Textarea
                                    label="Beskrivelse"
                                    value={vilkår.beskrivelse}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'beskrivelse', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            {/* Mulige resultater */}
                            <div>
                                <Heading level="3" size="small" className="mb-2">
                                    Mulige resultater
                                </Heading>
                                {(['OPPFYLT', 'IKKE_OPPFYLT', 'IKKE_RELEVANT'] as const).map((resultatType) => (
                                    <div key={resultatType} className="mb-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <Heading level="4" size="xsmall">
                                                {resultatType}
                                            </Heading>
                                            <Button
                                                onClick={() => addÅrsak(vilkårIndex, resultatType)}
                                                variant="secondary"
                                                size="small"
                                            >
                                                Legg til årsak
                                            </Button>
                                        </div>
                                        {vilkår.mulige_resultater[resultatType]?.map((årsak, årsakIndex) => (
                                            <Box key={årsakIndex} padding="4" className="mb-2">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div className="flex-grow">
                                                        <TextField
                                                            label="Kode"
                                                            value={årsak.kode}
                                                            onChange={(e) =>
                                                                handleÅrsakChange(
                                                                    vilkårIndex,
                                                                    resultatType,
                                                                    årsakIndex,
                                                                    'kode',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="mb-2"
                                                        />
                                                        <Textarea
                                                            label="Beskrivelse"
                                                            value={årsak.beskrivelse}
                                                            onChange={(e) =>
                                                                handleÅrsakChange(
                                                                    vilkårIndex,
                                                                    resultatType,
                                                                    årsakIndex,
                                                                    'beskrivelse',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            rows={2}
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() =>
                                                            removeÅrsak(vilkårIndex, resultatType, årsakIndex)
                                                        }
                                                        variant="danger"
                                                        size="small"
                                                        className="ml-2"
                                                    >
                                                        Fjern
                                                    </Button>
                                                </div>
                                            </Box>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Box>
                    </ExpansionCard.Content>
                </ExpansionCard>
            ))}
        </div>
    )
}

export default Page
