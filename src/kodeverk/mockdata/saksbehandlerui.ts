import { type HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export const saksbehandlerUi: HovedspørsmålArray = [
    {
        kode: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '2b3c4d5e-6f78-90ab-cdef-123456789012',
                navn: 'Oppfyller vilkår om opptjeningstid',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'ab6e09a4-e770-4a0d-a63c-872f640b8b1a',
                        navn: 'Ja',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '3c4d5e6f-7890-abcd-ef12-345678901234',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENNING_HOVEDREGEL',
                                        navn: 'Minst fire uker i arbeid umiddelbart før arbeidsuførhet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENNING_ANNEN_YTELSE',
                                        navn: 'Mottak av ytelse som er likestilt med arbeid',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENNING_YRKESAKTIV_FOR_FORELDREPENGER',
                                        navn: 'Forutgående foreldrepenger opptjent på grunnlag av arbeidsavklaringspenger, men personen har vært sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger startet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENNING_COVID',
                                        navn: 'Mottak av covid-ytelse',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'f227f4f9-bfd4-41be-b314-17cefb4f8d0d',
                        navn: 'Nei',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '4d5e6f78-90ab-cdef-1234-56789012345a',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_NEI_IKKE_ARBEID_ELLER_YTELSE',
                                        navn: 'Ikke arbeid eller likestilt ytelse umiddelbart før arbeidsuførhet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENNING_AAP_FOR_FORELDREPENGER',
                                        navn: 'Forutgående foreldrepenger opptjent på grunnlag av arbeidsavklaringspenger, og personen har ikke vært sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger startet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: '191798df-6a0e-4eb0-830a-e83acb253401',
                        navn: 'Ikke aktuelt / unntak',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '5e6f7890-abcd-ef12-3456-789012345abc',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBUFOR_SKIP_OPPFYLT',
                                        navn: 'Ansatt på et norsk skip i utenriksfart',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_FISKER',
                                        navn: 'Fisker som er tatt opp på blad B i fiskermanntallet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_MILITARTJENESTE',
                                        navn: 'Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_YRKESSKADE',
                                        navn: 'Arbeidsufør på grunn av en godkjent yrkesskade',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
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
        kode: '6f789012-3456-789a-bcde-f123456789ab',
        beskrivelse: 'Tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '789012ab-cdef-1234-5678-9012345abcde',
                navn: 'Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'INNTEKTSTAP_JA',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'INNTEKTSTAP_NEI',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
            {
                kode: '890123cd-ef12-3456-789a-bcdef1234567',
                navn: 'Sykepengegrunnlaget utgjør minst 50 prosent av grunnbeløpet',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'HALVG_JA',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'HALVG_NEI',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
            {
                kode: '901234ef-5678-9abc-def1-23456789abcd',
                navn: 'Andre avslagsgrunner',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'FYLT_70',
                        navn: 'Fylt 70 år',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'sdfdsfsdf',
                        navn: 'Trukket seg tilbake fra arbeidslivet',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
    {
        kode: 'b23456cd-ef78-9abc-def1-23456789abef',
        beskrivelse: 'Arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'c34567de-f890-abcd-ef12-3456789abcde',
                navn: 'Er vilkåret om arbeidsuførhet oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: '4b23567e-f012-345c-def0-abcdef012345',
                        navn: 'Ja',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'd45678ef-9012-3456-789a-bcdef123456f',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_FUNKSJONSNEDSETTELSE',
                                        navn: 'Arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_HELSEINSTITUSJON',
                                        navn: 'Innlagt i en godkjent helseinstitusjon',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_BEHANDLING',
                                        navn: 'Under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_TILTAK',
                                        navn: 'Deltar på et arbeidsrettet tiltak',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_OPPLÆRINGSTILTAK',
                                        navn: 'På grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_KONTROLLUNDERSØKELSE',
                                        navn: 'Nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_SMITTEFARE',
                                        navn: 'Myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_SVANGERSKAPSAVBRUDD',
                                        navn: 'Arbeidsufør som følge av svangerskapsavbrudd',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_BARNLØSHET',
                                        navn: 'Arbeidsufør som følge av behandling for barnløshet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_DONOR',
                                        navn: 'Donor eller er under vurdering som donor',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_STERILISERING',
                                        navn: 'Arbeidsufør som følge av behandling i forbindelse med sterilisering',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_KOSMETISK',
                                        navn: 'Medisinsk begrunnet kosmetisk inngrep',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: '5c34678f-0123-456d-ef01-bcdef0123456',
                        navn: 'Nei',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'e56789f0-1234-5678-9abc-def123456789',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_IKKE_FUNKSJONSNEDSETTELSE',
                                        navn: 'Ikke arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_SOSIALE_ØKONOMISKE',
                                        navn: 'Arbeidsuførhet som skyldes sosiale eller økonomiske problemer o.l.',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_SOSIALE_KOSMETISK',
                                        navn: 'Kosmetisk inngrep som ikke er medisinsk begrunnet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        sistEndretAv: 'Per Olsen',
        sistEndretDato: '2024-01-18T09:15:00Z',
    },
    {
        kode: 'f6789012-3456-789a-bcde-f123456789ab',
        beskrivelse: 'Frist for framsetting av krav',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '0789123a-bcde-f456-789a-bcdef1234567',
                navn: 'Er vilkåret oppfylt for hele eller deler av perioden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'efdcd5d4-9df5-4e63-ba9a-b97cab307442',
                        navn: 'Ja, for hele perioden',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '1890234b-cdef-5678-90ab-cdef12345678',
                                navn: 'Velg begrunnelse',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_TRE_MÅNEDER',
                                        navn: 'Søkt innen tre måneder',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_TRE_ÅR_IKKE_I_STAND',
                                        navn: 'Søkt innen tre år, ikke vært i stand til å søke tidligere',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_FOR_DELER_AV_PERIODEN_PGA_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år, misvisende opplysninger',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: '6d457890-1234-567e-f012-cdef01234567',
                        navn: 'Ja, for deler av perioden',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '2901345c-def6-789a-bcde-f123456789ab',
                                navn: 'Velg begrunnelse',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_MÅNEDER',
                                        navn: 'Søkt innen tre måneder',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_ÅR_IKKE_I_STAND',
                                        navn: 'Søkt innen tre år, ikke vært i stand til å søke tidligere',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_ÅR_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år, misvisende opplysninger',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'KRAV_FRAMSATT_I_TIDE_NEI',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Anne Berg',
        sistEndretDato: '2024-01-22T16:20:00Z',
    },
    {
        kode: '3a12456d-ef78-90ab-cdef-123456789abc',
        beskrivelse: 'Medlemskap i folketrygden',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '4b23567e-f890-12ab-cdef-123456789bcd',
                navn: 'Er den sykmeldte medlem i folketrygden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'fd93f775-407c-4049-915d-c5c62bfb3d7d',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: '26c6de53-d68c-4f05-9005-642be8d254e8',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Lars Johansen',
        sistEndretDato: '2024-01-19T11:45:00Z',
    },
    {
        kode: '5c34678f-9012-34cd-ef12-3456789abcde',
        beskrivelse: 'Sykepenger ved friskmelding til arbeidsformidling',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '6d457890-1234-56de-f123-456789abcdef',
                navn: 'Er vilkårene oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING_JA',
                        navn: 'Ja, personen er av helsemessige grunner ikke i stand til å utføre sitt arbeid, men er ellers arbeidsfør. Personen har også meldt seg som arbeidssøker hos Arbeids- og velferdsetaten og et eventuelt arbeidsforhold har opphørt i samsvar med arbeidsmiljølovens bestemmelser',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING_NEI',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Mari Solberg',
        sistEndretDato: '2024-01-21T13:30:00Z',
    },
    {
        kode: '7e5689a1-2345-67ef-1234-56789abcdef0',
        beskrivelse: 'Gradert sykmelding',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Tom Nilsen',
        sistEndretDato: '2024-01-17T08:45:00Z',
    },
    {
        kode: '8f679ab2-3456-78f0-1234-56789abcdef1',
        beskrivelse: 'Dokumentasjon av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Ingrid Dahl',
        sistEndretDato: '2024-01-16T15:10:00Z',
    },
    {
        kode: '9078abc3-4567-89f1-2345-6789abcdef12',
        beskrivelse: 'Oppfølging mv. i regi av Arbeids- og velferdsetaten',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Erik Svendsen',
        sistEndretDato: '2024-01-14T12:25:00Z',
    },
    {
        kode: 'a189bcd4-5678-9af2-3456-789abcdef123',
        beskrivelse: 'Medlemmets medvirkning',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'b29acde5-6789-abf3-4567-89abcdef1234',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'MEDVIRKNING_IKKE_OPPFYLT_OPPLYSNINGER_OG_UTREDNING',
                        navn: 'Personen nekter å gi opplysninger eller medvirke til utredning, eller uten rimelig grunn nekter å ta imot tilbud om behandling, rehabilitering, tilrettelegging av arbeid og arbeidsutprøving eller arbeidsrettede tiltak ',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'MEDVIRKNING_IKKE_OPPFYLT_OPPFØLGING_OG_AKTIVITET',
                        navn: 'Personen unnlater å medvirke ved utarbeiding og gjennomføring av oppfølgingsplaner, unnlater å delta i dialogmøter eller unnlater å være i arbeidsrelatert aktivitet',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Sofia Andersen',
        sistEndretDato: '2024-01-23T10:15:00Z',
    },
    {
        kode: 'c3abdef6-789a-bcf4-5678-9abcdef12345',
        beskrivelse: 'Oppholdskrav',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Bjørn Hansen',
        sistEndretDato: '2024-01-13T14:50:00Z',
    },
    {
        kode: 'd4bcef07-89ab-cdf5-6789-abcdef123456',
        beskrivelse: 'Sykepengegrunnlag',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Hanna Kristiansen',
        sistEndretDato: '2024-01-12T09:30:00Z',
    },
    {
        kode: 'e5cdf018-9abc-def6-789a-bcdef1234567',
        beskrivelse: 'Sykepengedager',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Anders Pedersen',
        sistEndretDato: '2024-01-11T16:45:00Z',
    },
    {
        kode: 'f6de0129-abcd-ef07-89ab-cdef12345678',
        beskrivelse: 'Antall sykepengedager',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '07ef123a-bcde-f018-9abc-def123456789',
                navn: 'Har personen flere sykepengedager igjen?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_HELE',
                        navn: 'Ja, sykepengedager igjen for hele perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_DELER',
                        navn: 'Ja, sykepengedager igjen for deler av perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_INGEN',
                        navn: 'Nei, tidligere fått utbetalt sykepenger til maksdato og ikke opptjent ny rett til sykepenger',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Camilla Larsen',
        sistEndretDato: '2024-01-10T11:20:00Z',
    },
    {
        kode: '18f0234b-cdef-0129-abcd-ef123456789a',
        beskrivelse: 'Graderte sykepenger',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: '2901345c-def0-123a-bcde-f123456789ab',
                navn: 'Er personens evne til å utføre inntektsgivende arbeid nedsatt med minst 20 prosent?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_HELE',
                        navn: 'Ja, for hele perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_DELER',
                        navn: 'Ja, for deler av perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_INGEN',
                        navn: 'Nei, evnen er nedsatt med mindre enn 20 prosent for hele perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Magnus Eriksen',
        sistEndretDato: '2024-01-09T13:55:00Z',
    },
    {
        kode: '3a12456d-ef01-234b-cdef-123456789abc',
        beskrivelse: 'Tilskott til arbeidsreiser',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
        sistEndretAv: 'Nina Berg',
        sistEndretDato: '2024-01-08T10:40:00Z',
    },
]
