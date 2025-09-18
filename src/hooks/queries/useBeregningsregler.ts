import { useQuery } from '@tanstack/react-query'

import { BeregningsregelForm, beregningsregelverkSchema } from '@/schemas/beregningsregler'

export interface BeregningsregelWithEtag {
    data: BeregningsregelForm
    etag: string
}

export const useBeregningsregler = () => {
    return useQuery<BeregningsregelWithEtag, Error>({
        queryKey: ['beregningsregler'],
        queryFn: async (): Promise<BeregningsregelWithEtag> => {
            const response = await fetch('/api/v2/open/beregningsregler')
            if (!response.ok) {
                throw new Error('Failed to fetch beregningsregler')
            }

            const data = await response.json()
            const etag = response.headers.get('ETag') || ''

            return {
                data: { beregningsregler: beregningsregelverkSchema.parse(data) },
                etag,
            }
        },
    })
}
