'use client'

import { useState } from 'react'

import { kodeverk, type Kodeverk, type Vilkår, type Årsak, type Vilkårshjemmel } from '@components/kodeverk'

const Page = () => {
    const [kodeverkData, setKodeverkData] = useState<Kodeverk>(kodeverk)

    const handleVilkårChange = (index: number, field: keyof Vilkår, value: string) => {
        const newKodeverk = [...kodeverkData]
        newKodeverk[index] = {
            ...newKodeverk[index],
            [field]: value,
        }
        setKodeverkData(newKodeverk)
    }

    const handleVilkårshjemmelChange = (vilkårIndex: number, field: keyof Vilkårshjemmel, value: string | null) => {
        const newKodeverk = [...kodeverkData]
        newKodeverk[vilkårIndex] = {
            ...newKodeverk[vilkårIndex],
            vilkårshjemmel: {
                ...newKodeverk[vilkårIndex].vilkårshjemmel,
                [field]: value,
            },
        }
        setKodeverkData(newKodeverk)
    }

    const handleÅrsakChange = (
        vilkårIndex: number,
        resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT',
        årsakIndex: number,
        field: keyof Årsak,
        value: string,
    ) => {
        const newKodeverk = [...kodeverkData]
        // @ts-expect-error temporary workaround for TypeScript error
        const årsaker = [...newKodeverk[vilkårIndex].mulige_resultater[resultatType]]
        årsaker[årsakIndex] = {
            ...årsaker[årsakIndex],
            [field]: value,
        }
        newKodeverk[vilkårIndex].mulige_resultater[resultatType] = årsaker
        setKodeverkData(newKodeverk)
    }

    const addVilkår = () => {
        const newVilkår: Vilkår = {
            vilkårskode: '',
            beskrivelse: '',
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
        setKodeverkData([...kodeverkData, newVilkår])
    }

    const removeVilkår = (index: number) => {
        const newKodeverk = [...kodeverkData]
        newKodeverk.splice(index, 1)
        setKodeverkData(newKodeverk)
    }

    const addÅrsak = (vilkårIndex: number, resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT') => {
        const newKodeverk = [...kodeverkData]
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
        setKodeverkData(newKodeverk)
    }

    const removeÅrsak = (
        vilkårIndex: number,
        resultatType: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT',
        årsakIndex: number,
    ) => {
        const newKodeverk = [...kodeverkData]
        if (newKodeverk[vilkårIndex]?.mulige_resultater[resultatType]) {
            newKodeverk[vilkårIndex].mulige_resultater[resultatType].splice(årsakIndex, 1)
            setKodeverkData(newKodeverk)
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Rediger Kodeverk</h1>
                <button onClick={addVilkår} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Legg til vilkår
                </button>
            </div>
            {kodeverkData.map((vilkår, vilkårIndex) => (
                <div key={vilkårIndex} className="mb-8 rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Vilkår {vilkårIndex + 1}</h2>
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
                                    onChange={(e) => handleVilkårshjemmelChange(vilkårIndex, 'lovverk', e.target.value)}
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
                </div>
            ))}
        </div>
    )
}

export default Page
