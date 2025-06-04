import { NextResponse } from 'next/server'

import { ErrorResponse } from '@/auth/beskyttetApi'

export async function POST(): Promise<NextResponse<object | ErrorResponse>> {
    try {
        //  const body = await request.json()
        // Here you would typically save the kodeverk to a database
        // For now, we'll just return success
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save kodeverk' }, { status: 500 })
    }
}
