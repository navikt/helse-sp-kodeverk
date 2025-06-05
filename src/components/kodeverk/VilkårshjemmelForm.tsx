'use client'

import { Control, FieldErrors } from 'react-hook-form'
import { TextField } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'

import { KodeverkForm } from '@/kodeverk/kodeverk'

interface VilkårshjemmelFormProps {
    control: Control<KodeverkForm>
    index: number
    errors: FieldErrors<KodeverkForm>
}

export const VilkårshjemmelForm = ({ control, index, errors }: VilkårshjemmelFormProps) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vilkårshjemmel</h3>
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.lovverk` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Lovverk"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.lovverk?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.lovverksversjon` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Lovverksversjon"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.lovverksversjon?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.paragraf` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Paragraf"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.paragraf?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.ledd` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Ledd"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.ledd?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.setning` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Setning"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.setning?.message}
                            value={field.value || ''}
                        />
                    )}
                />
                <Controller
                    name={`vilkar.${index}.vilkårshjemmel.bokstav` as const}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Bokstav"
                            error={errors?.vilkar?.[index]?.vilkårshjemmel?.bokstav?.message}
                            value={field.value || ''}
                        />
                    )}
                />
            </div>
        </div>
    )
}
