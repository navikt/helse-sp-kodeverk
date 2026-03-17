import { NextResponse } from 'next/server'

import { videresendTilSanity } from '@/app/api/sanity/videresendTilSanity'

export const GET = async () => {
    const response = await videresendTilSanity<AvgjorelseQueryResult>(`*[_type == "avgjorelse"]{
        ...,
        kode->
    }`)
    return NextResponse.json(response)
}

export type AvgjorelseQueryResult = {
    result: object[]
}
