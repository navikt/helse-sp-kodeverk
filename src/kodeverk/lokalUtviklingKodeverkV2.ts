import { type Kodeverk } from '@/schemas/kodeverkV2'

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

export const lokalUtviklingKodeverkV2: Kodeverk = [
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1970',
            paragraf: '8-3',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'SDFSDF',
        beskrivelse: 'tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'INNTEKTSTAP',
                navn: 'Inntektstap pga arbeidsuførhet',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'INNTEKTSTAP_JA', navn: 'Ja', oppfylt: 'OPPFYLT', vilkårshjemmel: null, underspørsmål: [] },
                    {
                        kode: 'INNTEKTSTAP_NEI',
                        navn: 'Nei',
                        oppfylt: 'IKKE_OPPFYLT',
                        vilkårshjemmel: null,
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
                        oppfylt: 'IKKE_OPPFYLT',
                        vilkårshjemmel: null,
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
]
