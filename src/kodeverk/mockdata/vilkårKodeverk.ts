import { type Kodeverk } from '@/schemas/kodeverk'

export const lokalUtviklingKodeverk: Kodeverk = [
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2019-07-01",
            "kapittel": "22",
            "paragraf": "13",
            "ledd": "",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "KRAV_RETTIDIG_FRAMSATT",
        "beskrivelse": "Frist for framsetting av krav",
        "oppfylt": [
            {
                "kode": "KRAV_FRAMSATT_INNEN_TRE_MAANEDER",
                "beskrivelse": "Søkt innen tre måneder",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-07-01",
                    "kapittel": "22",
                    "paragraf": "13",
                    "ledd": "3",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "KRAV_FRAMSATT_INNEN_TRE_AAR_OPPLYSNINGER",
                "beskrivelse": "Søkt innen tre år, fordi trygdens organer har gitt misvisende opplysninger",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-07-01",
                    "kapittel": "22",
                    "paragraf": "13",
                    "ledd": "7",
                    "setning": "2",
                    "bokstav": null
                }
            },
            {
                "kode": "KRAV_FRAMSATT_INNEN_TRE_AAR_UTEAVSTAND",
                "beskrivelse": "Søkt innen tre år, har åpenbart ikke har vært i stand til å sette fram krav tidligere",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-07-01",
                    "kapittel": "22",
                    "paragraf": "13",
                    "ledd": "7",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "KRAV_IKKE_RETTIDIG_FRAMSATT",
                "beskrivelse": "Kravet er ikke rettidig framsatt, etter en samlet vurdering av ftrl 22-13",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-07-01",
                    "kapittel": "22",
                    "paragraf": "13",
                    "ledd": "",
                    "setning": null,
                    "bokstav": null
                }
            }
        ]
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2020-06-12",
            "kapittel": "8",
            "paragraf": "2",
            "ledd": "",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "OPPTJENING",
        "beskrivelse": "Opptjeningstid",
        "oppfylt": [
            {
                "kode": "OPPTJENING_MINST_4_UKER",
                "beskrivelse": "Har arbeidet i minst fire uker før arbeidsuførhet inntreffer",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "1",
                    "setning": "1"
                }
            },
            {
                "kode": "OPPTJENING_ANNEN_YTELSE",
                "beskrivelse": "Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "2",
                    "setning": "1"
                }
            },
            {
                "kode": "OPPTJENING_COVID",
                "beskrivelse": "Selvstendig næringsdrivende og frilansere som har mistet inntekt som følge av utbrudd av covid-19",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "3"
                }
            },
            {
                "kode": "OPPTJENING_YRKESAKTIV_FOER_FORELDREPENGER",
                "beskrivelse": "Sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger starter",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "2",
                    "setning": "3",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "OPPTJENING_AAP_FOR_FORELDREPENGER",
                "beskrivelse": "Har AAP før foreldrepenger og retten var brukt opp uten ny opptjening",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "2",
                    "setning": "2"
                }
            },
            {
                "kode": "IKKE_OPPTJENING_ARBEID_ELLER_YTELSE",
                "beskrivelse": "Ikke arbeid eller likestilt ytelse umiddelbart før arbeidsuførhet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-06-12",
                    "kapittel": "8",
                    "paragraf": "2",
                    "ledd": "",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-02T10:17:47.061Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2021-06-01",
            "kapittel": "8",
            "paragraf": "4",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "ARBUFOR",
        "beskrivelse": "Er arbeidsufør",
        "oppfylt": [
            {
                "kode": "ARBUFOR_FUNK",
                "beskrivelse": "Har en funksjonsnedsettelse som klart skyldes sykdom eller skade",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "1",
                    "setning": "1"
                }
            },
            {
                "kode": "ARBUFOR_INSTITUSJON",
                "beskrivelse": "Er innlagt i en godkjent helseinstitusjon",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "bokstav": "a"
                }
            },
            {
                "kode": "ARBUFOR_BEHANDLING",
                "beskrivelse": "Er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "bokstav": "b"
                }
            },
            {
                "kode": "ARBUFOR_TILTAK",
                "beskrivelse": "Deltar på et arbeidsrettet tiltak",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "bokstav": "c"
                }
            },
            {
                "kode": "ARBUFOR_TILSKOTT",
                "beskrivelse": "På grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "bokstav": "d"
                }
            },
            {
                "kode": "ARBUFOR_KOSM",
                "beskrivelse": "Kosmetisk inngrep som er medisinsk begrunnet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "3"
                }
            },
            {
                "kode": "ARBUFOR_KONTROLL",
                "beskrivelse": "nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "e"
                }
            },
            {
                "kode": "ARBUFOR_SMITTE",
                "beskrivelse": "Myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "f"
                }
            },
            {
                "kode": "ARBUFOR_SVANGERSKAPSAVBRUDD",
                "beskrivelse": "Arbeidsufør som følge av svangerskapsavbrudd",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "g"
                }
            },
            {
                "kode": "ARBUFOR_BARNLOSHET",
                "beskrivelse": "Arbeidsufør som følge av behandling for barnløshet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "h"
                }
            },
            {
                "kode": "ARBUFOR_DONOR",
                "beskrivelse": "Er donor eller er under vurdering som donor",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "i"
                }
            },
            {
                "kode": "ARBUFOR_STERILISERING",
                "beskrivelse": "arbeidsufør som følge av behandling i forbindelse med sterilisering",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": "j"
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "IKKE_ARBUFOR_FUNK",
                "beskrivelse": "Har ikke en funksjonsnedsettelse som klart skyldes sykdom eller skade",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "ARBUFOR_KOSM_IKKE_MEDISINSK",
                "beskrivelse": "Kosmetisk inngrep som ikke er medisinsk begrunnet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "4",
                    "ledd": "3",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-02T10:17:47.061Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2023-12-20",
            "kapittel": "8",
            "paragraf": "9",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "OPPHOLDSKRAV",
        "beskrivelse": "Oppholdskrav",
        "oppfylt": [
            {
                "kode": "GODKJENT_OPPHOLD_UTENFOR_EOS",
                "beskrivelse": "Den sykmeldte har oppholdt seg utenfor EØS og har fått oppholdet godkjent av Nav",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "GODKJENT_OPPHOLD_UTENFOR_NORGE",
                "beskrivelse": "Den sykmeldte har oppholdt seg utenfor Norge og har fått oppholdet godkjent av Nav",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "IKKE_SOKT_OM_OPPHOLD_UTENFOR_EOS",
                "beskrivelse": "Den sykmeldte har ikke søkt om å få beholde sykepengene under opphold utenfor EØS",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": "",
                    "setning": "",
                    "bokstav": null
                }
            },
            {
                "kode": "IKKE_RETT_TIL_OPPHOLD_UTENFOR_EOS",
                "beskrivelse": "Den sykmeldte har søkt om å få beholde sykepengene under opphold utenfor EØS, men har fått avslag",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "IKKE_SOKT_OM_OPPHOLD_UTENFOR_NORGE",
                "beskrivelse": "Den sykmeldte har ikke søkt om å få beholde sykepengene under opphold utenfor Norge",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "IKKE_RETT_TIL_OPPHOLD_UTENFOR_NORGE",
                "beskrivelse": "Den sykmeldte har søkt om å få beholde sykepengene under opphold utenfor Norge, men har fått avslag",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-12-20",
                    "kapittel": "8",
                    "paragraf": "9",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Netland, Morten Jonassen",
        "sistEndretDato": "2025-09-30T08:16:00.777Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2019-01-01",
            "kapittel": "8",
            "paragraf": "38",
            "ledd": "1",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "JEVNLIG_INNTEKT",
        "beskrivelse": "Har hatt jevnlig frilanser inntekt ",
        "oppfylt": [],
        "ikkeOppfylt": [
            {
                "kode": "SPORADISK_INNTEKT",
                "beskrivelse": "Medlem har ikke hatt jevn inntekt",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-01-01",
                    "kapittel": "8",
                    "paragraf": "38",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-18T12:20:52.594Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2012-01-01",
            "kapittel": "8",
            "paragraf": "3",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "TAP_PENSJONSGIVENDEINNTEKT_OG_MINSTEINNTEKT",
        "beskrivelse": "Tap av pensjonsgivende inntekt og minsteinntekt",
        "oppfylt": [
            {
                "kode": "TAPTINNTEKT",
                "beskrivelse": "Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "MINSTEINNTEKT",
                "beskrivelse": "Sykepengegrunnlaget utgjør minst 50 prosent av grunnbeløpet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "MAXALDER",
                "beskrivelse": "Den sykmeldte er fylt 70 år",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "1",
                    "setning": "2",
                    "bokstav": null
                }
            },
            {
                "kode": "AVSLUTTET_AKTIVITET",
                "beskrivelse": "Trukket seg tilbake fra arbeidslivet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "3",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "IKKE_MINSTEINNTEKT",
                "beskrivelse": "Sykepengegrunnlaget utgjør minst 50 prosent av grunnbeløpet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "2",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "IKKE_TAPTINNTEKT",
                "beskrivelse": "Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2012-01-01",
                    "kapittel": "8",
                    "paragraf": "3",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-18T12:20:52.594Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2021-06-01",
            "kapittel": "8",
            "paragraf": "12",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "DAGER_IGJEN",
        "beskrivelse": "Antall sykepengedager",
        "oppfylt": [
            {
                "kode": "DAGER_IGJEN",
                "beskrivelse": "Medlem har gjenstående sykepengedager",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "12",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "DAGER_IGJEN_NEI",
                "beskrivelse": "Har fått utbetalt sykepenger til maksdato og har ikke opptjent ny rett til sykepenger",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "12",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-18T12:20:52.594Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "1998-12-18",
            "kapittel": "8",
            "paragraf": "15",
            "ledd": "",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "ARB_MIDLERTIDIG_AVBRUTT",
        "beskrivelse": "Arbeidsforholdet er midlertidig avbryt i mer enn 14 dager",
        "oppfylt": [
            {
                "kode": "ARB_MIDLERTIDIG_AVBRUTT_PERM",
                "beskrivelse": "Permisjon",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1998-12-18",
                    "kapittel": "8",
                    "paragraf": "15",
                    "ledd": "2",
                    "setning": "2",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "ARB_MIDLERTIDIG_AVBRUT_TURNUS",
                "beskrivelse": "Fast turnusordning",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "15",
                    "ledd": "2",
                    "setning": "3",
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-18T12:37:12.807Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2023-01-01",
            "kapittel": "8",
            "paragraf": "17",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "SYKEPENGER_TRYGDEN",
        "beskrivelse": "Trygden yter sykepenger ",
        "oppfylt": [
            {
                "kode": "SYKEPENGER_TRYGDEN_AGUT",
                "beskrivelse": "Arbeidsgiverperioden er utløpt",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-01-01",
                    "kapittel": "8",
                    "paragraf": "17",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "a"
                }
            },
            {
                "kode": "SYKEPENGER_TRYGDEN_IKKEARB",
                "beskrivelse": "Arbeidsgiveren er ikke forpliktet til å yte etter ftrl § 8-18",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-01-01",
                    "kapittel": "8",
                    "paragraf": "17",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "b"
                }
            },
            {
                "kode": "SYKEPENGER_TRYGDEN_STREIK_LOCKOUT",
                "beskrivelse": "Streik eller lockout etter ftrl § 8-31",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-01-01",
                    "kapittel": "8",
                    "paragraf": "17",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "c"
                }
            },
            {
                "kode": "SYKEPENGER_TRYGDEN_KONTROLL",
                "beskrivelse": "Nødvendig kontrollundersøkelse som krever minst 24 timers fravær, jf. ftrl  8-4 2 e ",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-01-01",
                    "kapittel": "8",
                    "paragraf": "17",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "d"
                }
            },
            {
                "kode": "SYKEPENGER_TRYGDEN_DONOR",
                "beskrivelse": "Arbeidstakeren er donor, jf § 8-4 2  i",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-01-01",
                    "kapittel": "8",
                    "paragraf": "17",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "e"
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-18T12:20:52.594Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2019-01-01",
            "kapittel": "8",
            "paragraf": "22",
            "ledd": "",
            "setning": "",
            "bokstav": null
        },
        "vilkårskode": "ARB_BETALER_IKKE",
        "beskrivelse": "Trygdens ansvar når arbeidsgiveren ikke betaler",
        "oppfylt": [
            {
                "kode": "NAV_FORSKUTTERER_AGPERIODEN",
                "beskrivelse": "Nav forskutterer sykepenger i arbeidsgiverperioden",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-01-01",
                    "kapittel": "8",
                    "paragraf": "22",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "NAV_FORSKUTTERER_IKKE_AGPERIODEN",
                "beskrivelse": "Nav forskutterer ikke sykepenger i arbeidsgiverperioden",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2019-01-01",
                    "kapittel": "8",
                    "paragraf": "22",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-09-22T10:38:59.472Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2021-05-21",
            "kapittel": "8",
            "paragraf": "44",
            "ledd": "",
            "setning": null,
            "bokstav": ""
        },
        "vilkårskode": "ARBUFOR_SKIP",
        "beskrivelse": "Arbeidstaker på skip",
        "oppfylt": [
            {
                "kode": "ARBUFOR_SKIP_OPPFYLT",
                "beskrivelse": "Arbeidsufør som ansatt på et norsk skip i utenriksfart",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-05-21",
                    "kapittel": "8",
                    "paragraf": "44",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "a"
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "ARBUFOR_SKIP_NO",
                "beskrivelse": "Ble ikke arbeidsufør som ansatt på et norsk skip i utenriksfart",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-05-21",
                    "kapittel": "8",
                    "paragraf": "44",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "a"
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:59:32.459Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2020-01-01",
            "kapittel": "8",
            "paragraf": "47",
            "ledd": "",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "INAKTIV",
        "beskrivelse": "Yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid",
        "oppfylt": [
            {
                "kode": "UTE_AV_ARBEID_SLUTTVEDERLAG_ETTERLONN",
                "beskrivelse": "Har vært ute av inntektsgivende arbeid i opptil seks måneder med sluttvederlag eller etterlønn",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "4",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_UTDANNINGSPERMISJON",
                "beskrivelse": "Har vært ute av inntektsgivende arbeid i opptil ett år ved utdanningspermisjon",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "4",
                    "setning": "2",
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_HOVED",
                "beskrivelse": "Ute av inntektsgivende arbeid i mindre enn en måned",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_ANNEN_YTELSE",
                "beskrivelse": " Tidsrom da medlemmet mottar en ytelse til livsopphold etter kapitlene 4, 8, 9 eller 14 er likestilt med arbeid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "2",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_MLTJ",
                "beskrivelse": " Tidsrom da medlemmet utfører militærtjeneste er likestilt med arbeid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "3",
                    "setning": "",
                    "bokstav": "a"
                }
            },
            {
                "kode": "UTE_AV_ARBEID_SKIP_FRITID",
                "beskrivelse": "Tidsrom da arbeidstaker på skip i utenriksfart avspaserer opparbeidet fritid er likestilt med arbeid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "3",
                    "setning": null,
                    "bokstav": "b"
                }
            },
            {
                "kode": "UTE_AV_ARBEID_FERIE",
                "beskrivelse": "Tidsrom da medlemmet har lovbestemt ferie er likestilt med arbeid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "3",
                    "setning": null,
                    "bokstav": "c"
                }
            },
            {
                "kode": "UTE_AV_ARBEID_PERMISJON_AVTALE",
                "beskrivelse": "Tidsrom da medlemmet har lovbestemt permisjon er likestilt med arbeid hvis det foreligger avtale om å gjenoppta arbeidet etter permisjonen",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "3",
                    "setning": null,
                    "bokstav": "d"
                }
            },
            {
                "kode": "UTE_AV_ARBEID_SISTE_JOBB",
                "beskrivelse": "Ute av inntektsgivende arbeid på sykmeldingstidspunktet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "a"
                }
            },
            {
                "kode": "I_ARBEID_UTEN_OPPTJENNING",
                "beskrivelse": "Har nylig begynt i arbeid uten å fylle vilkåret i § 8-2 om fire ukers opptjeningstid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": "b"
                }
            },
            {
                "kode": "UTE_AV_ARBEID_INNEKTSTAP",
                "beskrivelse": "Den sykmeldte kan godtgjøre inntektstap",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "5",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_MINST_1G",
                "beskrivelse": "Den sykmeldte har et sykepengegrunnlag som minst svarer til grunnbeløpet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "UTE_AV_ARBEID_FOR_LENGE",
                "beskrivelse": "Har vært ute av inntektsgivende arbeid for lenge",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "8",
                    "paragraf": "8-47",
                    "ledd": "",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_IKKE_INNTEKTSTAP",
                "beskrivelse": "Den sykmeldte kan ikke godtgjøre inntektstap",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "5",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "UTE_AV_ARBEID_MINDRE_ENN_1G",
                "beskrivelse": "Den sykmeldte har ikke et sykepengegrunnlag som minst svarer til grunnbeløpet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2020-01-01",
                    "kapittel": "8",
                    "paragraf": "47",
                    "ledd": "5",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "1997-05-01",
            "kapittel": "2",
            "paragraf": "",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "MEDLEM_I_FOLKETRYGDEN",
        "beskrivelse": "Medlemskap",
        "oppfylt": [
            {
                "kode": "MEDLEMSKAP_JA",
                "beskrivelse": "Den sykmeldte er medlem i folketrygden",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "2",
                    "paragraf": "",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "MEDLEMSKAP_NEI",
                "beskrivelse": "Den sykmeldte er ikke medlem i folketrygden",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-05-01",
                    "kapittel": "2",
                    "paragraf": "",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2021-06-01",
            "kapittel": "8",
            "paragraf": "8",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "MEDLEMMETS_MEDVIRKNING",
        "beskrivelse": "Medvirkning",
        "oppfylt": [
            {
                "kode": "MEDVIRKNING_OPPFYLT",
                "beskrivelse": "Den sykmeldte har gitt opplysninger eller medvirket til utredning, eller hatt rimelig grunn til å ikke ta imot tilbud om behandling, rehabilitering, tilrettelegging av arbeid og arbeidsutprøving eller arbeidsrettede tiltak",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "8",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "MEDVIRKNING_IKKE_OPPFYLT",
                "beskrivelse": "Den sykmeldte har uten rimelig grunn nektet å gi opplysninger eller medvirket til utredning, eller uten rimelig grunn nektet å ta imot tilbud om behandling, rehabilitering, tilrettelegging av arbeid og arbeidsutprøving eller arbeidsrettede tiltak",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-06-01",
                    "kapittel": "8",
                    "paragraf": "8",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2023-07-01",
            "kapittel": "8",
            "paragraf": "7",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "ARBEIDSUFOR_DOKUMENTERT",
        "beskrivelse": "Dokumentasjon av arbeidsuførhet",
        "oppfylt": [
            {
                "kode": "ARBEIDSUFOR_TILBAKEDATERING_GODKJENT",
                "beskrivelse": "Den sykmeldte har godtgjort arbeidsuførhet fra et tidligere tidspunkt",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-07-01",
                    "kapittel": "8",
                    "paragraf": "7",
                    "ledd": "2",
                    "setning": "2",
                    "bokstav": null
                }
            },
            {
                "kode": "UNNTATT_LEGEERKLAERING_INNLAGT",
                "beskrivelse": "Unntatt fra utdypende legeerklæring fordi medlemmet er innlagt i helseinstitusjon",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-07-01",
                    "kapittel": "8",
                    "paragraf": "7",
                    "ledd": "8",
                    "setning": null,
                    "bokstav": "a"
                }
            },
            {
                "kode": "UNNTATT_LEGEERKLAERING_ALVORLIG_LIDELSE",
                "beskrivelse": "Unntatt fra utdypende legeerklæring fordi lidelsen er så alvorlig at en ikke kan regne med at medlemmet blir arbeidsfør igjen",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-07-01",
                    "kapittel": "8",
                    "paragraf": "7",
                    "ledd": "8",
                    "setning": "1",
                    "bokstav": "b"
                }
            },
            {
                "kode": "UNNTATT_LEGEERKLAERING_SNART_FRISK",
                "beskrivelse": "Unntatt fra utdypende legeerklæring fordi medlemmet forventes å bli friskmeldt innen kort tid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-07-01",
                    "kapittel": "8",
                    "paragraf": "7",
                    "ledd": "8",
                    "setning": null,
                    "bokstav": "c"
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "TILBAKEDATERING_IKKE_GODKJENT",
                "beskrivelse": "Den sykmeldte har ikke godtgjort arbeidsuførhet fra et tidligere tidspunkt",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2023-07-01",
                    "kapittel": "8",
                    "paragraf": "7",
                    "ledd": "2",
                    "setning": "2",
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven ",
            "lovverksversjon": "20170701",
            "kapittel": "8",
            "paragraf": "46",
            "ledd": "1",
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "SYK_VERNEPLIKTIG",
        "beskrivelse": "Vernepliktige kan få sykepenger dersom arbeidsuførheten oppstår under tjenesten",
        "oppfylt": [
            {
                "kode": "ARBUFOR_UNDER_TJENESTE",
                "beskrivelse": "Er blitt arbeidsufør under tjenesten",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven ",
                    "lovverksversjon": "20170701",
                    "kapittel": "8",
                    "paragraf": "46",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            },
            {
                "kode": "SYKGRUNN_2G",
                "beskrivelse": "Dersom tjenesten har vart eller var ment å vare mer enn 28 dager, skal sykepengegrunnlaget minst svare til en årsinntekt på to ganger grunnbeløpet",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven ",
                    "lovverksversjon": "20170701",
                    "kapittel": "8",
                    "paragraf": "46",
                    "ledd": "2",
                    "setning": "",
                    "bokstav": "b"
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2002-01-01",
            "kapittel": "8",
            "paragraf": "14",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "REISETILSKUDD",
        "beskrivelse": "Reisetilskudd til arbeidsreiser",
        "oppfylt": [
            {
                "kode": "REISETILSKUDD_OPPFYLT",
                "beskrivelse": "Reisetilskudd i stedet for sykepenger fordi den sykmeldte ikke kan reise på vanlig måte til og fra arbeidsstedet på grunn av sykdom eller skade",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2002-01-01",
                    "kapittel": "8",
                    "paragraf": "14",
                    "ledd": "1",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "REISETILSKUDD_IKKE_OPPFYLT",
                "beskrivelse": "Den sykmeldte har ikke rett til reisetilskudd",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2002-01-01",
                    "kapittel": "8",
                    "paragraf": "14",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "1997-01-01",
            "kapittel": "8",
            "paragraf": "13",
            "ledd": "",
            "setning": "",
            "bokstav": null
        },
        "vilkårskode": "GRADERTE_SYKEPENGER",
        "beskrivelse": "Graderte sykepenger",
        "oppfylt": [
            {
                "kode": "ARBEIDSUFOR_20_ELLER_MER",
                "beskrivelse": "Den sykmeldte er minst 20 prosent arbeidsufør",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-01-01",
                    "kapittel": "8",
                    "paragraf": "13",
                    "ledd": "1",
                    "setning": "2",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [
            {
                "kode": "ARBEIDSUFOR_MINDRE_ENN_20",
                "beskrivelse": "Den sykmeldte er mindre enn 20 prosent arbeidsufør",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1997-01-01",
                    "kapittel": "8",
                    "paragraf": "13",
                    "ledd": "1",
                    "setning": "2",
                    "bokstav": null
                }
            }
        ],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2006-07-01",
            "kapittel": "8",
            "paragraf": "5",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "FRISKMELDING_ARBFORMIDLING",
        "beskrivelse": "Friskmelding til arbeidsformidling",
        "oppfylt": [
            {
                "kode": "HAR_SAGT_OPP",
                "beskrivelse": "Arbeidsforhold har opphørt i samsvar med arbeidsmiljølovens bestemmelser",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2006-07-01",
                    "kapittel": "8",
                    "paragraf": "5",
                    "ledd": "2",
                    "setning": "1",
                    "bokstav": null
                }
            },
            {
                "kode": "ER_ARBEIDSSOEKER",
                "beskrivelse": "Den sykmeldte har meldt seg som arbeidssøker hos Arbeids- og velferdsetaten",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2006-07-01",
                    "kapittel": "8",
                    "paragraf": "5",
                    "ledd": "2",
                    "setning": "1",
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "1999-10-12",
            "kapittel": "8",
            "paragraf": "45",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "FISKERE",
        "beskrivelse": "Fiskere",
        "oppfylt": [
            {
                "kode": "OPPTJENING_UNNTAK_FISKER",
                "beskrivelse": "Fisker som er tatt opp på blad B i fiskermanntallet har rett til sykepenger uten hensyn til bestemmelsene i § 8-2 om opptjeningstid",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "1999-10-12",
                    "kapittel": "8",
                    "paragraf": "45",
                    "ledd": null,
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:58:43.416Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2017-07-01",
            "kapittel": "8",
            "paragraf": "46",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "MILITARTJENESTE",
        "beskrivelse": "Vernepliktige",
        "oppfylt": [
            {
                "kode": "OPPTJENING_UNNTAK_MILITARTJENESTE",
                "beskrivelse": "Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten, har rett til sykepenger ved arbeidsuførhet uten hensyn til vilkårene i § 8-2 dersom arbeidsuførheten oppstår under tjenesten",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2017-07-01",
                    "kapittel": "8",
                    "paragraf": "46",
                    "ledd": "1",
                    "setning": null,
                    "bokstav": null
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:58:13.119Z"
    },
    {
        "vilkårshjemmel": {
            "lovverk": "Folketrygdloven",
            "lovverksversjon": "2021-07-01",
            "kapittel": "8",
            "paragraf": "55",
            "ledd": null,
            "setning": null,
            "bokstav": null
        },
        "vilkårskode": "YRKESSKADE",
        "beskrivelse": "Sykepenger ved yrkesskade",
        "oppfylt": [
            {
                "kode": "OPPTJENING_UNNTAK_YRKESSKADE",
                "beskrivelse": "Arbeidsufør på grunn av en godkjent yrkesskade",
                "vilkårshjemmel": {
                    "lovverk": "Folketrygdloven",
                    "lovverksversjon": "2021-07-01",
                    "kapittel": "8",
                    "paragraf": "55",
                    "ledd": null,
                    "setning": null,
                    "bokstav": "a"
                }
            }
        ],
        "ikkeOppfylt": [],
        "sistEndretAv": "Engesvold, Jørgen",
        "sistEndretDato": "2025-10-08T10:43:02.233Z"
    }
]