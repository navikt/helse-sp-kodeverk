import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'
import { postWithOptimisticLocking } from '@utils/fetch'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'

const successSchema = z.object({ success: z.boolean() })

export function useSaksbehandleruiMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data, etag }: { data: HovedspørsmålArray; etag?: string }) => {
            return postWithOptimisticLocking('/api/v2/saksbehandlerui', successSchema, data, etag)
        },
        onSuccess: () => {
            // Invalider saksbehandlerui query for å hente nyeste data
            queryClient.invalidateQueries({ queryKey: ['saksbehandlerui'] })
        },
        onError: (error) => {
            if (error instanceof ProblemDetailsError && error.problem.status === 409) {
                // Hvis det er en konflikt, invalider saksbehandlerui query for å hente nyeste versjon
                queryClient.invalidateQueries({ queryKey: ['saksbehandlerui'] })
            }
        },
    })
}
