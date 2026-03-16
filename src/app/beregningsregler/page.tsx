'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Alert, Chips, Heading } from '@navikt/ds-react'
import { FilesIcon } from '@navikt/aksel-icons'

import { BeregningsregelExpansionCard } from '@/components/beregningsregler/BeregningsregelExpansionCard'
import { useBeregningsregler } from '@hooks/queries/useBeregningsregler'
import { Beregningsregel } from '@/schemas/beregningsregler'
import { redactBeregningsreglerSistEndretAv, copyKodeverkToClipboard } from '@utils/redactSistEndretAv'

const filterAlternativer = [
    { visningstekst: 'Dekningsgrad', filtereringstekst: 'DEKNINGSGRAD' },
    { visningstekst: 'Sykepengegrunnlag', filtereringstekst: 'SYKEPENGEGRUNNLAG' },
    { visningstekst: 'Arbeidstaker', filtereringstekst: 'ARBEIDSTAKER' },
    { visningstekst: 'Selvstendig næringsdrivende', filtereringstekst: 'SELVSTENDIG' },
    { visningstekst: 'Frilanser', filtereringstekst: 'FRILANSER' },
    { visningstekst: 'Inaktiv', filtereringstekst: 'INAKTIV' },
    { visningstekst: 'Arbeidsledig', filtereringstekst: 'ARBEIDSLEDIG' },
    { visningstekst: 'Uavklart', filtereringstekst: 'UAVKLART' },
]

const sortBeregningsregler = (regler: Beregningsregel[]): Beregningsregel[] => {
    return [...regler].sort((a, b) => {
        const aHjemmel = a.vilkårshjemmel
        const bHjemmel = b.vilkårshjemmel

        const aKapittel = parseInt(aHjemmel.kapittel) || 0
        const bKapittel = parseInt(bHjemmel.kapittel) || 0
        if (aKapittel !== bKapittel) {
            return aKapittel - bKapittel
        }

        const aParagraf = parseInt(aHjemmel.paragraf) || 0
        const bParagraf = parseInt(bHjemmel.paragraf) || 0
        if (aParagraf !== bParagraf) {
            return aParagraf - bParagraf
        }

        const aLedd = parseInt(aHjemmel.ledd || '0') || 0
        const bLedd = parseInt(bHjemmel.ledd || '0') || 0
        if (aLedd !== bLedd) {
            return aLedd - bLedd
        }

        const aSetning = parseInt(aHjemmel.setning || '0') || 0
        const bSetning = parseInt(bHjemmel.setning || '0') || 0
        if (aSetning !== bSetning) {
            return aSetning - bSetning
        }

        return (aHjemmel.bokstav || '').localeCompare(bHjemmel.bokstav || '')
    })
}

const Page = () => {
    const { data: serverBeregningsregler, isLoading } = useBeregningsregler()
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [copySuccessTimer, setCopySuccessTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [valgteFiltre, setValgteFiltre] = useState<string[]>([])

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
        if (!serverBeregningsregler?.data) return

        const redactedData = redactBeregningsreglerSistEndretAv(serverBeregningsregler.data.beregningsregler)
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

    const handleFilterToggle = (filterTekst: string, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setValgteFiltre((prev) =>
            prev.includes(filterTekst) ? prev.filter((filter) => filter !== filterTekst) : [...prev, filterTekst],
        )
    }

    const beregningsregler = useMemo(() => {
        return sortBeregningsregler(
            (serverBeregningsregler?.data.beregningsregler || []).map((regel) => ({
                ...regel,
                diskutertOgEndelig: regel.diskutertOgEndelig ?? false,
            })),
        )
    }, [serverBeregningsregler])

    const filtrerteBeregningsregler = useMemo(() => {
        if (valgteFiltre.length === 0) {
            return beregningsregler
        }

        return beregningsregler.filter((regel) =>
            valgteFiltre.every((filterTekst) => {
                if (filterTekst === 'UAVKLART') {
                    return !regel.diskutertOgEndelig
                }

                return regel.kode.toUpperCase().includes(filterTekst)
            }),
        )
    }, [beregningsregler, valgteFiltre])

    if (isLoading) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="p-6">
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
                        Beregningsregler
                    </Heading>
                    <p className="mt-2 text-sm text-gray-600">Read-only visning av siste versjon hentet fra bucket.</p>
                </div>
                <Button type="button" onClick={handleCopyKodeverk} variant="secondary" icon={<FilesIcon />}>
                    Kopier som json
                </Button>
            </div>

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

            <div className="mb-4 text-sm text-gray-600">
                Viser {filtrerteBeregningsregler.length} av {beregningsregler.length} beregningsregler.
            </div>

            <div>
                {filtrerteBeregningsregler.map((regel) => (
                    <BeregningsregelExpansionCard key={`${regel.kode}-${regel.beskrivelse}`} regel={regel} />
                ))}
            </div>
        </div>
    )
}

export default Page
