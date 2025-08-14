import { type HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export const kategoriLabels = {
    generelle_bestemmelser: 'Generelle bestemmelser',
    arbeidstakere: 'Arbeidstakere',
    selvstendig_næringsdrivende: 'Selvstendige næringsdrivende',
    frilansere: 'Frilansere',
    medlemmer_med_kombinerte_inntekter: 'Medlemmer med kombinerte inntekter',
    særskilte_grupper: 'Særskilte grupper',
    medlemmer_med_rett_til_andre_ytelser: 'Medlemmer som har rett til andre ytelser fra folketrygden',
    opphold_i_institusjon: 'Opphold i institusjon',
    yrkesskade: 'Yrkesskade',
} as const

export const lokalUtviklingKodeverkV2: HovedspørsmålArray = [
    {
        kode: 'SDFSDF',
        beskrivelse: 'tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'INNTEKTSTAP',
                navn: 'Inntektstap pga arbeidsuførhet',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'INNTEKTSTAP_JA', navn: 'Ja', underspørsmål: [] },
                    {
                        kode: 'INNTEKTSTAP_NEI',
                        navn: 'Nei',
                        underspørsmål: [],
                    },
                ],
            },
            {
                kode: 'FYLT_70_GRUPPE',
                navn: null,
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'FYLT_70',
                        navn: 'Fylt 70 år',
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
]
