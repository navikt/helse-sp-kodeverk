import { NextResponse } from 'next/server'

import { ErrorResponse } from '@/auth/beskyttetApi'

const GITHUB_URL =
    'https://raw.githubusercontent.com/navikt/helse-bakrommet/refs/heads/main/bakrommet-common/src/main/kotlin/no/nav/helse/bakrommet/Beregningskoder.kt'

export async function GET(): Promise<NextResponse<string[] | ErrorResponse>> {
    try {
        // Hent innholdet fra GitHub
        const response = await fetch(GITHUB_URL)

        if (!response.ok) {
            return NextResponse.json(
                { message: `Kunne ikke hente data fra GitHub: ${response.statusText}` },
                { status: response.status },
            )
        }

        const content = await response.text()

        // Parse ut koder som slutter på komma
        const lines = content.split('\n')
        const koder: string[] = []

        for (const line of lines) {
            const trimmedLine = line.trim()
            // Sjekk om linjen slutter på komma og ikke er tom
            if (trimmedLine.endsWith(',') && trimmedLine.length > 1) {
                // Fjern kommaet og legg til koden
                const kode = trimmedLine.slice(0, -1).trim()
                if (kode) {
                    koder.push(kode)
                }
            }
        }

        return NextResponse.json(koder)
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Feil ved henting av beregningskoder:', error)
        return NextResponse.json({ message: 'Intern serverfeil ved henting av beregningskoder' }, { status: 500 })
    }
}
