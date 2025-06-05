import * as XLSX from 'xlsx'
import { Button } from '@navikt/ds-react'
import { DownloadIcon } from '@navikt/aksel-icons'

import { KodeverkForm, Vilkår } from '@/kodeverk/kodeverk'

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
        const resultater = []
        type ResultatType = 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT'

        for (const type of ['OPPFYLT', 'IKKE_OPPFYLT', 'IKKE_RELEVANT'] as ResultatType[]) {
            if (!vilkår.mulige_resultater[type]) continue
            for (const årsak of vilkår.mulige_resultater[type]) {
                resultater.push({
                    resultatType: type,
                    årsakKode: årsak.kode,
                    årsakBeskrivelse: årsak.beskrivelse,
                    årsakLovverk: årsak.vilkårshjemmel?.lovverk || '',
                    årsakLovverkversjon: årsak.vilkårshjemmel?.lovverksversjon || '',
                    årsakParagraf: årsak.vilkårshjemmel?.paragraf || '',
                    årsakLedd: årsak.vilkårshjemmel?.ledd || '',
                    årsakSetning: årsak.vilkårshjemmel?.setning || '',
                    årsakBokstav: årsak.vilkårshjemmel?.bokstav || '',
                })
            }
        }

        resultater.forEach((res, index) => {
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
                resultatType: res.resultatType,
                årsakKode: res.årsakKode,
                årsakBeskrivelse: res.årsakBeskrivelse,
                årsakLovverk: res.årsakLovverk,
                årsakParagraf: res.årsakParagraf,
            })
        })
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
