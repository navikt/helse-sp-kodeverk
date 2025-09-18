import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { BeregningsregelForm } from '@/schemas/beregningsregler'
import { postWithOptimisticLocking } from '@utils/fetch'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'

const successSchema = z.object({ success: z.boolean() })

interface SaveBeregningsregelPayload {
    data: BeregningsregelForm
    etag?: string
}

export const useBeregningsregelMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data, etag }: SaveBeregningsregelPayload) => {
            return postWithOptimisticLocking('/api/v2/beregningsregler', successSchema, data, etag)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['beregningsregler'] })
        },
        onError: (error) => {
            if (error instanceof ProblemDetailsError && error.problem.status === 409) {
                // Hvis det er en konflikt, invalider beregningsregler query for å hente nyeste versjon
                queryClient.invalidateQueries({ queryKey: ['beregningsregler'] })
            }
        },
    })
}
