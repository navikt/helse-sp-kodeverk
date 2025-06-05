'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@navikt/ds-react'
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
                <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
                    <p className="font-medium">Valideringsfeil:</p>
                    <p>{validationError}</p>
                </div>
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
                <h1 className="text-2xl font-bold">Rediger Kodeverk</h1>
                <button onClick={addVilkår} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Legg til vilkår
                </button>
            </div>
            {localKodeverk.map((vilkår, vilkårIndex) => (
                <ExpansionCard key={vilkårIndex} aria-label="sdfgsdf" className="mb-4">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>{vilkår.beskrivelse}</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                onClick={() => removeVilkår(vilkårIndex)}
                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                            >
                                Fjern vilkår
                            </button>
                        </div>

                        {/* Vilkårshjemmel */}
                        <div className="mb-4">
                            <h3 className="mb-2 font-medium">Vilkårshjemmel</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Lovverk</label>
                                    <input
                                        type="text"
                                        value={vilkår.vilkårshjemmel.lovverk}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'lovverk', e.target.value)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Lovverksversjon</label>
                                    <input
                                        type="text"
                                        value={vilkår.vilkårshjemmel.lovverksversjon}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'lovverksversjon', e.target.value)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Paragraf</label>
                                    <input
                                        type="text"
                                        value={vilkår.vilkårshjemmel.paragraf}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'paragraf', e.target.value)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Ledd</label>
                                    <input
                                        type="text"
                                        value={vilkår.vilkårshjemmel.ledd || ''}
                                        onChange={(e) =>
                                            handleVilkårshjemmelChange(vilkårIndex, 'ledd', e.target.value || null)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vilkårskode og beskrivelse */}
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium">Vilkårskode</label>
                                <input
                                    type="text"
                                    value={vilkår.vilkårskode}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'vilkårskode', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="mb-1 block text-sm font-medium">Kategori</label>
                                <input
                                    type="text"
                                    value={vilkår.kategori}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'kategori', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Beskrivelse</label>
                                <textarea
                                    value={vilkår.beskrivelse}
                                    onChange={(e) => handleVilkårChange(vilkårIndex, 'beskrivelse', e.target.value)}
                                    className="w-full rounded border p-2"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Mulige resultater */}
                        <div>
                            <h3 className="mb-2 font-medium">Mulige resultater</h3>
                            {(['OPPFYLT', 'IKKE_OPPFYLT', 'IKKE_RELEVANT'] as const).map((resultatType) => (
                                <div key={resultatType} className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-medium">{resultatType}</h4>
                                        <button
                                            onClick={() => addÅrsak(vilkårIndex, resultatType)}
                                            className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                                        >
                                            Legg til årsak
                                        </button>
                                    </div>
                                    {vilkår.mulige_resultater[resultatType]?.map((årsak, årsakIndex) => (
                                        <div key={årsakIndex} className="mb-2 rounded border p-2">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div className="flex-grow">
                                                    <div className="mb-2">
                                                        <label className="mb-1 block text-sm font-medium">Kode</label>
                                                        <input
                                                            type="text"
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
                                                            className="w-full rounded border p-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="mb-1 block text-sm font-medium">
                                                            Beskrivelse
                                                        </label>
                                                        <textarea
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
                                                            className="w-full rounded border p-2"
                                                            rows={2}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeÅrsak(vilkårIndex, resultatType, årsakIndex)}
                                                    className="ml-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                                                >
                                                    Fjern
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ExpansionCard.Content>
                </ExpansionCard>
            ))}
        </div>
    )
}

export default Page
