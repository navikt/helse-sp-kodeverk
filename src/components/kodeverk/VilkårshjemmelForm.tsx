'use client'

import { TextField } from '@navikt/ds-react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'

interface VilkårshjemmelFormProps<T extends FieldValues = Record<string, unknown>> {
    control: Control<T>
    index?: number
    errors: FieldErrors<T>
    resultIndex?: number
    resultType?: 'oppfylt' | 'ikkeOppfylt'
    basePath?: string
}

interface VilkårshjemmelError {
    message?: string
}

interface ResultError {
    vilkårshjemmel?: Record<string, VilkårshjemmelError>
}

interface VilkarIndexError {
    vilkårshjemmel?: Record<string, VilkårshjemmelError>
    oppfylt?: ResultError[]
    ikkeOppfylt?: ResultError[]
}

interface FormErrors {
    vilkar?: VilkarIndexError[]
    [key: string]: unknown
}

type VilkårshjemmelField = 'lovverk' | 'lovverksversjon' | 'kapittel' | 'paragraf' | 'ledd' | 'setning' | 'bokstav'

export const VilkårshjemmelForm = <T extends FieldValues = Record<string, unknown>>({
    control,
    index,
    errors,
    resultIndex,
    resultType,
    basePath,
}: VilkårshjemmelFormProps<T>) => {
    const getFieldName = (field: VilkårshjemmelField) => {
        if (basePath) {
            return `${basePath}.${field}` as const
        }
        if (resultIndex !== undefined && resultType) {
            return `vilkar.${index}.${resultType}.${resultIndex}.vilkårshjemmel.${field}` as const
        }
        return `vilkar.${index}.vilkårshjemmel.${field}` as const
    }

    const getError = (field: VilkårshjemmelField) => {
        if (basePath) {
            // For beregningsregler, naviger til feilen basert på basePath
            const pathParts = basePath.split('.')
            let currentError: Record<string, unknown> | undefined = errors as Record<string, unknown>
            for (const part of pathParts) {
                currentError = currentError?.[part] as Record<string, unknown> | undefined
            }
            return (currentError?.[field] as VilkårshjemmelError)?.message
        }
        if (resultIndex !== undefined && resultType && index !== undefined) {
            // Dette er kun for kodeverk, ikke beregningsregler
            const formErrors = errors as FormErrors
            const resultErrors = formErrors?.vilkar?.[index]?.[resultType]?.[resultIndex]?.vilkårshjemmel
            return resultErrors?.[field]?.message
        }
        // Dette er kun for kodeverk, ikke beregningsregler
        if (index !== undefined) {
            const formErrors = errors as FormErrors
            return formErrors?.vilkar?.[index]?.vilkårshjemmel?.[field]?.message
        }
        return undefined
    }

    const fields: VilkårshjemmelField[] = [
        'lovverk',
        'lovverksversjon',
        'kapittel',
        'paragraf',
        'ledd',
        'setning',
        'bokstav',
    ]

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {fields.slice(0, 2).map((field) => (
                    <Controller
                        key={field}
                        name={getFieldName(field) as never}
                        control={control}
                        render={({ field: { value, ...fieldProps } }) => (
                            <TextField
                                {...fieldProps}
                                size="small"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                error={getError(field)}
                                value={value || ''}
                            />
                        )}
                    />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                {fields.slice(2).map((field) => (
                    <Controller
                        key={field}
                        name={getFieldName(field) as never}
                        control={control}
                        render={({ field: { value, ...fieldProps } }) => (
                            <TextField
                                {...fieldProps}
                                size="small"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                error={getError(field)}
                                value={value || ''}
                            />
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
