import { useQuery } from '@tanstack/react-query'

export const useBakrommetBeregningskoder = () => {
    return useQuery<string[], Error>({
        queryKey: ['bakrommet-beregningskoder'],
        queryFn: async (): Promise<string[]> => {
            const response = await fetch('/api/v2/bakrommet-beregningsregler')
            if (!response.ok) {
                throw new Error('Kunne ikke hente beregningskoder fra bakrommet')
            }

            return response.json()
        },
        staleTime: 5 * 60 * 1000, // 5 minutter
        gcTime: 10 * 60 * 1000, // 10 minutter
    })
}
