import { z, ZodError } from 'zod'

export type PublicEnv = z.infer<typeof browserEnvSchema>

export const browserEnvSchema = z.object({
    NEXT_PUBLIC_RUNTIME_ENV: z.union([z.literal('dev'), z.literal('lokal'), z.literal('demo'), z.literal('prod')]),
    NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = browserEnvSchema.parse({
    NEXT_PUBLIC_RUNTIME_ENV: process.env.NEXT_PUBLIC_RUNTIME_ENV,
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
} satisfies Record<keyof PublicEnv, string | undefined>)

export const erLokal = browserEnv.NEXT_PUBLIC_RUNTIME_ENV === 'lokal'
export const erDev = browserEnv.NEXT_PUBLIC_RUNTIME_ENV === 'dev'
export const erDemo = browserEnv.NEXT_PUBLIC_RUNTIME_ENV === 'demo'
export const erLokalEllerDemo = erLokal || erDemo
export const erProd = browserEnv.NEXT_PUBLIC_RUNTIME_ENV === 'prod'

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    // Provided by nais
    SANITY_DATASET: z.enum(['production', 'local-development']),
    SANITY_READ_DATASETS_TOKEN: z.string(),
})

const getRawServerConfig = (): Partial<unknown> =>
    ({
        SANITY_DATASET: process.env.SANITY_DATASET,
        SANITY_READ_DATASETS_TOKEN: process.env.SANITY_READ_DATASETS_TOKEN,
    }) satisfies Record<keyof ServerEnv, string | undefined>

export function getServerEnv(): ServerEnv & PublicEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...browserEnvSchema.parse(browserEnv) }
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            )
        } else {
            throw e
        }
    }
}
export const sanityBaseUrl = () =>
    'https://z9kr8ddn.api.sanity.io/v2023-08-01/data/query/' + getServerEnv().SANITY_DATASET
