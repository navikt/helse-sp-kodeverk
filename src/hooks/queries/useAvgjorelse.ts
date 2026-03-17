import { useQuery } from '@tanstack/react-query'

import { AvgjorelseResponse, avgjorelseResponseSchema } from '@/schemas/avgjorelse'

export function useAvgjorelse() {
    return useQuery<AvgjorelseResponse, Error>({
        queryKey: ['avgjorelse'],
        queryFn: async () => {
            const response = await fetch('/api/sanity/avgjorelse')
            if (!response.ok) {
                throw new Error('Failed to fetch avgjørelser')
            }
            const data = await response.json()
            return avgjorelseResponseSchema.parse(data)
        },
    })
}
