import { z, ZodError } from 'zod'

import { problemDetailsSchema } from '@/schemas/problemDetails'
import { ProblemDetailsError } from '@utils/ProblemDetailsError'

export async function fetchAndParse<T>(url: string, schema: z.ZodType<T>, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options)
    const isJson = (res.headers.get('content-type') ?? '').includes('json')
    const payload: unknown = isJson ? await res.json() : await res.text()

    if (res.ok) {
        try {
            return schema.parse(payload)
        } catch (error) {
            if (error instanceof ZodError) {
                /* eslint-disable-next-line no-console */
                console.error('Zod parsing error:', error)
                throw new Error('Invalid response format from server')
            }
            throw error
        }
    }

    const maybeProblem = problemDetailsSchema.safeParse(payload)
    if (maybeProblem.success) {
        throw new ProblemDetailsError(maybeProblem.data)
    }

    if (typeof payload === 'object' && payload !== null && 'error' in payload && 'details' in payload) {
        const errorPayload = payload as { error: unknown; details: unknown }
        const errorMessage = typeof errorPayload.error === 'string' ? errorPayload.error : 'Valideringsfeil'
        const details = errorPayload.details

        let detailMessage = errorMessage
        if (
            typeof details === 'object' &&
            details !== null &&
            '_errors' in details &&
            Array.isArray((details as { _errors: unknown })._errors)
        ) {
            const errors = (details as { _errors: string[] })._errors
            if (errors.length > 0) {
                detailMessage = errors.join('; ')
            }
        }

        throw new ProblemDetailsError({
            title: errorMessage,
            status: res.status,
            detail: detailMessage,
            type: 'about:blank',
        })
    }

    throw new ProblemDetailsError({
        title: 'Ukjent feil',
        status: res.status,
        detail: `Failed to fetch ${url}: ${res.status}`,
        type: 'about:blank',
    })
}
