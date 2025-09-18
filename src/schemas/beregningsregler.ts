import { z } from 'zod'

import { vilkårshjemmelSchema } from './kodeverk'

// Basert på Maybe<T> = T | null | undefined
const maybeString = z.string().nullable().optional()

export const beregningsregelSchema = z.object({
    kode: z
        .string()
        .min(2)
        .regex(/^[A-Z0-9_]+$/, 'Kode må kun inneholde store bokstaver A-Z, tall og underscore'),
    beskrivelse: z.string().min(5),
    vilkårshjemmel: vilkårshjemmelSchema,
    sistEndretAv: maybeString,
    sistEndretDato: z.string().datetime().optional(),
})

// Hele beregningsregelverket
export const beregningsregelverkSchema = z.array(beregningsregelSchema)

export const beregningsregelFormSchema = z.object({
    beregningsregler: z.array(beregningsregelSchema),
})

// Type exports
export type Beregningsregel = z.infer<typeof beregningsregelSchema>
export type Beregningsregelverk = z.infer<typeof beregningsregelverkSchema>
export type BeregningsregelForm = z.infer<typeof beregningsregelFormSchema>
