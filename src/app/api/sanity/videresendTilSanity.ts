import { getServerEnv, sanityBaseUrl } from '@/env'

export const videresendTilSanity = async <T>(query: string): Promise<T> => {
    const dataset = getServerEnv().SANITY_DATASET
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(dataset === 'production' ? { Authorization: `Bearer ${getServerEnv().SANITY_READ_DATASETS_TOKEN}` } : {}),
    }

    const url = new URL(sanityBaseUrl())
    url.searchParams.set('perspective', 'published')

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        throw new Error(`Sanity request failed: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as Promise<T>
}
