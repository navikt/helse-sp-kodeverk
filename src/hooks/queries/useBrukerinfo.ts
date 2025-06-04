import { useQuery } from '@tanstack/react-query'

import { Bruker, brukerSchema } from '@/schemas/bruker'
import { fetchAndParse } from '@utils/fetch'

export function useBrukerinfo() {
    return useQuery<Bruker, Error>({
        queryKey: ['brukerinfo'],
        queryFn: async () => fetchAndParse('/api/v1/bruker', brukerSchema),
    })
}
