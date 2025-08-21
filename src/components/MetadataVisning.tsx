'use client'

import { Alert } from '@navikt/ds-react'
import dayjs from 'dayjs'

interface MetadataVisningProps {
    sistEndretAv?: string | null
    sistEndretDato?: string
    className?: string
    variant?: 'info' | 'warning'
    size?: 'small' | 'medium'
}

export const MetadataVisning = ({
    sistEndretAv,
    sistEndretDato,
    className = '',
    variant = 'info',
    size = 'small',
}: MetadataVisningProps) => {
    if (!sistEndretAv && !sistEndretDato) {
        return null
    }

    const formatDato = (dato: string) => {
        try {
            return dayjs(dato).format("D. MMMM YYYY 'kl.' HH:mm")
        } catch {
            return dato
        }
    }

    if (size === 'small') {
        return (
            <span className={`text-gray-600 flex items-center gap-2 text-xs ${className}`}>
                <span>📝</span>
                <span>
                    Sist endret av <strong>{sistEndretAv || 'Ukjent'}</strong>
                </span>
                {sistEndretDato && (
                    <>
                        <span>•</span>
                        <span>{formatDato(sistEndretDato)}</span>
                    </>
                )}
            </span>
        )
    }

    return (
        <Alert variant={variant} className={className}>
            <div className="flex items-center gap-2 text-sm">
                <span>📝</span>
                <span>
                    Sist endret av <strong>{sistEndretAv || 'Ukjent'}</strong>
                </span>
                {sistEndretDato && (
                    <>
                        <span>•</span>
                        <span>{formatDato(sistEndretDato)}</span>
                    </>
                )}
            </div>
        </Alert>
    )
}
