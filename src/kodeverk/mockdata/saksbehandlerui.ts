import { type HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export const saksbehandlerUi: HovedspørsmålArray = [
    {
        kode: 'KRAV_RETTIDIG_FRAMSATT',
        beskrivelse: 'Frist for framsetting av krav',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'KRAV_FRAMSATT_HELT_ELLER_DELVIS_I_TIDE',
                navn: 'Er vilkåret oppfylt for hele eller deler av perioden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA',
                        navn: 'Ja, for hele perioden',
                        underspørsmål: [
                            {
                                kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_BEGRUNNELSE',
                                navn: 'Velg begrunnelse',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_TRE_MÅNEDER',
                                        navn: 'Søkt innen tre måneder',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_TRE_ÅR_IKKE_I_STAND',
                                        navn: 'Søkt innen tre år, ikke vært i stand til å søke tidligere',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_HELE_PERIODEN_JA_TRE_ÅR_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år, misvisende opplysninger',
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA',
                        navn: 'Ja, for deler av perioden',
                        underspørsmål: [
                            {
                                kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_BEGRUNNELSE',
                                navn: 'Velg begrunnelse',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_MÅNEDER',
                                        navn: 'Søkt innen tre måneder',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_ÅR_IKKE_I_STAND',
                                        navn: 'Søkt innen tre år, ikke vært i stand til å søke tidligere',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_I_TIDE_DELER_AV_PERIODEN_JA_TRE_ÅR_MISVISENDE_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år, misvisende opplysninger',
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'KRAV_FRAMSATT_I_TIDE_NEI',
                        navn: 'Nei',
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
    {
        kode: 'MEDLEMSKAP',
        beskrivelse: 'Medlemskap i folketrygden',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'MEDLEMSKAP_ALTERNATIVER',
                navn: 'Er den sykmeldte medlem i folketrygden?',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'MEDLEMSKAP_JA', navn: 'Ja', underspørsmål: [] },
                    { kode: 'MEDLEMSKAP_NEI', navn: 'Nei', underspørsmål: [] },
                ],
            },
        ],
    },
    {
        kode: 'OPPTJENING',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'OPPTJENING_OPPFYLT',
                navn: 'Oppfyller vilkår om opptjeningstid',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPTJENING_OPPFYLT_JA',
                        navn: 'Ja',
                        underspørsmål: [
                            {
                                kode: 'OPPTJENING_OPPFYLT_JA_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_JA_ARBEID',
                                        navn: 'Minst fire uker i arbeid umiddelbart før arbeidsuførhet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_JA_YTELSE',
                                        navn: 'Mottak av ytelse som er likestilt med arbeid',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_JA_SAMMENHENGENDE_YRKESAKTIV',
                                        navn: 'Forutgående foreldrepenger opptjent på grunnlag av arbeidsavklaringspenger, men personen har vært sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger startet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_JA_COVID',
                                        navn: 'Mottak av covid-ytelse',
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'OPPTJENING_OPPFYLT_NEI',
                        navn: 'Nei',
                        underspørsmål: [
                            {
                                kode: 'OPPTJENING_OPPFYLT_NEI_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_NEI_IKKE_ARBEID_ELLER_YTELSE',
                                        navn: 'Ikke arbeid eller likestilt ytelse umiddelbart før arbeidsuførhet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_OPPFYLT_NEI_FORELDREPENGER_AV_AAP',
                                        navn: 'Forutgående foreldrepenger opptjent på grunnlag av arbeidsavklaringspenger, og personen har ikke vært sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger startet',
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'OPPTJENING_OPPFYLT_UNNTAK',
                        navn: 'Ikke aktuelt / unntak',
                        underspørsmål: [
                            {
                                kode: 'OPPTJENING_OPPFYLT_UNNTAK_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENING_UNNTAK_SKIP',
                                        navn: 'Ansatt på et norsk skip i utenriksfart',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_FISKER',
                                        navn: 'Fisker som er tatt opp på blad B i fiskermanntallet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_MILITÆRTJENESTE',
                                        navn: 'Utført militærtjeneste hvor arbeidsuførheten oppstod under tjenesten',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_UNNTAK_YRKESSKADE',
                                        navn: 'Arbeidsufør på grunn av en godkjent yrkesskade',
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
        kode: 'INNTEKTSTAP_OG_MINSTEINNTEKT',
        beskrivelse: 'Tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'INNTEKTSTAP',
                navn: 'Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'INNTEKTSTAP_JA', navn: 'Ja', underspørsmål: [] },
                    { kode: 'INNTEKTSTAP_NEI', navn: 'Nei', underspørsmål: [] },
                ],
            },
            {
                kode: 'HALVG',
                navn: 'Sykepengegrunnlaget utgjør minst 50 prosent av grunnbeløpet',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'HALVG_JA', navn: 'Ja', underspørsmål: [] },
                    { kode: 'HALVG_NEI', navn: 'Nei', underspørsmål: [] },
                ],
            },
            {
                kode: 'FYLT_70_GRUPPE',
                navn: 'Andre avslagsgrunner',
                variant: 'CHECKBOX',
                alternativer: [
                    { kode: 'FYLT_70', navn: 'Fylt 70 år', underspørsmål: [] },
                    { kode: 'TRUKKETSEG', navn: 'Trukket seg tilbake fra arbeidslivet', underspørsmål: [] },
                ],
            },
        ],
    },
    {
        kode: 'ARBEIDSUFØR',
        beskrivelse: 'Arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'ARBEIDSUFØRHET',
                navn: 'Er vilkåret om arbeidsuførhet oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'ARBEIDSUFØRHET_JA',
                        navn: 'Ja',
                        underspørsmål: [
                            {
                                kode: 'ARBEIDSUFØRHET_JA_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_FUNKSJONSNEDSETTELSE',
                                        navn: 'Arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_HELSEINSTITUSJON',
                                        navn: 'Innlagt i en godkjent helseinstitusjon',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_BEHANDLING',
                                        navn: 'Under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_TILTAK',
                                        navn: 'Deltar på et arbeidsrettet tiltak',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_OPPLÆRINGSTILTAK',
                                        navn: 'På grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_KONTROLLUNDERSØKELSE',
                                        navn: 'Nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_SMITTEFARE',
                                        navn: 'Myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_SVANGERSKAPSAVBRUDD',
                                        navn: 'Arbeidsufør som følge av svangerskapsavbrudd',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_BARNLØSHET',
                                        navn: 'Arbeidsufør som følge av behandling for barnløshet',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_DONOR',
                                        navn: 'Donor eller er under vurdering som donor',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_STERILISERING',
                                        navn: 'Arbeidsufør som følge av behandling i forbindelse med sterilisering',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_JA_KOSMETISK',
                                        navn: 'Medisinsk begrunnet kosmetisk inngrep',
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'ARBEIDSUFØRHET_NEI',
                        navn: 'Nei',
                        underspørsmål: [
                            {
                                kode: 'ARBEIDSUFØRHET_NEI_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_IKKE_FUNKSJONSNEDSETTELSE',
                                        navn: 'Ikke arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_SOSIALE_ØKONOMISKE',
                                        navn: 'Arbeidsuførhet som skyldes sosiale eller økonomiske problemer o.l.',
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBEIDSUFØRHET_NEI_SOSIALE_KOSMETISK',
                                        navn: 'Kosmetisk inngrep som ikke er medisinsk begrunnet',
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
        kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING',
        beskrivelse: 'Sykepenger ved friskmelding til arbeidsformidling',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING_ALTERNATIVER',
                navn: 'Er vilkårene oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING_JA',
                        navn: 'Ja, personen er av helsemessige grunner ikke i stand til å utføre sitt arbeid, men er ellers arbeidsfør. Personen har også meldt seg som arbeidssøker hos Arbeids- og velferdsetaten og et eventuelt arbeidsforhold har opphørt i samsvar med arbeidsmiljølovens bestemmelser',
                        underspørsmål: [],
                    },
                    { kode: 'FRISKMELDING_TIL_ARBEIDSFORMIDLING_NEI', navn: 'Nei', underspørsmål: [] },
                ],
            },
        ],
    },
    {
        kode: 'GRADERT_SYKMELDING',
        beskrivelse: 'Gradert sykmelding',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'DOKUMENTASJON_AV_ARBEIDSUFØRHET',
        beskrivelse: 'Dokumentasjon av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'OPPFØLGING',
        beskrivelse: 'Oppfølging mv. i regi av Arbeids- og velferdsetaten',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'MEDVIRKNING',
        beskrivelse: 'Medlemmets medvirkning',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'MEDVIRKNING_IKKE_OPPFYLT',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'MEDVIRKNING_IKKE_OPPFYLT_OPPLYSNINGER_OG_UTREDNING',
                        navn: 'Personen nekter å gi opplysninger eller medvirke til utredning, eller uten rimelig grunn nekter å ta imot tilbud om behandling, rehabilitering, tilrettelegging av arbeid og arbeidsutprøving eller arbeidsrettede tiltak ',
                        underspørsmål: [],
                    },
                    {
                        kode: 'MEDVIRKNING_IKKE_OPPFYLT_OPPFØLGING_OG_AKTIVITET',
                        navn: 'Personen unnlater å medvirke ved utarbeiding og gjennomføring av oppfølgingsplaner, unnlater å delta i dialogmøter eller unnlater å være i arbeidsrelatert aktivitet',
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
    {
        kode: 'OPPHOLDSKRAV',
        beskrivelse: 'Oppholdskrav',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'SYKEPENGEGRUNNLAG',
        beskrivelse: 'Sykepengegrunnlag',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'SYKEPENGEDAGER',
        beskrivelse: 'Sykepengedager',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
    {
        kode: 'SYKEPENGEDAGER_IGJEN',
        beskrivelse: 'Antall sykepengedager',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'SYKEPENGEDAGER_IGJEN_ALTERNATIVER',
                navn: 'Har personen flere sykepengedager igjen?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_HELE',
                        navn: 'Ja, sykepengedager igjen for hele perioden',
                        underspørsmål: [],
                    },
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_DELER',
                        navn: 'Ja, sykepengedager igjen for deler av perioden',
                        underspørsmål: [],
                    },
                    {
                        kode: 'SYKEPENGEDAGER_IGJEN_INGEN',
                        navn: 'Nei, tidligere fått utbetalt sykepenger til maksdato og ikke opptjent ny rett til sykepenger',
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
    {
        kode: 'GRADERTE_SYKEPENGER',
        beskrivelse: 'Graderte sykepenger',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [
            {
                kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR',
                navn: 'Er personens evne til å utføre inntektsgivende arbeid nedsatt med minst 20 prosent?',
                variant: 'RADIO',
                alternativer: [
                    { kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_HELE', navn: 'Ja, for hele perioden', underspørsmål: [] },
                    {
                        kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_DELER',
                        navn: 'Ja, for deler av perioden',
                        underspørsmål: [],
                    },
                    {
                        kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR_INGEN',
                        navn: 'Nei, evnen er nedsatt med mindre enn 20 prosent for hele perioden',
                        underspørsmål: [],
                    },
                ],
            },
        ],
    },
    {
        kode: 'ARBEIDSREISER',
        beskrivelse: 'Tilskott til arbeidsreiser',
        kategori: 'generelle_bestemmelser',
        underspørsmål: [],
    },
]
