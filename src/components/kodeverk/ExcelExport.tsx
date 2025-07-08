import * as XLSX from 'xlsx'
import { Button } from '@navikt/ds-react'
import { DownloadIcon } from '@navikt/aksel-icons'

import { KodeverkForm, Vilkår } from '@/schemas/kodeverkV2'

function beregnKolonnebredder(data: Record<string, string>[]) {
    const colWidths: { wch: number }[] = []

    if (data.length === 0) return []

    const headers = Object.keys(data[0])
    headers.forEach((key, colIndex) => {
        let maxLen = key.length
        for (const row of data) {
            const cell = (row as Record<string, string>)[key]
            const cellLen = cell ? String(cell).length : 0
            if (cellLen > maxLen) {
                maxLen = cellLen
            }
        }
        colWidths[colIndex] = { wch: maxLen + 2 }
    })

    return colWidths
}

function kodeverkTilExcel(kodeverk: KodeverkForm) {
    const rows: Record<string, string>[] = []
    for (const vilkår of kodeverk.vilkar) {
        const hjemmel = vilkår.vilkårshjemmel
        const flattedData = []

        // Flaten out underspørsmål and alternativer
        for (const underspørsmål of vilkår.underspørsmål) {
            if (!underspørsmål.alternativer || underspørsmål.alternativer.length === 0) {
                flattedData.push({
                    underspørsmålKode: underspørsmål.kode,
                    underspørsmålNavn: underspørsmål.navn || '',
                    underspørsmålVariant: underspørsmål.variant,
                    alternativKode: '',
                    alternativNavn: '',
                    alternativLovverk: '',
                    alternativLovverksversjon: '',
                    alternativParagraf: '',
                    alternativLedd: '',
                    alternativSetning: '',
                    alternativBokstav: '',
                })
            } else {
                for (const alternativ of underspørsmål.alternativer) {
                    flattedData.push({
                        underspørsmålKode: underspørsmål.kode,
                        underspørsmålNavn: underspørsmål.navn || '',
                        underspørsmålVariant: underspørsmål.variant,
                        alternativKode: alternativ.kode,
                        alternativNavn: alternativ.navn || '',
                        alternativLovverk: alternativ.vilkårshjemmel?.lovverk || '',
                        alternativLovverksversjon: alternativ.vilkårshjemmel?.lovverksversjon || '',
                        alternativParagraf: alternativ.vilkårshjemmel?.paragraf || '',
                        alternativLedd: alternativ.vilkårshjemmel?.ledd || '',
                        alternativSetning: alternativ.vilkårshjemmel?.setning || '',
                        alternativBokstav: alternativ.vilkårshjemmel?.bokstav || '',
                    })
                }
            }
        }

        if (flattedData.length === 0) {
            // If no underspørsmål, add a row with just vilkår info
            rows.push({
                vilkårskode: vilkår.vilkårskode,
                beskrivelse: vilkår.beskrivelse,
                kategori: vilkår.kategori,
                lovverk: hjemmel.lovverk,
                lovverksversjon: hjemmel.lovverksversjon,
                paragraf: hjemmel.paragraf,
                ledd: hjemmel.ledd || '',
                setning: hjemmel.setning || '',
                bokstav: hjemmel.bokstav || '',
                underspørsmålKode: '',
                underspørsmålNavn: '',
                underspørsmålVariant: '',
                alternativKode: '',
                alternativNavn: '',
                alternativLovverk: '',
                alternativLovverksversjon: '',
                alternativParagraf: '',
                alternativLedd: '',
                alternativSetning: '',
                alternativBokstav: '',
            })
        } else {
            flattedData.forEach((data, index) => {
                rows.push({
                    vilkårskode: index === 0 ? vilkår.vilkårskode : '',
                    beskrivelse: index === 0 ? vilkår.beskrivelse : '',
                    kategori: index === 0 ? vilkår.kategori : '',
                    lovverk: index === 0 ? hjemmel.lovverk : '',
                    lovverksversjon: index === 0 ? hjemmel.lovverksversjon : '',
                    paragraf: index === 0 ? hjemmel.paragraf : '',
                    ledd: index === 0 ? hjemmel.ledd || '' : '',
                    setning: index === 0 ? hjemmel.setning || '' : '',
                    bokstav: index === 0 ? hjemmel.bokstav || '' : '',
                    underspørsmålKode: data.underspørsmålKode,
                    underspørsmålNavn: data.underspørsmålNavn || '',
                    underspørsmålVariant: data.underspørsmålVariant,
                    alternativKode: data.alternativKode,
                    alternativNavn: data.alternativNavn || '',
                    alternativLovverk: data.alternativLovverk,
                    alternativLovverksversjon: data.alternativLovverksversjon,
                    alternativParagraf: data.alternativParagraf,
                    alternativLedd: data.alternativLedd,
                    alternativSetning: data.alternativSetning,
                    alternativBokstav: data.alternativBokstav,
                })
            })
        }
    }

    const worksheet = XLSX.utils.json_to_sheet(rows)
    worksheet['!cols'] = beregnKolonnebredder(rows)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Kodeverk')
    XLSX.writeFile(workbook, 'kodeverk.xlsx')
}

function lastNedJson(kodeverk: KodeverkForm) {
    const cleanedKodeverk = {
        vilkar: kodeverk.vilkar.map((vilkår) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = vilkår as Vilkår & { id: string }
            return rest
        }),
    }
    const jsonString = JSON.stringify(cleanedKodeverk, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kodeverk.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

interface ExcelExportProps {
    kodeverk: KodeverkForm
}

export function ExcelExport({ kodeverk }: ExcelExportProps) {
    return (
        <div className="flex gap-4">
            <Button variant="secondary" onClick={() => kodeverkTilExcel(kodeverk)} icon={<DownloadIcon />}>
                Last ned Excel
            </Button>
            <Button variant="secondary" onClick={() => lastNedJson(kodeverk)} icon={<DownloadIcon />}>
                Last ned JSON
            </Button>
        </div>
    )
}
