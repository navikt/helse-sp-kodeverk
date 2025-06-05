import { NextResponse } from 'next/server'

import { beskyttetApi, ErrorResponse } from '@/auth/beskyttetApi'
import { Bruker } from '@/schemas/bruker'

export async function GET(request: Request): Promise<NextResponse<Bruker | ErrorResponse>> {
    return await beskyttetApi<Bruker>(request, (payload): Promise<NextResponse<Bruker>> => {
        return Promise.resolve(
            NextResponse.json({
                navn: payload.name!,
                navIdent: payload.NAVident!,
                preferredUsername: payload.preferred_username!,
            }),
        )
    })
}
