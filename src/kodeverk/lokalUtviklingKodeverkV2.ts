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
            lovverksversjon: '2019-01-01',
            paragraf: '8-2',
            ledd: '',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPTJT',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'OPPTJENING_TYPE',
                navn: 'Hvilken type opptjening gjelder?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'HOVEDREGEL',
                        navn: 'Har arbeidet i 28 dager før arbeidsuførhet inntreffer',
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
                        kode: 'ANNEN_YTELSE',
                        navn: 'Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-2',
                            ledd: '2',
                            setning: null,
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'COVID',
                        navn: 'Covid-relatert opptjening',
                        vilkårshjemmel: {
                            lovverk: 'Midlertidig lov',
                            lovverksversjon: '2020-03-01',
                            paragraf: '1',
                            ledd: null,
                            setning: null,
                            bokstav: null,
                        },
                        underspørsmål: [
                            {
                                kode: 'COVID_PERIODE',
                                navn: 'Hvilken periode gjelder covid-opptjeningen?',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'MARS_2020',
                                        navn: 'Mars 2020',
                                        vilkårshjemmel: {
                                            lovverk: 'Midlertidig lov',
                                            lovverksversjon: '2020-03-01',
                                            paragraf: '1',
                                            ledd: '1',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'ETTER_MARS_2020',
                                        navn: 'Etter mars 2020',
                                        vilkårshjemmel: {
                                            lovverk: 'Midlertidig lov',
                                            lovverksversjon: '2020-03-01',
                                            paragraf: '1',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: null,
                                        },
                                        underspørsmål: [
                                            {
                                                kode: 'SPESIFISERT_PERIODE',
                                                navn: 'Spesifiser periode',
                                                variant: 'SELECT',
                                                alternativer: [
                                                    {
                                                        kode: 'APRIL_2020',
                                                        navn: 'April 2020',
                                                    },
                                                    {
                                                        kode: 'MAI_2020',
                                                        navn: 'Mai 2020',
                                                    },
                                                    {
                                                        kode: 'JUNI_2020',
                                                        navn: 'Juni 2020',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                kode: 'MANGLENDE_OPPTJENING',
                navn: 'Årsak til manglende opptjening',
                variant: 'SELECT',
                alternativer: [
                    {
                        kode: 'IKKE_ARBEIDET',
                        navn: 'Har ikke arbeidet i 28 dager før arbeidsuførhet inntreffer',
                    },
                    {
                        kode: 'AAP_FOR_FORELDREPENGER',
                        navn: 'Har AAP før foreldrepenger og retten var brukt opp uten ny opptjening',
                    },
                ],
            },
            {
                kode: 'UNNTAK_OPPTJENING',
                navn: 'Unntak fra opptjeningskrav',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'ANSATT_NORSK_SKIP_OPTJ_UINNT',
                        navn: 'Ansatt på et norsk skip i utenriksfart',
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
                        navn: 'Fisker som er tatt opp på blad B i fiskermanntallet',
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
                        navn: 'Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten',
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
                        navn: 'Arbeidsufør på grunn av en godkjent yrkesskade',
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
        ],
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
        underspørsmål: [
            {
                kode: 'SOKNAD_TIDSPUNKT',
                navn: 'Når ble søknaden fremsatt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'INNEN_TRE_MANEDER',
                        navn: 'Søknad fremsatt i tide (innen 3 måneder)',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '22-13',
                            ledd: '3',
                            setning: null,
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'IKKE_INNEN_TRE_MANEDER',
                        navn: 'Søknad ikke fremsatt i tide (over 3 måneder)',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '22-13',
                            ledd: '3',
                            setning: null,
                            bokstav: null,
                        },
                    },
                ],
            },
        ],
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
        underspørsmål: [
            {
                kode: 'MEDLEMSKAP_STATUS',
                navn: 'Medlemskapsstatus i folketrygden',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'MEDLEM_FOLKETRYGDEN',
                        navn: 'Er medlem i folketrygden',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '2-1',
                            ledd: null,
                            setning: null,
                            bokstav: null,
                        },
                        underspørsmål: [
                            {
                                kode: 'BOSATT_TYPE',
                                navn: 'Type bosetting',
                                variant: 'SELECT',
                                alternativer: [
                                    {
                                        kode: 'FAST_BOSATT',
                                        navn: 'Fast bosatt i Norge',
                                    },
                                    {
                                        kode: 'MIDLERTIDIG_BOSATT',
                                        navn: 'Midlertidig bosatt i Norge',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_MEDLEM_FOLKETRYGDEN',
                        navn: 'Er ikke medlem i folketrygden',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '2-1',
                            ledd: null,
                            setning: null,
                            bokstav: null,
                        },
                    },
                ],
            },
        ],
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
        vilkårskode: 'ARBEIDSUFØR',
        beskrivelse: 'Arbeidsufør som følge av sykdom, skade eller lyte',
        kategori: 'arbeidstakere',
        underspørsmål: [
            {
                kode: 'ARBEIDSUFØR_TYPE',
                navn: 'Type arbeidsufør',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'SYKDOM',
                        navn: 'Arbeidsufør som følge av sykdom',
                        underspørsmål: [
                            {
                                kode: 'SYKDOM_DOKUMENTASJON',
                                navn: 'Dokumentasjon av sykdom',
                                variant: 'CHECKBOX',
                                alternativer: [
                                    {
                                        kode: 'SYKEMELDING',
                                        navn: 'Sykemelding fra lege',
                                    },
                                    {
                                        kode: 'LEGEERKLÆRING',
                                        navn: 'Legeerklæring',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'SKADE',
                        navn: 'Arbeidsufør som følge av skade',
                    },
                    {
                        kode: 'LYTE',
                        navn: 'Arbeidsufør som følge av lyte',
                    },
                ],
            },
        ],
    },
]
