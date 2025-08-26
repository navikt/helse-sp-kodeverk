'use client'

import { Button } from '@navikt/ds-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons'

import { Vilkår } from '@/schemas/kodeverk'

interface SidemenyProps {
    vilkår: (Vilkår & { id: string })[]
    onVilkårClick: (vilkårId: string) => Promise<boolean>
    activeVilkårId?: string
    isCollapsed: boolean
    onToggleCollapse: () => void
}

const formatParagraf = (hjemmel: Vilkår['vilkårshjemmel']) => {
    const { lovverk, kapittel, paragraf, ledd, setning, bokstav } = hjemmel
    if (!lovverk || !kapittel || !paragraf) return ''

    let result = `${lovverk} §${kapittel}-${paragraf}`
    if (ledd) result += ` ${ledd}. ledd`
    if (setning) result += ` ${setning}. setning`
    if (bokstav) result += ` bokstav ${bokstav}`
    return result
}

export const Sidemeny = ({ vilkår, onVilkårClick, activeVilkårId, isCollapsed, onToggleCollapse }: SidemenyProps) => {
    return (
        <div
            className={`bg-gray-50 border-gray-200 sticky top-0 h-screen overflow-y-auto border-r transition-all duration-300 ${
                isCollapsed ? 'w-12' : 'w-80'
            }`}
        >
            <div className="border-gray-200 flex items-center justify-between border-b p-4">
                {!isCollapsed && <h2 className="text-gray-900 text-lg font-semibold">Hovedvilkår</h2>}
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
                    {vilkår.map((vilkår) => {
                        const isActive = activeVilkårId === vilkår.id
                        const paragraf = formatParagraf(vilkår.vilkårshjemmel)

                        return (
                            <Button
                                key={vilkår.id}
                                variant={isActive ? 'primary' : 'tertiary'}
                                size="small"
                                className={`h-auto w-full justify-start px-3 py-3 text-left ${
                                    isActive ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-900'
                                }`}
                                onClick={async () => {
                                    await onVilkårClick(vilkår.id)
                                }}
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-sm leading-tight font-medium">
                                        {vilkår.beskrivelse || 'Nytt vilkår'}
                                    </span>
                                    {paragraf && (
                                        <span
                                            className={`mt-1 text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}
                                        >
                                            {paragraf}
                                        </span>
                                    )}
                                </div>
                            </Button>
                        )
                    })}
                </nav>
            )}
        </div>
    )
}
