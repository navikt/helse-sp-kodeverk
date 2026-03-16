'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Alert, Heading } from '@navikt/ds-react'
import { FilesIcon } from '@navikt/aksel-icons'

import { JsonExport } from '@components/kodeverk/JsonExport'
import { Sidemeny } from '@/components/kodeverk/Sidemeny'
import { VilkårReadOnly } from '@/components/kodeverk/VilkårReadOnly'
import { useKodeverk } from '@hooks/queries/useKodeverk'
import { useSaksbehandlerui } from '@hooks/queries/useSaksbehandlerui'
import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'
import { Vilkår } from '@/schemas/kodeverk'
import { redactKodeverkSistEndretAv, copyKodeverkToClipboard } from '@utils/redactSistEndretAv'

const sortVilkår = (vilkår: Vilkår[]): Vilkår[] => {
    return [...vilkår].sort((a, b) => {
        if (!a.vilkårshjemmel.lovverk && !b.vilkårshjemmel.lovverk) return 0
        if (!a.vilkårshjemmel.lovverk) return -1
        if (!b.vilkårshjemmel.lovverk) return 1

        const lovverkCompare = a.vilkårshjemmel.lovverk.localeCompare(b.vilkårshjemmel.lovverk)
        if (lovverkCompare !== 0) return lovverkCompare

        const kapittelA = parseInt(a.vilkårshjemmel.kapittel) || 0
        const kapittelB = parseInt(b.vilkårshjemmel.kapittel) || 0
        if (kapittelA !== kapittelB) return kapittelA - kapittelB

        const paragrafA = parseInt(a.vilkårshjemmel.paragraf) || 0
        const paragrafB = parseInt(b.vilkårshjemmel.paragraf) || 0
        if (paragrafA !== paragrafB) return paragrafA - paragrafB

        const leddA = parseInt(a.vilkårshjemmel.ledd || '0') || 0
        const leddB = parseInt(b.vilkårshjemmel.ledd || '0') || 0
        if (leddA !== leddB) return leddA - leddB

        const setningA = parseInt(a.vilkårshjemmel.setning || '0') || 0
        const setningB = parseInt(b.vilkårshjemmel.setning || '0') || 0
        if (setningA !== setningB) return setningA - setningB

        return (a.vilkårshjemmel.bokstav || '').localeCompare(b.vilkårshjemmel.bokstav || '')
    })
}

const getVilkårWithUnknownBegrunnelser = (
    vilkår: Vilkår[],
    saksbehandlerui: HovedspørsmålArray | undefined,
): Set<number> => {
    if (!saksbehandlerui) {
        return new Set<number>()
    }

    const alleTilgjengeligeKoder = new Set<string>()

    const samleKoder = (alternativer: unknown[]) => {
        for (const alternativ of alternativer || []) {
            if (typeof alternativ !== 'object' || alternativ === null) {
                continue
            }

            const alt = alternativ as Record<string, unknown>
            if (typeof alt.kode === 'string') {
                alleTilgjengeligeKoder.add(alt.kode)
            }

            if (!Array.isArray(alt.underspørsmål)) {
                continue
            }

            for (const underspørsmål of alt.underspørsmål) {
                if (typeof underspørsmål !== 'object' || underspørsmål === null) {
                    continue
                }

                const undersp = underspørsmål as Record<string, unknown>
                if (Array.isArray(undersp.alternativer)) {
                    samleKoder(undersp.alternativer)
                }
            }
        }
    }

    for (const hovedspørsmål of saksbehandlerui) {
        for (const underspørsmål of hovedspørsmål.underspørsmål || []) {
            if (Array.isArray(underspørsmål.alternativer)) {
                samleKoder(underspørsmål.alternativer)
            }
        }
    }

    const vilkårWithIssues = new Set<number>()

    vilkår.forEach((currentVilkår, index) => {
        const alleBegrunnelser = [...currentVilkår.oppfylt, ...currentVilkår.ikkeOppfylt]
        if (alleBegrunnelser.some((begrunnelse) => !alleTilgjengeligeKoder.has(begrunnelse.kode))) {
            vilkårWithIssues.add(index)
        }
    })

    return vilkårWithIssues
}

