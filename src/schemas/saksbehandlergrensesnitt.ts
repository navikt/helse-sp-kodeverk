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

// Hele kodeverket
export const hovedspørsmålArraySchema = z.array(hovedspørsmålSchema)

export const hovedspørsmålFormSchema = z.object({
    vilkar: z.array(hovedspørsmålSchema),
})

// Type exports
export type Hovedspørsmål = z.infer<typeof hovedspørsmålSchema>
export type HovedspørsmålArray = z.infer<typeof hovedspørsmålArraySchema>
export type HovedspørsmålForm = z.infer<typeof hovedspørsmålFormSchema>
