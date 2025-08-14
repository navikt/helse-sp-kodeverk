import { NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'

import { beskyttetApi, ErrorResponse } from '@/auth/beskyttetApi'
import { kodeverkSchema } from '@schemas/kodeverk'
import { kodeverkStore } from '@/mockapi/storage'

const storage = new Storage()

const bucketName = 'helse-sp-kodeverk'

export async function POST(request: Request): Promise<NextResponse<object | ErrorResponse>> {
    return await beskyttetApi<object>(request, async (payload): Promise<NextResponse<object>> => {
        try {
            const body = await request.json()

            // Validate request body against schema
            const validationResult = kodeverkSchema.safeParse(body)
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: 'Invalid kodeverk format', details: validationResult.error.format() },
                    { status: 400 },
                )
            }

            // hvis development oppdater lokalt kodeverk
            if (process.env.NODE_ENV === 'development') {
                kodeverkStore.kodeverk = validationResult.data
                return NextResponse.json({ success: true })
            }

            // filename is current timestamp
            const fileName = `v3-kodeverk-${Date.now()}.json`
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
            // Here you would typically save the kodeverk to a database
            // For now, we'll just return success
            return NextResponse.json({ success: true })
        } catch (error) {
            return NextResponse.json({ error: 'Failed to save kodeverk' }, { status: 500 })
        }
    })
}