const getVilkårWithoutBegrunnelser = (vilkår: Vilkår[]): Set<number> => {
    return new Set(
        vilkår
            .map((currentVilkår, index) =>
                currentVilkår.oppfylt.length === 0 && currentVilkår.ikkeOppfylt.length === 0 ? index : -1,
            )
            .filter((index) => index >= 0),
    )
}

type VilkårMedId = Vilkår & { id: string }

const Page = () => {
    const { data: serverKodeverk, isLoading } = useKodeverk()
    const { data: saksbehandleruiData } = useSaksbehandlerui()
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [copySuccessTimer, setCopySuccessTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [selectedVilkårId, setSelectedVilkårId] = useState<string>()
    const [isSidemenyCollapsed, setIsSidemenyCollapsed] = useState(false)

    useEffect(() => {
        return () => {
            if (copySuccessTimer) {
                clearTimeout(copySuccessTimer)
            }
        }
    }, [copySuccessTimer])

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

        if (copySuccessTimer) {
            clearTimeout(copySuccessTimer)
        }

        const timer = setTimeout(() => {
            setShowCopySuccess(false)
            setCopySuccessTimer(null)
        }, 3000)
        setCopySuccessTimer(timer)
    }

    const sortedVilkår = useMemo<VilkårMedId[]>(
        () =>
            sortVilkår(serverKodeverk?.data.vilkar || []).map((vilkår, index) => ({
                ...vilkår,
                id: `${vilkår.vilkårskode || 'vilkar'}-${index}`,
            })),
        [serverKodeverk],
    )
    const vilkårWithUnknownBegrunnelser = useMemo(
        () => getVilkårWithUnknownBegrunnelser(sortedVilkår, saksbehandleruiData?.data),
        [sortedVilkår, saksbehandleruiData],
    )
    const vilkårWithoutBegrunnelser = useMemo(() => getVilkårWithoutBegrunnelser(sortedVilkår), [sortedVilkår])
    const activeVilkårId =
        selectedVilkårId && sortedVilkår.some((vilkår) => vilkår.id === selectedVilkårId)
            ? selectedVilkårId
            : sortedVilkår[0]?.id
    const activeIndex = sortedVilkår.findIndex((vilkår) => vilkår.id === activeVilkårId)
    const activeVilkår = activeIndex >= 0 ? sortedVilkår[activeIndex] : sortedVilkår[0]

    if (isLoading) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="flex h-screen">
            <Sidemeny
                vilkår={sortedVilkår}
                onVilkårClick={setSelectedVilkårId}
                activeVilkårId={activeVilkår?.id}
                isCollapsed={isSidemenyCollapsed}
                onToggleCollapse={() => setIsSidemenyCollapsed((current) => !current)}
            />

            <div className="flex-1 overflow-y-auto p-6">
                {showCopySuccess && (
                    <div className="fixed bottom-4 right-4 z-50">
                        <Alert variant="success" closeButton onClose={handleCloseCopySuccess}>
                            Kodeverk kopiert til utklippstavlen!
                        </Alert>
                    </div>
                )}

                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <Heading level="1" size="large">
                            Kodeverk
                        </Heading>
                    </div>
                    <div className="flex gap-4">
                        <Button type="button" onClick={handleCopyKodeverk} variant="secondary" icon={<FilesIcon />}>
                            Kopier som json
                        </Button>
                        {serverKodeverk?.data && <JsonExport kodeverk={serverKodeverk.data} />}
                    </div>
                </div>

                {activeVilkår ? (
                    <VilkårReadOnly
                        vilkår={activeVilkår}
                        hasUnknownBegrunnelser={vilkårWithUnknownBegrunnelser.has(activeIndex >= 0 ? activeIndex : 0)}
                        hasNoBegrunnelser={vilkårWithoutBegrunnelser.has(activeIndex >= 0 ? activeIndex : 0)}
                    />
                ) : (
                    <div className="flex h-64 items-center justify-center text-sm text-gray-500">
                        Ingen vilkår tilgjengelig.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
