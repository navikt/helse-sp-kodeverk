'use client'

import { Control } from 'react-hook-form'
import { TextField } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'

import { KodeverkForm } from '@schemas/kodeverkV2'

interface VilkårshjemmelFormProps {
    control: Control<KodeverkForm>
    index: number
    alternativPath?: string
}

type VilkårshjemmelField = 'lovverk' | 'lovverksversjon' | 'paragraf' | 'ledd' | 'setning' | 'bokstav'

export const VilkårshjemmelForm = ({ control, index, alternativPath }: VilkårshjemmelFormProps) => {
    const getFieldName = (field: VilkårshjemmelField) => {
        if (alternativPath) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return `${alternativPath}.vilkårshjemmel.${field}` as any
        }
        return `vilkar.${index}.vilkårshjemmel.${field}` as const
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
                        render={({ field: fieldProps }) => (
                            <TextField
                                {...fieldProps}
                                size="small"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={fieldProps.value || ''}
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
                        render={({ field: fieldProps }) => (
                            <TextField
                                {...fieldProps}
                                size="small"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={fieldProps.value || ''}
                            />
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
