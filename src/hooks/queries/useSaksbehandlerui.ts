import { useQuery } from '@tanstack/react-query'

import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export function useSaksbehandlerui() {
    return useQuery<HovedspørsmålArray, Error>({
        queryKey: ['saksbehandlerui'],
        queryFn: async () => {
            const response = await fetch('/api/v2/open/saksbehandlerui')
            if (!response.ok) {
                throw new Error('Failed to fetch saksbehandlerui')
            }
            const data = await response.json()
            return data as HovedspørsmålArray
        },
    })
}
