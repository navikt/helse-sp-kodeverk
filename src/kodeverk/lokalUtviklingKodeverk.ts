import { type Kodeverk } from '@/schemas/kodeverk'

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

export const lokalUtviklingKodeverk: Kodeverk = [
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-2',
            ledd: '',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPTJT',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'HOVEDREGEL',
                    beskrivelse: 'Har arbeidet i 28 dager før arbeidsuførhet inntreffer',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'ANNEN_YTELSE',
                    beskrivelse:
                        'Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'COVID',
                    beskrivelse: 'Covid',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_ARBEIDET',
                    beskrivelse: 'Har ikke arbeidet i 28 dager før arbeidsuførhet inntreffer',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'AAP_FOR_FORELDREPENGER',
                    beskrivelse: 'Har AAP før foreldrepenger og retten var brukt opp uten ny opptjening',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
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
                        paragraf: '8-49',
                        ledd: '4',
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
        beskrivelse: 'En ytelse gis for opptil tre måneder før den måneden da kravet ble satt fram',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'INNEN_TRE_MANEDER',
                    beskrivelse: 'Søknad fremsatt i tide',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_INNEN_TRE_MANEDER',
                    beskrivelse: 'Søknad ikke fremsatt i tide',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
        },
    },
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
        beskrivelse: 'Personer som er bosatt i Norge, er pliktige medlemmer i folketrygden',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'MEDLEM_FOLKETRYGDEN',
                    beskrivelse: 'Er medlem i folketrygden',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_MEDLEM_FOLKETRYGDEN',
                    beskrivelse: 'Er ikke medlem i folketrygden',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
        },
    },
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
        beskrivelse: 'Arbeidsufør',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'ER_ARBEIDSUFORE',
                    beskrivelse: 'arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'AAA',
                    beskrivelse: 'innlagt i en godkjent helseinstitusjon,',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'BBB',
                    beskrivelse:
                        'under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'CCC',
                    beskrivelse: 'deltar på et arbeidsrettet tiltak',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'DDD',
                    beskrivelse:
                        'på grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd,',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
                {
                    kode: 'KOSM',
                    beskrivelse: 'Kosmetisk inngrep som er medisinks begrunnet',
                    vilkårshjemmel: {
                        lovverk: 'TODO',
                        lovverksversjon: 'TODO',
                        paragraf: 'TODO',
                    },
                },
            ],
            IKKE_OPPFYLT: [],
        },
    },
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
        beskrivelse: 'Har opparbeidet minste inntekt (1/2G) - inntektsgrunnlaget',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [],
            IKKE_OPPFYLT: [],
        },
    },
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-3',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'ARBEIDSUFOR',
        beskrivelse: 'Har tapt pensjonsgivende inntekt på grunn av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        mulige_resultater: {
            OPPFYLT: [],
            IKKE_OPPFYLT: [],
        },
    },
]
