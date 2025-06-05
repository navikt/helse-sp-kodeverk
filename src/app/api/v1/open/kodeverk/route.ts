import { NextResponse } from 'next/server'
import { Storage, File } from '@google-cloud/storage'

import { ErrorResponse } from '@/auth/beskyttetApi'
import { Kodeverk, kodeverk } from '@/kodeverk/kodeverk'

const storage = new Storage()

const bucketName = 'helse-sp-kodeverk'

export async function GET(): Promise<NextResponse<Kodeverk | ErrorResponse>> {
    const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
    const latest = files.sort((a: File, b: File) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

    if (!latest) {
        return NextResponse.json(kodeverk)
    }

    // return content from latest file
    const [contents] = await latest.download()
    const parsed = JSON.parse(contents.toString())

    return NextResponse.json(parsed)
}
