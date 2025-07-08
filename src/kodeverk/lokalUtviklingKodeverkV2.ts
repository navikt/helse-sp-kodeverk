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
            lovverksversjon: '2019-07-01',
            paragraf: '22-13',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'KRAV_RETTIDIG_FRAMSATT',
        beskrivelse: 'Frist for framsetting av krav',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt for hele eller deler av perioden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_MAANEDER_FOR_HELE_PERIODEN',
                                        navn: 'Søkt innen tre måneder for hele perioden',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '3',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_MAANEDER_FOR_DELER_AV_PERIODEN',
                                        navn: 'Søkt innen tre måneder for deler av perioden',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '3',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_FOR_HELE_PERIODEN_PGA_UTE_AV_STAND',
                                        navn: 'Søkt innen tre år for hele perioden, ikke vært i stand til å søke tidligere',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '7',
                                            setning: '1',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_FOR_DELER_AV_PERIODEN_PGA_UTE_AV_STAND',
                                        navn: 'Søkt innen tre år for deler av perioden, ikke vært i stand til å søke tidligere',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '7',
                                            setning: '1',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_FOR_HELE_PERIODEN_PGA_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år for hele perioden, misvisende opplysninger',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '7',
                                            setning: '2',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_FOR_DELER_AV_PERIODEN_PGA_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år for deler av perioden, misvisende opplysninger',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-07-01',
                                            paragraf: '22-13',
                                            ledd: '7',
                                            setning: '2',
                                            bokstav: null,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
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
        vilkårskode: 'KRAV_FREMSATT_INNEN_TRE_MNDER',
        beskrivelse:
            'En ytelse som gis pr. dag eller pr. måned, gis for opptil tre måneder før den måneden da kravet ble satt fram',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'SOEKT_INNEN_TRE_MAANEDER',
                                        navn: 'Ja, oppfylt for hele perioden etter § 22-13 tredje avsnitt',
                                        oppfylt: 'OPPFYLT',
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
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
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
        vilkårskode: 'BOSATT_I_NORGE',
        beskrivelse: 'Personer som er bosatt i Norge, er pliktige medlemmer i folketrygden',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'MINST_12_MND_OPPHOLD',
                                        navn: 'Oppholdet er ment å vare eller har vart minst 12 måneder',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '2-1',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'MIDLERTIDIG_FRAVAER',
                                        navn: 'Midlertidig fravær under 12 måneder',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '2-1',
                                            ledd: '4',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'IKKE_OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'IKKE_LOVLIG_OPPHOLD',
                                        navn: 'Det er et vilkår for medlemskap at vedkommende har lovlig opphold i Norge',
                                        oppfylt: 'IKKE_OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '2-1',
                                            ledd: '3',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'OPPHOLD_I_UTL_6MND_2AAR',
                                        navn: 'Opphold i utlandet mer enn seks måneder pr. år i to eller flere påfølgende år',
                                        oppfylt: 'IKKE_OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '2-1',
                                            ledd: '4',
                                            setning: '2',
                                            bokstav: null,
                                        },
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
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-2',
            ledd: '',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPTJENNING',
        beskrivelse: 'Har vært i arbeid i minst fire uker (opptjeningstid)',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Har den sykemeldte vært i arbeid i minst fire uker umiddelbart før han eller hun ble arbeidsufør?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENNING_HOVEDREGEL',
                                        navn: 'Har arbeidet i 28 dager før arbeidsuførhet inntreffer',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-2',
                                            ledd: '1',
                                            setning: '1',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'OPPTJENNING_ANNEN_YTELSE',
                                        navn: 'Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-2',
                                            ledd: '2',
                                            setning: '1',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'OPPTJENNING_COVID',
                                        navn: 'Selvstendig næringsdrivende og frilansere som har mistet inntekt som følge av utbrudd av covid-19',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-2',
                                            ledd: '3',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'OPPTJENNING_YRKESAKTIV_FOR_FORELDREPENGER',
                                        navn: 'Sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger starter',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-2',
                                            ledd: '',
                                            setning: '3',
                                            bokstav: null,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'IKKE_OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENNING_AAP_FOR_FORELDREPENGER',
                                        navn: 'Har AAP før foreldrepenger og retten var brukt opp uten ny opptjening',
                                        oppfylt: 'IKKE_OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-2',
                                            ledd: '2',
                                            setning: '2',
                                            bokstav: null,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_RELEVANT',
                        navn: 'Ikke relevant',
                        oppfylt: 'N/A',
                        underspørsmål: [
                            {
                                kode: 'IKKE_RELEVANT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENNING_ANSATT_NORSK_SKIP',
                                        navn: 'Ansatt på et norsk skip i utenriksfart',
                                        oppfylt: 'N/A',
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
                                        kode: 'OPPTJENNING_FISKER',
                                        navn: 'Fisker som er tatt opp på blad B i fiskermanntallet',
                                        oppfylt: 'N/A',
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
                                        kode: 'OPPTJENNING_MILITAERTJENESTE',
                                        navn: 'Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten',
                                        oppfylt: 'N/A',
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
                                        kode: 'OPPTJENNING_YRKESSKADE',
                                        navn: 'Arbeidsufør på grunn av en godkjent yrkesskade',
                                        oppfylt: 'N/A',
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
                ],
            },
        ],
    },
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-3',
            ledd: '1',
            setning: '1',
            bokstav: null,
        },
        vilkårskode: 'TAPTINNTEKT',
        beskrivelse: 'Har tapt pensjonsgivende inntekt på grunn av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
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
            ledd: '1',
            setning: '2',
            bokstav: null,
        },
        vilkårskode: 'MAXALDER',
        beskrivelse: 'Den sykmeldte er ikke fylt 70 år',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'MAXALDER_BEGRENSET',
                                        navn: 'Medlem mellom 67 og 70 år har en begrenset sykepengerett, se § 8-51 og § 8-12 fjerde ledd',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-3',
                                            ledd: '1',
                                            setning: '3',
                                            bokstav: null,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
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
            ledd: '2',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'MINSTEINNT',
        beskrivelse: 'Har opparbeidet minste inntekt (1/2G) - inntektsgrunnlaget',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
                    },
                    {
                        kode: 'IKKE_RELEVANT',
                        navn: 'Ikke relevant',
                        oppfylt: 'N/A',
                        underspørsmål: [
                            {
                                kode: 'IKKE_RELEVANT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'MINSTEINNT_ARBEIDSGIVERPERIODE',
                                        navn: 'Inntektsgrensen gjelder ikke for sykepenger i arbeidsgiverperioden, se §§ 8-18 og 8-19',
                                        oppfylt: 'N/A',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-3',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: null,
                                        },
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
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-3',
            ledd: '3',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'AVSLUTTET_AKTIVITET',
        beskrivelse: 'Har trukket seg tilbake fra arbeidslivet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
                    },
                ],
            },
        ],
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
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPFYLT',
                        navn: 'Oppfylt',
                        oppfylt: 'OPPFYLT',
                        underspørsmål: [
                            {
                                kode: 'OPPFYLT_GRUNN',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBUFOR_FUNK',
                                        navn: 'Har en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '1',
                                            setning: '1',
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_INSTITUSJON',
                                        navn: 'Er innlagt i en godkjent helseinstitusjon',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'a',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_BEHANDLING',
                                        navn: 'Er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'b',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_TILTAK',
                                        navn: 'Deltar på et arbeidsrettet tiltak',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'c',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_TILSKOTT',
                                        navn: 'På grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'd',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_KOSM',
                                        navn: 'Kosmetisk inngrep som er medisinsk begrunnet',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '3',
                                            setning: null,
                                            bokstav: null,
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_KONTROLL',
                                        navn: 'nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'e',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_SMITTE',
                                        navn: 'Myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'f',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_SVANGERSKAPSAVBRUDD',
                                        navn: 'Arbeidsufør som følge av svangerskapsavbrudd',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'g',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_BARNLOSHET',
                                        navn: 'Arbeidsufør som følge av behandling for barnløshet',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'h',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_DONOR',
                                        navn: 'Er donor eller er under vurdering som donor',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'i',
                                        },
                                    },
                                    {
                                        kode: 'ARBUFOR_STERILISERING',
                                        navn: 'arbeidsufør som følge av behandling i forbindelse med sterilisering',
                                        oppfylt: 'OPPFYLT',
                                        vilkårshjemmel: {
                                            lovverk: 'Folketrygdloven',
                                            lovverksversjon: '2019-01-01',
                                            paragraf: '8-4',
                                            ledd: '2',
                                            setning: null,
                                            bokstav: 'j',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'IKKE_OPPFYLT',
                        navn: 'Ikke oppfylt',
                        oppfylt: 'IKKE_OPPFYLT',
                    },
                ],
            },
        ],
    },
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2019-01-01',
            paragraf: '8-9',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPHOLD_I_NORGE',
        beskrivelse:
            'Den sykmeldte oppholder seg i Norge, i et annet EØS-land eller i et land eller område der trygdeforordningen gjelder',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'EOS_BORGER',
                        navn: 'Er EoS borger',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-9',
                            ledd: '1',
                            setning: '1',
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'IKKE_EOS',
                        navn: 'TODO',
                        oppfylt: 'IKKE_OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-9',
                            ledd: '1',
                            setning: '2',
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
            paragraf: '8-12',
            ledd: '1',
            setning: '1',
            bokstav: null,
        },
        vilkårskode: 'DAGER_IGJEN',
        beskrivelse: 'Retten til sykepenger fra trygden opphører ved mottak av sykepenger over en bestemt periode',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'DAGER_IGJEN_ARB_SN_FRI',
                        navn: 'arbeidstaker, selvstendig næringsdrivende eller frilanser (maks 248 dager i de siste tre årene)',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-12',
                            ledd: '1',
                            setning: '1',
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'DAGER_IGJEN_ANDRE',
                        navn: 'Når andre medlemmer har mottatt sykepenger fra trygden i til sammen 250 dager i de siste tre årene, opphører retten til sykepenger fra trygden',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-12',
                            ledd: '1',
                            setning: '2',
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'DAGER_IGJEN_26UKER_ARBEIDSFOR',
                        navn: 'Har vært helt arbeidsfør i 26 uker etter sykepenger fra trygden',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2019-01-01',
                            paragraf: '8-12',
                            ledd: '2',
                            setning: '1',
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
            paragraf: '8-38',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'JEVNLIG_INNTEKT',
        beskrivelse: 'Har hatt jevnlig frilanser inntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [],
            },
        ],
    },
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2012-01-01',
            paragraf: '8-3',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'TAP_MINSTEINNTEKT',
        beskrivelse: 'Tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Er vilkåret oppfylt?',
                variant: 'RADIO',
                alternativer: [],
            },
        ],
    },
    {
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2021-06-01',
            paragraf: '8-12',
            ledd: null,
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'DAGER_IGJEN',
        beskrivelse: 'Antall sykepengedager',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'VILKAR_OPPFYLT',
                navn: 'Har den sykmeldte flere sykepengedager igjen?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'DAGER_IGJEN_OPPFYLT_FOR_HELE_PERIODEN',
                        navn: 'Sykepengedager igjen for hele perioden',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2021-06-01',
                            paragraf: '8-12',
                            ledd: '1',
                            setning: null,
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'DAGER_IGJEN_OPPFYLT_FOR_DELER_AV_PERIODEN',
                        navn: 'Sykepengedager igjen for deler av perioden',
                        oppfylt: 'OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2021-06-01',
                            paragraf: '8-12',
                            ledd: '1',
                            setning: null,
                            bokstav: null,
                        },
                    },
                    {
                        kode: 'IKKE_DAGER_IGJEN',
                        navn: 'Fått utbetalt sykepenger til maksdato og ikke opptjent ny rett til sykepenger',
                        oppfylt: 'IKKE_OPPFYLT',
                        vilkårshjemmel: {
                            lovverk: 'Folketrygdloven',
                            lovverksversjon: '2021-06-01',
                            paragraf: '8-12',
                            ledd: '2',
                            setning: null,
                            bokstav: null,
                        },
                    },
                ],
            },
        ],
    },
]
