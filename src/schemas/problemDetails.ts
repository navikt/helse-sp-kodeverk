// src/schemas/problemDetails.ts
import { z } from 'zod'

/** Minimal RFC 9457 – tillat ekstra felter med .passthrough()  */
export const problemDetailsSchema = z
    .object({
        type: z.string(), // «about:blank» eller absolutt URI
        title: z.string().optional(),
        status: z.number(), // må være HTTP-kode
        detail: z.string().optional().nullable(),
        instance: z.string().optional().nullable(),
    })
    .passthrough()

export type ProblemDetails = z.infer<typeof problemDetailsSchema>
