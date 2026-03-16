'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Alert, ExpansionCard, Heading } from '@navikt/ds-react'
import { FilesIcon } from '@navikt/aksel-icons'

import { MetadataVisning } from '@/components/MetadataVisning'
import { SpørsmålVisning } from '@/components/saksbehandlergrensesnitt/SpørsmålVisning'
import { useKodeverk, KodeverkWithEtag } from '@/hooks/queries/useKodeverk'
import { useSaksbehandlerui } from '@hooks/queries/useSaksbehandlerui'
import { Hovedspørsmål } from '@/schemas/saksbehandlergrensesnitt'
import { redactSaksbehandlergrensesnittSistEndretAv, copyKodeverkToClipboard } from '@utils/redactSistEndretAv'

const kategoriTekster: Record<Hovedspørsmål['kategori'], string> = {
    generelle_bestemmelser: 'Generelle bestemmelser',
    arbeidstakere: 'Arbeidstakere',
    selvstendig_næringsdrivende: 'Selvstendig næringsdrivende',
    frilansere: 'Frilansere',
    medlemmer_med_kombinerte_inntekter: 'Medlemmer med kombinerte inntekter',
    særskilte_grupper: 'Særskilte grupper',
    medlemmer_med_rett_til_andre_ytelser: 'Medlemmer med rett til andre ytelser',
    opphold_i_institusjon: 'Opphold i institusjon',
    yrkesskade: 'Yrkesskade',
}

const collectKodeverkCodes = (kodeverk: KodeverkWithEtag | undefined): Set<string> => {
    if (!kodeverk?.data?.vilkar) {
        return new Set<string>()
    }

    const alleKjenteKoder = new Set<string>()
    for (const vilkår of kodeverk.data.vilkar) {
        for (const årsak of vilkår.oppfylt) {
            alleKjenteKoder.add(årsak.kode)
        }
        for (const årsak of vilkår.ikkeOppfylt) {
            alleKjenteKoder.add(årsak.kode)
        }
    }
    return alleKjenteKoder
}

const containsUnknownAlternatives = (hovedspørsmål: Hovedspørsmål, kjenteKoder: Set<string>): boolean => {
    const checkAlternativer = (
        alternativer: NonNullable<Hovedspørsmål['underspørsmål'][number]['alternativer']>,
    ): boolean => {
        for (const alternativ of alternativer) {
            const hasNested = Boolean(alternativ.underspørsmål?.length)
            if (!hasNested && !kjenteKoder.has(alternativ.kode)) {
                return true
            }

            for (const underspørsmål of alternativ.underspørsmål || []) {
                if (underspørsmål.alternativer && checkAlternativer(underspørsmål.alternativer)) {
                    return true
                }
            }
        }

        return false
    }

    for (const underspørsmål of hovedspørsmål.underspørsmål) {
        if (underspørsmål.alternativer && checkAlternativer(underspørsmål.alternativer)) {
            return true
        }
    }

    return false
}

const Page = () => {
    const { data: serverKodeverk, isLoading } = useSaksbehandlerui()
    const { data: kodeverkData } = useKodeverk()
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [copySuccessTimer, setCopySuccessTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

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

        const redactedData = redactSaksbehandlergrensesnittSistEndretAv(serverKodeverk.data)
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

    const kjenteKoder = useMemo(() => collectKodeverkCodes(kodeverkData), [kodeverkData])
    const hovedspørsmålMedUkjenteKoder = useMemo(() => {
        return new Set(
            (serverKodeverk?.data || [])
                .map((spørsmål, index) => (containsUnknownAlternatives(spørsmål, kjenteKoder) ? index : -1))
                .filter((index) => index >= 0),
        )
    }, [kjenteKoder, serverKodeverk])

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
                        Saksbehandlergrensesnitt
                    </Heading>
                    <p className="mt-2 text-sm text-gray-600">
                        Read-only visning av spørsmålstrukturen hentet fra bucket.
                    </p>
                </div>
                <Button type="button" onClick={handleCopyKodeverk} variant="secondary" icon={<FilesIcon />}>
                    Kopier som json
                </Button>
            </div>

            <div className="mb-4 text-sm text-gray-600">Viser {(serverKodeverk?.data || []).length} hovedspørsmål.</div>

            <div className="space-y-4">
                {(serverKodeverk?.data || []).map((hovedspørsmål, index) => (
                    <ExpansionCard
                        key={hovedspørsmål.kode}
                        size="small"
                        aria-label={`Hovedspørsmål ${hovedspørsmål.kode}`}
                    >
                        <ExpansionCard.Header>
                            <ExpansionCard.Title>{hovedspørsmål.beskrivelse}</ExpansionCard.Title>
                            <ExpansionCard.Description>
                                <span className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-600">Kode: {hovedspørsmål.kode}</span>
                                    <span className="text-sm text-gray-600">
                                        Kategori: {kategoriTekster[hovedspørsmål.kategori]}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Paragraf-tag: {hovedspørsmål.paragrafTag}
                                    </span>
                                    <MetadataVisning
                                        sistEndretAv={hovedspørsmål.sistEndretAv}
                                        sistEndretDato={hovedspørsmål.sistEndretDato}
                                        size="small"
                                        className="mt-2"
                                    />
                                </span>
                            </ExpansionCard.Description>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <div className="space-y-4">
                                {hovedspørsmålMedUkjenteKoder.has(index) && (
                                    <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                                        Minst ett svaralternativ peker på en kode som ikke finnes i kodeverket.
                                    </div>
                                )}

                                {hovedspørsmål.underspørsmål.length === 0 ? (
                                    <p className="text-sm text-gray-500">Ingen underspørsmål registrert.</p>
                                ) : (
                                    hovedspørsmål.underspørsmål.map((spørsmål) => (
                                        <SpørsmålVisning
                                            key={`${hovedspørsmål.kode}-${spørsmål.kode}`}
                                            spørsmål={spørsmål}
                                            kjenteKoder={kjenteKoder}
                                        />
                                    ))
                                )}
                            </div>
                        </ExpansionCard.Content>
                    </ExpansionCard>
                ))}
            </div>
        </div>
    )
}

export default Page
