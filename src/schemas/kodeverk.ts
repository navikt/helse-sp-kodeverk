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

export const vilkårshjemmelSchema = z.object({
    lovverk: z.string().min(2),
    lovverksversjon: z.string().min(2), // evt. valider som datoformat om ønskelig
    kapittel: z.string(),
    paragraf: z.string(),
    ledd: maybeString,
    setning: maybeString,
    bokstav: maybeString,
})

export const årsakSchema = z.object({
    kode: z
        .string()
        .min(2)
        .regex(/^[A-Z0-9_]+$/, 'Kode må kun inneholde store bokstaver A-Z, tall og underscore'),
    beskrivelse: z.string().min(2),
    vilkårshjemmel: vilkårshjemmelSchema.optional(), // noen Årsak-er har dette
})

export const vilkårSchema = z.object({
    vilkårshjemmel: vilkårshjemmelSchema,
    vilkårskode: z.string().min(5),
    beskrivelse: z.string().min(5),
    oppfylt: z.array(årsakSchema),
    ikkeOppfylt: z.array(årsakSchema),
})

// Hele kodeverket
export const kodeverkSchema = z.array(vilkårSchema)

export const kodeverkFormSchema = z.object({
    vilkar: kodeverkSchema,
})

// Type exports
export type Årsak = z.infer<typeof årsakSchema>
export type Vilkår = z.infer<typeof vilkårSchema>
export type Vilkårshjemmel = z.infer<typeof vilkårshjemmelSchema>
export type Kodeverk = z.infer<typeof kodeverkSchema>
export type KodeverkForm = z.infer<typeof kodeverkFormSchema>
