import { Button } from '@navikt/ds-react'
import { DownloadIcon } from '@navikt/aksel-icons'

import { KodeverkForm, Vilkår } from '@/schemas/kodeverk'

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

export function JsonExport({ kodeverk }: ExcelExportProps) {
    return (
        <div className="flex gap-4">
            <Button variant="secondary" onClick={() => lastNedJson(kodeverk)} icon={<DownloadIcon />}>
                Last ned JSON
            </Button>
        </div>
    )
}
