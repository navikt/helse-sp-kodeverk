import { NextResponse } from 'next/server'

import { videresendTilSanity } from '@/app/api/sanity/videresendTilSanity'
import { Avgjorelse } from '@/schemas/avgjorelse'

export type AvgjorelseQueryResult = {
    result: Avgjorelse[]
}

export const GET = async () => {
    const response = await videresendTilSanity<AvgjorelseQueryResult>(`*[_type == "avgjorelse"]{
        ...,
        kode->
    }`)
    return NextResponse.json(response)
}
