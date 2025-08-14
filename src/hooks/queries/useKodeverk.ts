import { useQuery } from '@tanstack/react-query'

import { KodeverkForm, kodeverkSchema } from '@/schemas/kodeverk'
import { fetchAndParse } from '@utils/fetch'

export function useKodeverk() {
    return useQuery<KodeverkForm, Error>({
        queryKey: ['kodeverk'],
        queryFn: async () => {
            const data = await fetchAndParse('/api/v1/open/kodeverk', kodeverkSchema)
            return { vilkar: data }
        },
    })
}
