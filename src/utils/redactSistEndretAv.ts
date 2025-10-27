import type { HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'
import type { Kodeverk } from '@/schemas/kodeverk'
import type { Beregningsregelverk } from '@/schemas/beregningsregler'

/**
 * Redigerer alle 'sistEndretAv' felter i saksbehandlergrensesnitt-data til 'Redacted Redactesen'
 */
export function redactSaksbehandlergrensesnittSistEndretAv(data: HovedspørsmålArray): HovedspørsmålArray {
    return data.map((item) => ({
        ...item,
        sistEndretAv: 'Redacted Redactesen',
    }))
}

/**
 * Redigerer alle 'sistEndretAv' felter i kodeverk-data til 'Redacted Redactesen'
 */
export function redactKodeverkSistEndretAv(data: Kodeverk): Kodeverk {
    return data.map((item) => ({
        ...item,
        sistEndretAv: 'Redacted Redactesen',
    }))
}

/**
 * Redigerer alle 'sistEndretAv' felter i beregningsregler-data til 'Redacted Redactesen'
 */
export function redactBeregningsreglerSistEndretAv(data: Beregningsregelverk): Beregningsregelverk {
    return data.map((item) => ({
        ...item,
        sistEndretAv: 'Redacted Redactesen',
    }))
}

/**
 * Kopierer data til clipboard som JSON
 * Data bør allerede være redigert før denne funksjonen kalles
 */
export async function copyKodeverkToClipboard(
    data: Kodeverk | HovedspørsmålArray | Beregningsregelverk,
): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2)

    await navigator.clipboard.writeText(jsonString)
}
