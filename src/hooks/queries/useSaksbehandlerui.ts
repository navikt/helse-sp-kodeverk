import { useQuery } from '@tanstack/react-query'

import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export interface SaksbehandleruiWithEtag {
    data: HovedspørsmålArray
    etag: string
}

export function useSaksbehandlerui() {
    return useQuery<SaksbehandleruiWithEtag, Error>({
        queryKey: ['saksbehandlerui'],
        queryFn: async () => {
            const response = await fetch('/api/v2/open/saksbehandlerui')
            if (!response.ok) {
                throw new Error('Failed to fetch saksbehandlerui')
            }

            const data = await response.json()
            const etag = response.headers.get('ETag') || ''

            return {
                data: data as HovedspørsmålArray,
                etag,
            }
        },
    })
}
