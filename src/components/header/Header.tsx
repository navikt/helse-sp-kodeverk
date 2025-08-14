'use client'

import React, { ReactElement } from 'react'
import NextLink from 'next/link'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import { InternalHeaderTitle, InternalHeaderButton } from '@navikt/ds-react/InternalHeader'
import { SunIcon, MoonIcon } from '@navikt/aksel-icons'
import { useTheme } from 'next-themes'

import { BrukerMeny } from '@components/header/brukermeny/BrukerMeny'

export function Header(): ReactElement {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'dark'
    return (
        <InternalHeader
            className="h-14"
            style={
                {
                    '--ac-internalheader-hover-bg': 'var(--a-blue-700)',
                    '--ac-internalheader-bg': 'var(--a-blue-800)',
                    '--ac-internalheader-active-bg': 'var(--a-blue-600)',
                } as React.CSSProperties
            }
        >
            <InternalHeaderTitle as={NextLink} href="/">
                Spillerom kodeverk admin
            </InternalHeaderTitle>
            <InternalHeaderButton as={NextLink} href="/kodeverk">
                Kodeverk
            </InternalHeaderButton>
            <InternalHeaderButton as={NextLink} href="/ui">
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
