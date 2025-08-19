'use client'

import React, { ReactElement } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import { InternalHeaderTitle, InternalHeaderButton } from '@navikt/ds-react/InternalHeader'
import { SunIcon, MoonIcon } from '@navikt/aksel-icons'
import { useTheme } from 'next-themes'

import { BrukerMeny } from '@components/header/brukermeny/BrukerMeny'

export function Header(): ReactElement {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'dark'
    const pathname = usePathname()
    return (
        <InternalHeader className="h-14">
            <InternalHeaderTitle
                as={NextLink}
                href="/"
                className={pathname === '/' ? 'bg-ax-bg-accent-moderate-pressed' : ''}
            >
                Spillerom kodeverk admin
            </InternalHeaderTitle>
            <InternalHeaderButton
                as={NextLink}
                href="/kodeverk"
                className={pathname === '/kodeverk' ? 'bg-ax-bg-accent-moderate-pressed' : ''}
            >
                Kodeverk
            </InternalHeaderButton>
            <InternalHeaderButton
                as={NextLink}
                href="/saksbehandlergrensesnitt"
                className={pathname === '/saksbehandlergrensesnitt' ? 'bg-ax-bg-accent-moderate-pressed' : ''}
            >
                Saksbehandlergrensesnitt
            </InternalHeaderButton>
            <Spacer />
            <InternalHeaderButton
                as="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label={isDark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
                title={isDark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
            >
                {isDark ? <SunIcon aria-hidden fontSize="1.5rem" /> : <MoonIcon aria-hidden fontSize="1.5rem" />}
            </InternalHeaderButton>
            <BrukerMeny />
        </InternalHeader>
    )
}
