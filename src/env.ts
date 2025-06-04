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
    AZURE_APP_CLIENT_ID: z.string(),
    AZURE_APP_CLIENT_SECRET: z.string(),
    AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: z.string(),
    AZURE_APP_WELL_KNOWN_URL: z.string(),
    AZURE_APP_PRE_AUTHORIZED_APPS: z.string(),
    BAKROMMET_SCOPE: z.string(),
    BAKROMMET_HOST: z.string(),
    MODIA_SCOPE: z.string(),
    MODIA_BASE_URL: z.string(),
})

const getRawServerConfig = (): Partial<unknown> =>
    ({
        AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
        AZURE_APP_CLIENT_SECRET: process.env.AZURE_APP_CLIENT_SECRET,
        AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
        AZURE_APP_WELL_KNOWN_URL: process.env.AZURE_APP_WELL_KNOWN_URL,
        AZURE_APP_PRE_AUTHORIZED_APPS: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
        BAKROMMET_SCOPE: process.env.BAKROMMET_SCOPE,
        BAKROMMET_HOST: process.env.BAKROMMET_HOST,
        MODIA_SCOPE: process.env.MODIA_SCOPE,
        MODIA_BASE_URL: process.env.MODIA_BASE_URL,
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
