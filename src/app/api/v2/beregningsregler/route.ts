import { NextResponse } from 'next/server'
import { File, Storage } from '@google-cloud/storage'

import { lokalUtviklingBeregningsregler } from '@/kodeverk/mockdata/beregningsregler'
import { Beregningsregelverk } from '@schemas/beregningsregler'
import { kodeverkStore } from '@/mockapi/storage'

const storage = new Storage()
const bucketName = 'helse-sp-kodeverk'

export async function GET(): Promise<NextResponse<Beregningsregelverk>> {
    if (process.env.NODE_ENV === 'development') {
        const response = NextResponse.json(kodeverkStore.beregningsregler)
        response.headers.set('ETag', 'development-local')
        return response
    }

    const [files] = await storage.bucket(bucketName).getFiles({ autoPaginate: false })
    const v1Files = files.filter((file: File) => file.name.startsWith('v1-'))
    const latest = v1Files.sort((a: File, b: File) => b.metadata.updated!.localeCompare(a.metadata.updated!))[0]

    if (!latest) {
        const response = NextResponse.json(lokalUtviklingBeregningsregler)
        response.headers.set('ETag', 'no-files')
        return response
    }

    const [contents] = await latest.download()
    const parsed = JSON.parse(contents.toString())

    const response = NextResponse.json(parsed)
    response.headers.set('ETag', latest.name)
    return response
}
