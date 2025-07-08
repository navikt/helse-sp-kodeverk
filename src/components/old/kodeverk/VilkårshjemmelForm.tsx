'use client'

import { Control, FieldErrors } from 'react-hook-form'
import { TextField } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'

import { KodeverkForm } from '@schemas/kodeverk'

interface VilkårshjemmelFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    resultIndex?: number
    resultType?: 'OPPFYLT' | 'IKKE_OPPFYLT' | 'IKKE_RELEVANT'
}

type VilkårshjemmelField = 'lovverk' | 'lovverksversjon' | 'paragraf' | 'ledd' | 'setning' | 'bokstav'

export const VilkårshjemmelForm = ({ control, index, errors, resultIndex, resultType }: VilkårshjemmelFormProps) => {
    const getFieldName = (field: VilkårshjemmelField) => {
        if (resultIndex !== undefined && resultType) {
            return `vilkar.${index}.mulige_resultater.${resultType}.${resultIndex}.vilkårshjemmel.${field}` as const
        }
        return `vilkar.${index}.vilkårshjemmel.${field}` as const
    }

    const getError = (field: VilkårshjemmelField) => {
        if (resultIndex !== undefined && resultType) {
            const resultErrors = errors?.vilkar?.[index]?.mulige_resultater?.[resultType]?.[resultIndex]?.vilkårshjemmel
            return resultErrors?.[field]?.message
        }
        return errors?.vilkar?.[index]?.vilkårshjemmel?.[field]?.message
    }

    const fields: VilkårshjemmelField[] = ['lovverk', 'lovverksversjon', 'paragraf', 'ledd', 'setning', 'bokstav']

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {fields.slice(0, 2).map((field) => (
                    <Controller
                        key={field}
                        name={getFieldName(field)}
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
                        name={getFieldName(field)}
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
