import type { Vilkårshjemmel } from '@/schemas/kodeverk'

export function formatVilkårshjemmel(hjemmel?: Vilkårshjemmel | null): string {
    if (!hjemmel) {
        return ''
    }

    const hoveddel =
        hjemmel.lovverk && hjemmel.kapittel && hjemmel.paragraf
            ? `${hjemmel.lovverk} §${hjemmel.kapittel}-${hjemmel.paragraf}`
            : hjemmel.lovverk

    return [
        hoveddel,
        hjemmel.ledd && `${hjemmel.ledd}. ledd`,
        hjemmel.setning && `${hjemmel.setning}. setning`,
        hjemmel.bokstav && `bokstav ${hjemmel.bokstav}`,
    ]
        .filter(Boolean)
        .join(' ')
        .trim()
}
