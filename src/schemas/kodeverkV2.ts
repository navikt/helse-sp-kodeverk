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

export const oppfyltEnum = z.enum(['OPPFYLT', 'IKKE_OPPFYLT', 'N/A'])

export const vilkårshjemmelSchema = z.object({
    lovverk: z.string().min(2),
    lovverksversjon: z.string().min(2), // evt. valider som datoformat om ønskelig
    paragraf: z.string(),
    ledd: maybeString,
    setning: maybeString,
    bokstav: maybeString,
})
export type Vilkårshjemmel = z.infer<typeof vilkårshjemmelSchema>

// Definerer typene eksplisitt først for å unngå sirkulær referanse
export const alternativSchema: z.ZodType<{
    kode: string
    navn: string
    oppfylt?: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'N/A'
    vilkårshjemmel?: Vilkårshjemmel | null
    underspørsmål?: Array<{
        kode: string
        navn: string
        variant: 'CHECKBOX' | 'RADIO' | 'SELECT'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        alternativer?: any[]
    }>
}> = z.object({
    kode: z.string().min(2),
    navn: z.string().min(2),
    oppfylt: oppfyltEnum.default('N/A').optional(),
    vilkårshjemmel: vilkårshjemmelSchema.nullable().optional(),
    underspørsmål: z.array(z.lazy(() => underspørsmålSchema)).optional(),
})

export const underspørsmålSchema: z.ZodType<{
    kode: string
    navn: string
    variant: 'CHECKBOX' | 'RADIO' | 'SELECT'
    alternativer?: Array<{
        kode: string
        navn: string
        oppfylt?: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'N/A'
        vilkårshjemmel?: Vilkårshjemmel | null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        underspørsmål?: any[]
    }>
}> = z.object({
    kode: z.string().min(2),
    navn: z.string().min(2),
    variant: z.enum(['CHECKBOX', 'RADIO', 'SELECT']),
    alternativer: z.array(z.lazy(() => alternativSchema)).optional(),
})

export const vilkårSchema = z.object({
    vilkårshjemmel: vilkårshjemmelSchema,
    vilkårskode: z.string().min(5),
    beskrivelse: z.string().min(5),
    kategori: kategoriEnum,
    underspørsmål: z.array(underspørsmålSchema),
})

// Hele kodeverket
export const kodeverkSchema = z.array(vilkårSchema)

export const kodeverkFormSchema = z.object({
    vilkar: kodeverkSchema,
})

// Type exports
export type Vilkår = z.infer<typeof vilkårSchema>
export type Kodeverk = z.infer<typeof kodeverkSchema>
export type KodeverkForm = z.infer<typeof kodeverkFormSchema>
export type OppfyltStatus = z.infer<typeof oppfyltEnum>
