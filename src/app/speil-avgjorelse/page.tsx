'use client'

import { useState } from 'react'
import { Heading } from '@navikt/ds-react'

import { AvgjorelseSidemeny } from '@/components/avgjorelse/AvgjorelseSidemeny'
import { AvgjorelseDetail } from '@/components/avgjorelse/AvgjorelseDetail'
import { useAvgjorelse } from '@hooks/queries/useAvgjorelse'
import { Avgjorelse } from '@/schemas/avgjorelse'

type AvgjorelseWithId = Avgjorelse & { id: string }

const Page = () => {
    const { data, isLoading } = useAvgjorelse()
    const [selectedId, setSelectedId] = useState<string>()
    const [isSidemenyCollapsed, setIsSidemenyCollapsed] = useState(false)

    const avgjorelser: AvgjorelseWithId[] = (data?.result ?? []).map((a) => ({
        ...a,
        id: a._id,
    }))

    const activeAvgjorelse = avgjorelser.find((a) => a.id === selectedId) ?? avgjorelser[0]

    if (isLoading) {
        return <div className="p-6">Laster...</div>
    }

    return (
        <div className="flex h-screen">
            <AvgjorelseSidemeny
                avgjorelser={avgjorelser}
                onAvgjorelseClick={setSelectedId}
                activeAvgjorelseId={activeAvgjorelse?.id}
                isCollapsed={isSidemenyCollapsed}
                onToggleCollapse={() => setIsSidemenyCollapsed((current) => !current)}
            />

            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                    <Heading level="1" size="large">
                        Speil avgjørelser
                    </Heading>
                </div>

                {activeAvgjorelse ? (
                    <AvgjorelseDetail avgjorelse={activeAvgjorelse} />
                ) : (
                    <div className="flex h-64 items-center justify-center text-sm text-gray-500">
                        Ingen avgjørelser tilgjengelig.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
