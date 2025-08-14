import { NextResponse } from 'next/server'
import { File, Storage } from '@google-cloud/storage'

import { ErrorResponse } from '@/auth/beskyttetApi'
import { saksbehandlerUi } from '@/kodeverk/lokalSaksbehandlerui'
import { kodeverkStore } from '@/mockapi/storage'
import { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

const storage = new Storage()
const bucketName = 'helse-sp-kodeverk'

export async function GET(): Promise<NextResponse<HovedspørsmålArray | ErrorResponse>> {
    // hvis development returner lokalt kodeverk
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(kodeverkStore.kodeverkV2)
    }

    const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
    // Filter to only include files that start with "v2-"
    const v2Files = files.filter((file: File) => file.name.startsWith('saksbehandlerui-'))
    const latest = v2Files.sort((a: File, b: File) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

    if (!latest) {
        return NextResponse.json(saksbehandlerUi)
    }

    // return content from latest file
    const [contents] = await latest.download()
    const parsed = JSON.parse(contents.toString())

    return NextResponse.json(parsed)
}
