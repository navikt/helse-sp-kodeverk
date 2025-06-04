import { NextResponse } from 'next/server'

import { ErrorResponse } from '@/auth/beskyttetApi'
import { Kodeverk, kodeverk } from '@components/kodeverk'

export async function GET(): Promise<NextResponse<Kodeverk | ErrorResponse>> {
    return NextResponse.json(kodeverk)
}
