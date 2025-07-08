'use client'

import { Control, FieldErrors } from 'react-hook-form'
import { TextField } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'

import { KodeverkForm } from '@schemas/kodeverkV2'

interface VilkårshjemmelFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
    underspørsmålIndex?: number
    alternativIndex?: number
}

type VilkårshjemmelField = 'lovverk' | 'lovverksversjon' | 'paragraf' | 'ledd' | 'setning' | 'bokstav'

export const VilkårshjemmelForm = ({
    control,
    index,
    errors,
    underspørsmålIndex,
    alternativIndex,
}: VilkårshjemmelFormProps) => {
    const getFieldName = (field: VilkårshjemmelField) => {
        if (underspørsmålIndex !== undefined && alternativIndex !== undefined) {
            return `vilkar.${index}.underspørsmål.${underspørsmålIndex}.alternativer.${alternativIndex}.vilkårshjemmel.${field}` as const
        }
        return `vilkar.${index}.vilkårshjemmel.${field}` as const
    }

    const getError = (field: VilkårshjemmelField) => {
        if (underspørsmålIndex !== undefined && alternativIndex !== undefined) {
            const alternativErrors =
                errors?.vilkar?.[index]?.underspørsmål?.[underspørsmålIndex]?.alternativer?.[alternativIndex]
                    ?.vilkårshjemmel
            return alternativErrors?.[field]?.message
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
