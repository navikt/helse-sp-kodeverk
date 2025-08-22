import { useQuery } from '@tanstack/react-query'

import { KodeverkForm, kodeverkSchema } from '@/schemas/kodeverk'

export interface KodeverkWithEtag {
    data: KodeverkForm
    etag: string
}

export function useKodeverk() {
    return useQuery<KodeverkWithEtag, Error>({
        queryKey: ['kodeverk'],
        queryFn: async () => {
            const response = await fetch('/api/v2/open/kodeverk')
            if (!response.ok) {
                throw new Error('Failed to fetch kodeverk')
            }

            const data = await response.json()
            const etag = response.headers.get('ETag') || ''

            return {
                data: { vilkar: kodeverkSchema.parse(data) },
                etag,
            }
        },
    })
}
