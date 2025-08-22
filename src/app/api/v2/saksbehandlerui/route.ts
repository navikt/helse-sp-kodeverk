import { NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'

import { beskyttetApi, ErrorResponse } from '@/auth/beskyttetApi'
import { hovedspørsmålArraySchema } from '@schemas/saksbehandlergrensesnitt'
import { kodeverkStore } from '@/mockapi/storage'

const storage = new Storage()

const bucketName = 'helse-sp-kodeverk'

export async function POST(request: Request): Promise<NextResponse<object | ErrorResponse>> {
    return await beskyttetApi<object>(request, async (payload): Promise<NextResponse<object>> => {
        try {
            const body = await request.json()

            // Validate request body against schema
            const validationResult = hovedspørsmålArraySchema.safeParse(body)
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: 'Invalid saksbehandlerui format', details: validationResult.error.format() },
                    { status: 400 },
                )
            }

            // hvis development oppdater lokalt kodeverk
            if (process.env.NODE_ENV === 'development') {
                kodeverkStore.kodeverkV2 = validationResult.data
                return NextResponse.json({ success: true })
            }

            // Sjekk optimistisk låsing
            const ifMatchHeader = request.headers.get('If-Match')
            if (ifMatchHeader) {
                const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
                const v2Files = files.filter((file) => file.name.startsWith('saksbehandlerui-'))
                const latest = v2Files.sort((a, b) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

                if (latest && latest.name !== ifMatchHeader) {
                    // Hent informasjon om hvem som gjorde siste endringen
                    const lastModifiedBy = latest.metadata?.metadata?.createdBy || 'ukjent bruker'
                    const lastModifiedAt = latest.metadata?.metadata?.createdAt || 'ukjent tidspunkt'

                    const conflictProblem = {
                        type: 'https://helse-sp-kodeverk.no/problems/concurrent-modification',
                        title: 'Konkurrerende endring oppdaget',
                        status: 409,
                        detail: `Saksbehandlergrensesnittet ble endret av ${lastModifiedBy} den ${new Date(String(lastModifiedAt)).toLocaleString('nb-NO')}. Vennligst hent den nyeste versjonen og prøv igjen.`,
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
            const fileName = `saksbehandlerui-${Date.now()}.json`
            const bucket = storage.bucket(bucketName)
            const file = bucket.file(fileName)

            await file.save(JSON.stringify(validationResult.data), {
                contentType: 'application/json',
                metadata: {
                    metadata: {
                        // <--- dette er custom metadata
                        createdBy: payload.preferred_username || 'unknown',
                        createdAt: new Date().toISOString(),
                    },
                },
            })
            // Here you would typically save the saksbehandlerui to a database
            // For now, we'll just return success
            return NextResponse.json({ success: true })
        } catch (error) {
            return NextResponse.json({ error: 'Failed to save saksbehandlerui' }, { status: 500 })
        }
    })
}
