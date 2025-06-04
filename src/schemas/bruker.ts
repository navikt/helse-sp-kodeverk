import { z } from 'zod'

export type Bruker = z.infer<typeof brukerSchema>
export const brukerSchema = z.object({
    navn: z.string(),
    navIdent: z.string(),
    preferredUsername: z.string(),
})
