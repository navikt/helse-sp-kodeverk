import { NextResponse } from 'next/server'

import { beskyttetApi, ErrorResponse } from '@/auth/beskyttetApi'
import { Bruker } from '@/schemas/bruker'

export async function GET(request: Request): Promise<NextResponse<Bruker | ErrorResponse>> {
    return await beskyttetApi<Bruker>(request, (payload): NextResponse<Bruker> => {
        return NextResponse.json({
            navn: payload.name!,
            navIdent: payload.NAVident!,
            preferredUsername: payload.preferred_username!,
        })
    })
}
