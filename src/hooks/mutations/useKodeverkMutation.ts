import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { KodeverkForm } from '@/schemas/kodeverk'
import { postWithOptimisticLocking } from '@utils/fetch'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'

const successSchema = z.object({ success: z.boolean() })

export function useKodeverkMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data, etag }: { data: KodeverkForm; etag?: string }) => {
            return postWithOptimisticLocking('/api/v2/kodeverk', successSchema, data.vilkar, etag)
        },
        onSuccess: () => {
            // Invalider kodeverk query for å hente nyeste data
            queryClient.invalidateQueries({ queryKey: ['kodeverk'] })
        },
        onError: (error) => {
            if (error instanceof ProblemDetailsError && error.problem.status === 409) {
                // Hvis det er en konflikt, invalider kodeverk query for å hente nyeste versjon
                queryClient.invalidateQueries({ queryKey: ['kodeverk'] })
            }
        },
    })
}
