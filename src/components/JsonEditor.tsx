'use client'

import { useState, useEffect } from 'react'
import { Textarea, ErrorSummary, Button } from '@navikt/ds-react'

interface JsonEditorProps {
    initialData: unknown[]
    onSave: (data: unknown[]) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

export const JsonEditor = ({ initialData, onSave, onCancel, isLoading = false }: JsonEditorProps) => {
    const [jsonText, setJsonText] = useState('')
    const [jsonError, setJsonError] = useState<string | null>(null)

    useEffect(() => {
        setJsonText(JSON.stringify(initialData, null, 2))
    }, [initialData])

    const handleJsonChange = (value: string) => {
        setJsonText(value)
        setJsonError(null)

        // Valider JSON i sanntid
        try {
            JSON.parse(value)
        } catch (error) {
            setJsonError('Ugyldig JSON-format')
        }
    }

    const handleSave = async () => {
        try {
            const parsedData = JSON.parse(jsonText)
            await onSave(parsedData)
        } catch (error) {
            setJsonError('Ugyldig JSON-format')
        }
    }

    return (
        <div className="space-y-4">
            {jsonError && (
                <ErrorSummary heading="JSON-feil:">
                    <ErrorSummary.Item>{jsonError}</ErrorSummary.Item>
                </ErrorSummary>
            )}
            <div>
                <div className="flex gap-4">
                    <Button type="button" onClick={handleSave} disabled={isLoading || !!jsonError}>
                        {isLoading ? 'Lagrer...' : 'Lagre'}
                    </Button>
                    <Button type="button" onClick={onCancel}>
                        Avbryt
                    </Button>
                </div>
                <Textarea
                    id="json-editor"
                    label="JSON-redigering"
                    value={jsonText}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                    placeholder="Rediger JSON her..."
                />
            </div>
        </div>
    )
}
