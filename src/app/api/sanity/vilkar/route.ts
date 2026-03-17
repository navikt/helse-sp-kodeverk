import { NextResponse } from 'next/server'

import { videresendTilSanity } from '@/app/api/sanity/videresendTilSanity'

export const GET = async () => {
    const response = await videresendTilSanity<VilkarQueryResult>(`*[_type == "vilkar"]{
        ...,
        kode->
    }`)
    return NextResponse.json(response)
}

export type VilkarQueryResult = {
    result: object[]
}
