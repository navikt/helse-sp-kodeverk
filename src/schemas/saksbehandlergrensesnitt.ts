import { z } from 'zod'

// Basert på Maybe<T> = T | null | undefined
const maybeString = z.string().nullable().optional()

export const kategoriEnum = z.enum([
    'generelle_bestemmelser',
    'arbeidstakere',
    'selvstendig_næringsdrivende',
    'frilansere',
    'medlemmer_med_kombinerte_inntekter',
    'særskilte_grupper',
    'medlemmer_med_rett_til_andre_ytelser',
    'opphold_i_institusjon',
    'yrkesskade',
])

// Definerer typene eksplisitt først for å unngå sirkulær referanse
export const alternativSchema: z.ZodType<{
    kode: string
    navn?: string | null | undefined
    harUnderspørsmål?: boolean
    underspørsmål?: Array<{
        kode: string
        navn?: string | null | undefined
        variant: 'CHECKBOX' | 'RADIO' | 'SELECT'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        alternativer?: any[]
    }>
}> = z.object({
    kode: z.string().min(2),
    navn: maybeString,
    harUnderspørsmål: z.boolean().optional().default(false),
    underspørsmål: z.array(z.lazy(() => underspørsmålSchema)).optional(),
})

export const underspørsmålSchema: z.ZodType<{
    kode: string
    navn?: string | null | undefined
    variant: 'CHECKBOX' | 'RADIO' | 'SELECT'
    alternativer?: Array<{
        kode: string
        navn?: string | null | undefined
        harUnderspørsmål?: boolean
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        underspørsmål?: any[]
    }>
}> = z.object({
    kode: z.string().min(2),
    navn: maybeString,
    variant: z.enum(['CHECKBOX', 'RADIO', 'SELECT']),
    alternativer: z.array(z.lazy(() => alternativSchema)).optional(),
})

export const hovedspørsmålSchema = z.object({
    kode: z.string(),
    beskrivelse: z.string().min(5),
    kategori: kategoriEnum,
    paragrafTag: z.string().min(1),
    underspørsmål: z.array(underspørsmålSchema),
    sistEndretAv: maybeString,
    sistEndretDato: z.string().datetime().optional(),
})

// Hjelpefunksjon for å validere unike koder blant søsken alternativer
function validerUnikeKoderISøskenAlternativer(
    alternativer: Array<{ kode: string }> | undefined,
    sti: string[] = [],
): { success: true } | { success: false; feilmelding: string } {
    if (!alternativer || alternativer.length === 0) {
        return { success: true }
    }

    const koder = alternativer.map((alt) => alt.kode)
    const duplikater = koder.filter((kode, index) => koder.indexOf(kode) !== index)
    const unikeDuplikater = [...new Set(duplikater)]

    if (unikeDuplikater.length > 0) {
        const stiTekst = sti.length > 0 ? ` (sti: ${sti.join(' > ')})` : ''
        return {
            success: false,
            feilmelding: `Duplikate koder funnet blant søsken alternativer: ${unikeDuplikater.join(', ')}${stiTekst}`,
        }
    }

    return { success: true }
}

// Rekursiv validering av hele strukturen
function validerAlleSøskenAlternativer(
    data: z.infer<typeof hovedspørsmålSchema>[],
): { success: true } | { success: false; feilmelding: string } {
    function validerAlternativer(
        alternativer: Array<{ kode: string; underspørsmål?: unknown[] }> | undefined,
        sti: string[],
    ): { success: true } | { success: false; feilmelding: string } {
        if (!alternativer) {
            return { success: true }
        }

        // Valider at søsken alternativer har unike koder
        const validering = validerUnikeKoderISøskenAlternativer(alternativer, sti)
        if (!validering.success) {
            return validering
        }

        // Rekursivt valider underspørsmål i hvert alternativ
        for (const alternativ of alternativer) {
            if (alternativ.underspørsmål && Array.isArray(alternativ.underspørsmål)) {
                for (const underspørsmål of alternativ.underspørsmål) {
                    if (
                        typeof underspørsmål === 'object' &&
                        underspørsmål !== null &&
                        'alternativer' in underspørsmål &&
                        'kode' in underspørsmål &&
                        typeof (underspørsmål as { kode: unknown }).kode === 'string'
                    ) {
                        const underspørsmålMedKode = underspørsmål as {
                            kode: string
                            alternativer?: Array<{ kode: string; underspørsmål?: unknown[] }>
                        }
                        const nySti = [...sti, alternativ.kode, underspørsmålMedKode.kode]
                        const resultat = validerAlternativer(underspørsmålMedKode.alternativer, nySti)
                        if (!resultat.success) {
                            return resultat
                        }
                    }
                }
            }
        }

        return { success: true }
    }

    function validerUnderspørsmål(
        underspørsmål: Array<{ kode: string; alternativer?: Array<{ kode: string; underspørsmål?: unknown[] }> }>,
        sti: string[],
    ): { success: true } | { success: false; feilmelding: string } {
        for (const spørsmål of underspørsmål) {
            const nySti = [...sti, spørsmål.kode]
            const resultat = validerAlternativer(spørsmål.alternativer, nySti)
            if (!resultat.success) {
                return resultat
            }
        }
        return { success: true }
    }

    // Valider hvert hovedspørsmål
    for (const hovedspørsmål of data) {
        const resultat = validerUnderspørsmål(hovedspørsmål.underspørsmål, [hovedspørsmål.kode])
        if (!resultat.success) {
            return resultat
        }
    }

    return { success: true }
}

// Hele kodeverket
export const hovedspørsmålArraySchema = z.array(hovedspørsmålSchema).superRefine((data, ctx) => {
    const validering = validerAlleSøskenAlternativer(data)
    if (!validering.success) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: validering.feilmelding,
        })
    }
})

export const hovedspørsmålFormSchema = z.object({
    vilkar: z.array(hovedspørsmålSchema),
})

// Type exports
export type Hovedspørsmål = z.infer<typeof hovedspørsmålSchema>
export type HovedspørsmålArray = z.infer<typeof hovedspørsmålArraySchema>
export type HovedspørsmålForm = z.infer<typeof hovedspørsmålFormSchema>
