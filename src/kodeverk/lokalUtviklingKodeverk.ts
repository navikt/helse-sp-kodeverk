import { type Kodeverk } from '@/schemas/kodeverk'

export const kategoriLabels = {
    generelle_bestemmelser: 'Generelle bestemmelser',
    arbeidstakere: 'Arbeidstakere',
    selvstendig_næringsdrivende: 'Selvstendige næringsdrivende',
} as const

export const lokalUtviklingKodeverk: Kodeverk = [
    // Ftrl 22-13 3
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '22-13',
            ledd: '3',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'MAA_SOKE_INNEN_TRE_MAANEDER',
        spørsmålstekst: '',
        beskrivelse: 'En ytelse gis for opptil tre måneder før den måneden da kravet ble satt fram',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'INNEN_TRE_MANEDER',
                    beskrivelse: 'Søknad fremsatt i tide',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_INNEN_TRE_MANEDER',
                    beskrivelse: 'Søknad ikke fremsatt i tide',
                },
            ],
        },
    },
    // Ftrl 2-1
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '2-1',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'BOINO',
        spørsmålstekst: '',
        beskrivelse: 'Personer som er bosatt i Norge, er pliktige medlemmer i folketrygden',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'MEDLEM_FOLKETRYGDEN',
                    beskrivelse: 'Er medlem i folketrygden',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_MEDLEM_FOLKETRYGDEN',
                    beskrivelse: 'Er ikke medlem i folketrygden',
                },
            ],
        },
    },
    // Ftrl 8-4
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-4',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'ARBUFOR',
        spørsmålstekst: '',
        beskrivelse: 'Arbeidsufør',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'ER_ARBEIDSUFORE',
                    beskrivelse: 'Er arbeidsufør',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_ARBEIDSUFORE',
                    beskrivelse: 'Er ikke arbeidsufør',
                },
            ],
        },
    },
    // Ftrl 8-2 1
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-2',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPTJT',
        spørsmålstekst: '',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'HOVEDREGEL',
                    beskrivelse: 'Har arbeidet i 28 dager før arbeidsuførhet inntreffer',
                },
                {
                    kode: 'ANNEN_YTELSE',
                    beskrivelse:
                        'Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_ARBEIDET',
                    beskrivelse: 'Har ikke arbeidet i 28 dager før arbeidsuførhet inntreffer',
                },

                {
                    kode: 'AAP_FOR_FORELDREPENGER',
                    beskrivelse: 'Har AAP før foreldrepenger og retten var brukt opp uten ny opptjening',
                },
            ],
            IKKE_RELEVANT: [
                {
                    kode: 'ANSATT_NORSK_SKIP_OPTJ_UINNT',
                    beskrivelse: 'Ansatt på et norsk skip i utenriksfart',
                    vilkårshjemmel: {
                        lovverk: 'Folketrygdloven',
                        lovverksversjon: '2019-01-01',
                        paragraf: '8-2',
                        ledd: '1',
                        setning: null,
                        bokstav: null,
                    },
                },
                {
                    kode: 'FISKER',
                    beskrivelse: 'Fisker som er tatt opp på blad B i fiskermanntallet',
                    vilkårshjemmel: {
                        lovverk: 'Folketrygdloven',
                        lovverksversjon: '2019-01-01',
                        paragraf: '8-2',
                        ledd: '1',
                        setning: null,
                        bokstav: null,
                    },
                },
                {
                    kode: 'MILITAERTJENESTE',
                    beskrivelse: 'Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten',
                    vilkårshjemmel: {
                        lovverk: 'Folketrygdloven',
                        lovverksversjon: '2019-01-01',
                        paragraf: '8-2',
                        ledd: '1',
                        setning: null,
                        bokstav: null,
                    },
                },
                {
                    kode: 'YRKESSKADE',
                    beskrivelse: 'Arbeidsufør på grunn av en godkjent yrkesskade',
                    vilkårshjemmel: {
                        lovverk: 'Folketrygdloven',
                        lovverksversjon: '2019-01-01',
                        paragraf: '8-2',
                        ledd: '1',
                        setning: null,
                        bokstav: null,
                    },
                },
            ],
        },
    },
    // Ftrl 8-3 2
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-3',
            ledd: '2',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'MINSTEINNT',
        spørsmålstekst: '',
        beskrivelse: 'Har opparbeidet minste inntekt (1/2G) - inntektsgrunnlaget',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'HAR_MINSTE_INNTEKT',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_MINSTE_INNTEKT',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
        },
    },
    // Ftrl 8-3
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-3',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'INNTAP',
        spørsmålstekst: '',
        beskrivelse: 'Har tapt pensjonsgivende inntekt på grunn av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'HAR_INNTEKTSTAP',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_INNTEKTSTAP',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
        },
    },
]
