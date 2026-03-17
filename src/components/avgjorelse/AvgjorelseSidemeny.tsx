'use client'

import { Button } from '@navikt/ds-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons'

import type { Avgjorelse } from '@/schemas/avgjorelse'

interface AvgjorelseSidemenyProps {
    avgjorelser: (Avgjorelse & { id: string })[]
    onAvgjorelseClick: (id: string) => void
    activeAvgjorelseId?: string
    isCollapsed: boolean
    onToggleCollapse: () => void
}

export const AvgjorelseSidemeny = ({
    avgjorelser,
    onAvgjorelseClick,
    activeAvgjorelseId,
    isCollapsed,
    onToggleCollapse,
}: AvgjorelseSidemenyProps) => {
    return (
        <div
            className={`sticky top-0 h-screen overflow-y-auto border-r border-gray-200 bg-gray-50 transition-all duration-300 ${
                isCollapsed ? 'w-12' : 'w-80'
            }`}
        >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                {!isCollapsed && <h2 className="text-lg font-semibold text-gray-900">Avgjørelser</h2>}
                <Button
                    variant="tertiary"
                    size="small"
                    onClick={onToggleCollapse}
                    className="ml-auto"
                    aria-label={isCollapsed ? 'Vis sidemeny' : 'Skjul sidemeny'}
                >
                    {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Button>
            </div>

            {!isCollapsed && (
                <nav className="space-y-1 p-4">
                    {avgjorelser.map((item) => {
                        const isActive = activeAvgjorelseId === item.id

                        return (
                            <Button
                                key={item.id}
                                variant={isActive ? 'primary' : 'tertiary'}
                                size="small"
                                className={`h-auto w-full justify-start px-3 py-3 text-left ${
                                    isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'
                                }`}
                                onClick={() => onAvgjorelseClick(item.id)}
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium leading-tight">
                                        {item.beskrivelse || 'Avgjørelse uten tittel'}
                                    </span>
                                    <span className={`mt-1 text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {item.kode.kode}
                                    </span>
                                </div>
                            </Button>
                        )
                    })}
                </nav>
            )}
        </div>
    )
}
