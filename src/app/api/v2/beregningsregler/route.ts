import { NextRequest, NextResponse } from 'next/server'
import { File, Storage } from '@google-cloud/storage'

import { beskyttetApi, ErrorResponse } from '@/auth/beskyttetApi'
import { lokalUtviklingBeregningsregler } from '@/kodeverk/mockdata/beregningsregler'
import { beregningsregelFormSchema } from '@schemas/beregningsregler'
import { Beregningsregelverk } from '@schemas/beregningsregler'
import { kodeverkStore } from '@/mockapi/storage'

const storage = new Storage()
const bucketName = 'helse-sp-kodeverk'

export async function GET(): Promise<NextResponse<Beregningsregelverk | ErrorResponse>> {
    // hvis development returner lokalt beregningsregler
    if (process.env.NODE_ENV === 'development') {
        const response = NextResponse.json(kodeverkStore.beregningsregler)
        response.headers.set('ETag', 'development-local')
        return response
    }

    const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
    // Filter out files that start with "v1-" to only include v1 files
    const v1Files = files.filter((file: File) => file.name.startsWith('v1-'))
    const latest = v1Files.sort((a: File, b: File) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

    if (!latest) {
        const response = NextResponse.json(lokalUtviklingBeregningsregler)
        response.headers.set('ETag', 'no-files')
        return response
    }

    // return content from latest file
    const [contents] = await latest.download()
    const parsed = JSON.parse(contents.toString())

    const response = NextResponse.json(parsed)
    // Returner filnavnet som ETag for optimistisk låsing
    response.headers.set('ETag', latest.name)
    return response
}

export async function POST(request: NextRequest): Promise<NextResponse<object | ErrorResponse>> {
    return await beskyttetApi<object>(request, async (payload): Promise<NextResponse<object>> => {
        try {
            const body = await request.json()

            // Validate request body against schema
            const validationResult = beregningsregelFormSchema.safeParse(body)
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: 'Invalid beregningsregler format', details: validationResult.error.format() },
                    { status: 400 },
                )
            }

            // hvis development oppdater lokalt beregningsregler
            if (process.env.NODE_ENV === 'development') {
                // Lagre med metadata som kommer fra frontend
                kodeverkStore.beregningsregler = validationResult.data.beregningsregler
                return NextResponse.json({ success: true })
            }

            // Sjekk optimistisk låsing
            const ifMatchHeader = request.headers.get('If-Match')
            if (ifMatchHeader) {
                const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
                const v1Files = files.filter((file) => file.name.startsWith('v1-'))
                const latest = v1Files.sort((a, b) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

                if (latest && latest.name !== ifMatchHeader) {
                    // Hent informasjon om hvem som gjorde siste endringen
                    const lastModifiedBy = latest.metadata?.metadata?.createdBy || 'ukjent bruker'
                    const lastModifiedAt = latest.metadata?.metadata?.createdAt || 'ukjent tidspunkt'

                    const conflictProblem = {
                        type: 'https://helse-sp-kodeverk.no/problems/concurrent-modification',
                        title: 'Konkurrerende endring oppdaget',
                        status: 409,
                        detail: `Beregningsreglene ble endret av ${lastModifiedBy} den ${new Date(String(lastModifiedAt)).toLocaleString('nb-NO')}. Vennligst hent den nyeste versjonen og prøv igjen.`,
                        instance: request.url,
                        lastModifiedBy,
                        lastModifiedAt,
                        expectedVersion: ifMatchHeader,
                        currentVersion: latest.name,
                    }

                    return NextResponse.json(conflictProblem, { status: 409 })
                }
            }

            // filename is current timestamp
            const fileName = `v1-beregningsregler-${Date.now()}.json`
            const bucket = storage.bucket(bucketName)
            const file = bucket.file(fileName)

            await file.save(JSON.stringify(validationResult.data.beregningsregler), {
                contentType: 'application/json',
                metadata: {
                    metadata: {
                        // <--- dette er custom metadata
                        createdBy: payload.preferred_username || 'unknown',
                        createdAt: new Date().toISOString(),
                    },
                },
            })

            return NextResponse.json({ success: true })
        } catch (error) {
            return NextResponse.json({ error: 'Failed to save beregningsregler' }, { status: 500 })
        }
    })
}
