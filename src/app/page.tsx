'use client'

import { Heading } from '@navikt/ds-react'

import DuplikateKoderOversikt from '@/components/DuplikateKoderOversikt'
import UbrukteKoderOversikt from '@/components/UbrukteKoderOversikt'
import UkjenteKoderOversikt from '@/components/UkjenteKoderOversikt'
import SpilleromBeregningskoderOversikt from '@/components/SpilleromBeregningskoderOversikt'
import BakrommetBeregningskoderOversikt from '@/components/BakrommetBeregningskoderOversikt'

const Page = () => {
    return (
        <div className="space-y-6 p-6">
            <Heading size="xlarge">Spillerom kodeverk admin</Heading>
            <SpilleromBeregningskoderOversikt />
            <BakrommetBeregningskoderOversikt />
            <UkjenteKoderOversikt />
            <UbrukteKoderOversikt />
            <DuplikateKoderOversikt />
        </div>
    )
}

export default Page
