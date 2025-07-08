import { NextResponse } from 'next/server'
import { File, Storage } from '@google-cloud/storage'

import { ErrorResponse } from '@/auth/beskyttetApi'
import { lokalUtviklingKodeverk } from '@/kodeverk/lokalUtviklingKodeverk'
import { kodeverkStore } from '@/mockapi/storage'
import { Kodeverk } from '@schemas/kodeverk'

const storage = new Storage()
const bucketName = 'helse-sp-kodeverk'

export async function GET(): Promise<NextResponse<Kodeverk | ErrorResponse>> {
    // hvis development returner lokalt kodeverk
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(kodeverkStore.kodeverk)
    }

    const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
    // Filter to only include files that start with "v2-"
    const v2Files = files.filter((file: File) => file.name.startsWith('v2-'))
    const latest = v2Files.sort((a: File, b: File) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

    if (!latest) {
        return NextResponse.json(lokalUtviklingKodeverk)
    }

    // return content from latest file
    const [contents] = await latest.download()
    const parsed = JSON.parse(contents.toString())

    return NextResponse.json(parsed)
}
