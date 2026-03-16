'use client'

import { Heading } from '@navikt/ds-react'

import DuplikateKoderOversikt from '@/components/DuplikateKoderOversikt'
import UbrukteKoderOversikt from '@/components/UbrukteKoderOversikt'
import UkjenteKoderOversikt from '@/components/UkjenteKoderOversikt'

const Page = () => {
    return (
        <div className="space-y-6 p-6">
            <Heading size="xlarge">Spillerom kodeverk admin</Heading>
            <UkjenteKoderOversikt />
            <UbrukteKoderOversikt />
            <DuplikateKoderOversikt />
        </div>
    )
}

export default Page
