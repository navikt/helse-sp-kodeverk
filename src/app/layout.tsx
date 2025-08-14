import '@navikt/ds-tokens/darkside-css'
import '../styles/globals.css'
import type { Metadata } from 'next'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Page } from '@navikt/ds-react'

import { erLokal } from '@/env'
import { Header } from '@/components/header/Header'
import { Preload } from '@/app/preload'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
    title: 'Spillerom kodeverk',
    icons: {
        icon: `/favicons/${erLokal ? 'favicon-local.ico' : 'favicon-dev.ico'}`,
    },
}

export default async function RootLayout({ children }: Readonly<PropsWithChildren>): Promise<ReactElement> {
    return (
        <html lang="nb" suppressHydrationWarning>
            <Preload />
            <body>
                <Providers>
                    <Page contentBlockPadding="none">
                        <Header />
                        {children}
                    </Page>
                </Providers>
            </body>
        </html>
    )
}
