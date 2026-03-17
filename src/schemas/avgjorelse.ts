import { z } from 'zod'

export const avgjorelseKodeSchema = z.object({
    _id: z.string(),
    _type: z.literal('avgjorelse.kode'),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    _rev: z.string(),
    kode: z.string(),
})

export const avgjorelseAlternativSchema = z.object({
    _key: z.string(),
    _type: z.literal('avgjorelse.alternativ'),
    beskrivelse: z.string(),
    kode: z.string(),
})

export const avgjorelseSchema = z.object({
    _id: z.string(),
    _type: z.literal('avgjorelse'),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    _rev: z.string(),
    beskrivelse: z.string(),
    kode: avgjorelseKodeSchema,
    alternativer: z.array(avgjorelseAlternativSchema),
})

export const avgjorelseResponseSchema = z.object({
    result: z.array(avgjorelseSchema),
})

export type AvgjorelseKode = z.infer<typeof avgjorelseKodeSchema>
export type AvgjorelseAlternativ = z.infer<typeof avgjorelseAlternativSchema>
export type Avgjorelse = z.infer<typeof avgjorelseSchema>
export type AvgjorelseResponse = z.infer<typeof avgjorelseResponseSchema>
