import { type HovedspørsmålArray } from '@/schemas/saksbehandlergrensesnitt'

export const saksbehandlerUi: HovedspørsmålArray = [
    {
        kode: 'ab787988-5774-4aa1-8586-49251f459769',
        beskrivelse: 'Frist for framsetting av krav',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 22-13',
        underspørsmål: [
            {
                kode: 'fa4941fa-1b19-4a86-abdc-9c91e33178bb',
                navn: 'Er vilkåret oppfylt for hele eller deler av perioden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'efdcd5d4-9df5-4e63-ba9a-b97cab307442',
                        navn: 'Ja, for hele perioden',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'c4a33c5d-941d-4279-a5cb-4f4a0d55908b',
                                navn: 'Velg begrunnelse',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_MAANEDER',
                                        navn: 'Søkt innen tre måneder før den måneden søknaden ble sendt (se på formulering)',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_UTEAVSTAND',
                                        navn: 'Søkt innen tre år, ikke vært i stand til å søke tidligere',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'KRAV_FRAMSATT_INNEN_TRE_AAR_OPPLYSNINGER',
                                        navn: 'Søkt innen tre år, misvisende opplysninger',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: 'KRAV_IKKE_RETTIDIG_FRAMSATT',
                        navn: 'Nei, kravet er ikke framsatt rettidig for hele eller deler av perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-12-04T13:26:35.174Z',
    },
    {
        kode: 'e40375fa-d0a5-4a68-a90a-9e145a0a63b4',
        beskrivelse: 'Medlemskap i folketrygden',
        kategori: 'generelle_bestemmelser',
        paragrafTag: 'Kapittel 2',
        underspørsmål: [
            {
                kode: '86f6875b-0e0b-41a8-856f-0454b9f7c693',
                navn: 'Er den sykmeldte medlem i folketrygden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'MEDLEMSKAP_JA',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'MEDLEMSKAP_NEI',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:04.434Z',
    },
    {
        kode: 'afe35fff-7cbc-46b8-8311-07bdcb67009b',
        beskrivelse: 'Opptjeningstid',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-2',
        underspørsmål: [
            {
                kode: '81618640-755e-4c23-92c0-0806d05faa5b',
                navn: 'Oppfyller vilkår om opptjeningstid',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'OPPTJENING_MINST_4_UKER',
                        navn: 'Ja, minst fire uker i arbeid umiddelbart før arbeidsuførhet',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'ab6e09a4-e770-4a0d-a63c-872f640b8b1a',
                        navn: 'Ja, andre årsaker',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'ffe3cf76-3184-4b29-a898-74bf57e529e8',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'OPPTJENING_ANNEN_YTELSE',
                                        navn: 'Mottak av ytelse som er likestilt med arbeid',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_YRKESAKTIV_FOER_FORELDREPENGER',
                                        navn: 'Forutgående foreldrepenger opptjent på grunnlag av arbeidsavklaringspenger, men personen har vært sammenhengende yrkesaktiv (eller mottatt ytelse etter kapittel 8, 9 eller 14) i minst fire uker umiddelbart før uttaket av foreldrepenger startet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_COVID',
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
                                kode: '1a6009f6-d47a-4698-b846-c5c218e39585',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'IKKE_OPPTJENING_ARBEID_ELLER_YTELSE',
                                        navn: 'Ikke arbeid eller likestilt ytelse umiddelbart før arbeidsuførhet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'OPPTJENING_AAP_FOR_FORELDREPENGER',
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
                                kode: 'e11fe53b-4fc4-4dbb-9b42-ad96cb98ea49',
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
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:16.637Z',
    },
    {
        kode: '1edc2c94-65f0-4bd4-83dd-43b36ce43cc5',
        beskrivelse: 'Tap av pensjonsgivende inntekt og minsteinntekt',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-3',
        underspørsmål: [
            {
                kode: 'e08bf756-59ad-4f38-87e6-bdf67bb027c8',
                navn: 'Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'TAPTINNTEKT',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'IKKE_TAPTINNTEKT',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
            {
                kode: '16afb38e-f4c4-400a-9c3f-67f3e4de7c25',
                navn: 'Sykepengegrunnlaget utgjør minst 50 prosent av grunnbeløpet',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'MINSTEINNTEKT',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'IKKE_MINSTEINNTEKT',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
            {
                kode: 'd122ee9a-2fd6-4483-989a-b837ef5f3bf1',
                navn: 'Spesielle avslagsgrunner',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'MAXALDER',
                        navn: 'Fylt 70 år',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'AVSLUTTET_AKTIVITET',
                        navn: 'Trukket seg tilbake fra arbeidslivet',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:23.876Z',
    },
    {
        kode: 'afb2d485-1360-4f95-badc-faa9a50c0682',
        beskrivelse: 'Arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-4',
        underspørsmål: [
            {
                kode: '82da88f3-bcf5-420f-9fda-4d1a8fdd10b0',
                navn: 'Er vilkåret om arbeidsuførhet oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'ARBUFOR_FUNK',
                        navn: 'Ja, arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: '04999541-b6b3-4e25-9969-5021ec06b795',
                        navn: 'Ja, andre årsaker',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'ARBEIDSUFØRHET_JA_ALTERNATIVER',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'ARBUFOR_INSTITUSJON',
                                        navn: 'Innlagt i en godkjent helseinstitusjon',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_BEHANDLING',
                                        navn: 'Under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_TILTAK',
                                        navn: 'Deltar på et arbeidsrettet tiltak',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_TILSKOTT',
                                        navn: 'På grunn av sykdom, skade eller lyte får tilskott til opplæringstiltak etter § 10-7 tredje ledd',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_KONTROLL',
                                        navn: 'Nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_SMITTE',
                                        navn: 'Myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_SVANGERSKAPSAVBRUDD',
                                        navn: 'Arbeidsufør som følge av svangerskapsavbrudd',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_BARNLOSHET',
                                        navn: 'Arbeidsufør som følge av behandling for barnløshet',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_DONOR',
                                        navn: 'Donor eller er under vurdering som donor',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_STERILISERING',
                                        navn: 'Arbeidsufør som følge av behandling i forbindelse med sterilisering',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_KOSM',
                                        navn: 'Medisinsk begrunnet kosmetisk inngrep',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: '02412c53-a51b-4461-a815-d1a84664377a',
                        navn: 'Nei',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '366d28fd-310b-42c1-8dd2-60ef6b91c1a5',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'IKKE_ARBUFOR_FUNK',
                                        navn: 'Ikke arbeidsufør på grunn av en funksjonsnedsettelse som klart skyldes sykdom eller skade',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ARBUFOR_KOSM_IKKE_MEDISINSK',
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
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:33.071Z',
    },
    {
        kode: 'a50527a0-95ec-41d1-b029-b5d957505c0d',
        beskrivelse: 'Sykepenger ved friskmelding til arbeidsformidling',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-5',
        underspørsmål: [
            {
                kode: 'd4af097d-c1b4-4511-8d6c-b892f3ea6fd7',
                navn: 'Er vilkårene oppfylt?',
                variant: 'CHECKBOX',
                alternativer: [
                    {
                        kode: 'HAR_SAGT_OPP',
                        navn: 'Et eventuelt arbeidsforhold har opphørt',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'ER_ARBEIDSSOEKER',
                        navn: 'Den sykmeldte har meldt seg som arbeidssøker',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:42.002Z',
    },
    {
        kode: 'd79c0628-512b-404d-9277-3e5620c90da2',
        beskrivelse: 'Dokumentasjon av arbeidsuførhet',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-7',
        underspørsmål: [
            {
                kode: '8e18daa0-c67e-4b5e-aca8-3497e63126c7',
                navn: 'Tilbakedatering',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'ARBEIDSUFOR_TILBAKEDATERING_GODKJENT',
                        navn: 'Tilbakedatering godkjent',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'TILBAKEDATERING_IKKE_GODKJENT',
                        navn: 'Tilbakedatering ikke godkjent',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:48.754Z',
    },
    {
        kode: '2cb89e63-69ee-4926-9208-d0a100fcc6d4',
        beskrivelse: 'Medlemmets medvirkning',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-8',
        underspørsmål: [
            {
                kode: '03c7ac25-aef9-4864-896b-765e07a6d4ec',
                navn: 'Oppfyller den sykmeldte medvirkningsplikten?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'MEDVIRKNING_OPPFYLT',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'MEDVIRKNING_IKKE_OPPFYLT',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:16:54.639Z',
    },
    {
        kode: 'OPPHOLDSKRAV',
        beskrivelse: 'Oppholdskrav',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-9',
        underspørsmål: [
            {
                kode: '80c22f9f-44e3-4b5f-b98f-aeb7c23f0618',
                navn: 'Er vilkårene oppfylt?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: '368b2285-87aa-4c9e-b8c5-6d784354282b',
                        navn: 'Ja',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '11ab26dc-99ec-4198-9778-aa920c2b303d',
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'GODKJENT_OPPHOLD_UTENFOR_EOS',
                                        navn: 'Ja, den sykmeldte har oppholdt seg utenfor EØS og har fått oppholdet godkjent av Nav',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'GODKJENT_OPPHOLD_UTENFOR_NORGE',
                                        navn: 'Ja, den sykmeldte har oppholdt seg utenfor Norge og har fått oppholdet godkjent av Nav',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        kode: '2d04d571-fd4b-45d0-a8b5-3ed76ea5bfa6',
                        navn: 'Nei',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'db2cb139-151a-4301-9000-fd328b90323d',
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'IKKE_SOKT_OM_OPPHOLD_UTENFOR_EOS',
                                        navn: 'Nei, den sykmeldte har ikke søkt om å få beholde sykepengene under opphold utenfor EØS',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'IKKE_RETT_TIL_OPPHOLD_UTENFOR_EOS',
                                        navn: 'Nei, den sykmeldte har søkt om å få beholde sykepengene under opphold utenfor EØS, men har fått avslag',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'IKKE_SOKT_OM_OPPHOLD_UTENFOR_NORGE',
                                        navn: 'Nei, den sykmeldte har ikke søkt om å få beholde sykepengene under opphold utenfor Norge',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'IKKE_RETT_TIL_OPPHOLD_UTENFOR_NORGE',
                                        navn: 'Nei, den sykmeldte har søkt om å få beholde sykepengene under opphold utenfor Norge, men har fått avslag',
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
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:00.972Z',
    },
    {
        kode: 'SYKEPENGEDAGER_IGJEN',
        beskrivelse: 'Antall sykepengedager',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-12',
        underspørsmål: [
            {
                kode: 'SYKEPENGEDAGER_IGJEN_ALTERNATIVER',
                navn: 'Har personen flere sykepengedager igjen?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'DAGER_IGJEN',
                        navn: 'Ja, dager igjen for hele perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'DAGER_IGJEN_NEI',
                        navn: 'Nei, ikke dager igjen for hele eller deler av perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:07.920Z',
    },
    {
        kode: 'GRADERTE_SYKEPENGER',
        beskrivelse: 'Graderte sykepenger',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-13',
        underspørsmål: [
            {
                kode: 'GRADERTE_SYKEPENGER_ARBEIDSUFØR',
                navn: 'Er den sykmeldte minst 20 prosent arbeidsufør?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'ARBEIDSUFOR_20_ELLER_MER',
                        navn: 'Ja, for hele perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'ARBEIDSUFOR_MINDRE_ENN_20',
                        navn: 'Nei, for hele eller deler av perioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:17.175Z',
    },
    {
        kode: 'ARBEIDSREISER',
        beskrivelse: 'Tilskott til arbeidsreiser',
        kategori: 'generelle_bestemmelser',
        paragrafTag: '§ 8-14',
        underspørsmål: [
            {
                kode: 'b149fa3f-8143-4660-abf8-d9f92f231208',
                navn: 'Har den sykmeldte rett til reisetilskudd?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'REISETILSKUDD_OPPFYLT',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'REISETILSKUDD_IKKE_OPPFYLT',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:23.473Z',
    },
    {
        kode: '589381f7-c5e4-4c7e-b3f1-c8471e5703ce',
        beskrivelse: 'Sykepenger fra trygden',
        kategori: 'arbeidstakere',
        paragrafTag: '§ 8-17',
        underspørsmål: [
            {
                kode: 'f223060e-6f85-4a38-82dc-332c0cd63a08',
                navn: 'Utbetaler Nav sykepenger?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'SYKEPENGER_TRYGDEN_AGUT',
                        navn: 'Ja, Nav utbetaler sykepenger etter utløpet av arbeidsgiverperioden',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'd74dfdaa-0640-4909-a7e4-f5d6aaca2251',
                        navn: 'Ja, Nav utbetaler sykepenger også i de 16 første dagene',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '3ca1cef5-c4c0-4775-bd16-c96098746369',
                                navn: 'Alternativer',
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'SYKEPENGER_TRYGDEN_IKKEARB',
                                        navn: 'Arbeidsgiver er ikke forpliktet etter § 8-18',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'SYKEPENGER_TRYGDEN_STREIK_LOCKOUT',
                                        navn: 'Under streik eller lockout',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'SYKEPENGER_TRYGDEN_KONTROLL',
                                        navn: 'Under nødvendig kontrollundersøkelse som krever minst 24 timers fravær',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'SYKEPENGER_TRYGDEN_DONOR',
                                        navn: 'Når arbeidstakeren er donor',
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
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:29.816Z',
    },
    {
        kode: '8a7622c9-f305-4d56-8aae-14eb9a1d94a5',
        beskrivelse: 'Trygdens ansvar når arbeidsgiveren ikke betaler',
        kategori: 'arbeidstakere',
        paragrafTag: '§ 8-22',
        underspørsmål: [
            {
                kode: '4627f248-0b3c-40a7-a85e-19c58de4c9b6',
                navn: 'Forskutter Nav sykepenger i arbeidsgiverperioden?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'NAV_FORSKUTTERER_AGPERIODEN',
                        navn: 'Ja',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                    {
                        kode: 'NAV_FORSKUTTERER_IKKE_AGPERIODEN',
                        navn: 'Nei',
                        harUnderspørsmål: false,
                        underspørsmål: [],
                    },
                ],
            },
        ],
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-10-09T06:17:37.193Z',
    },
    {
        kode: 'ba5019eb-ee9d-475d-8d08-3ff9fbfa9896',
        beskrivelse: 'Yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid',
        kategori: 'særskilte_grupper',
        paragrafTag: '§ 8-47',
        underspørsmål: [
            {
                kode: '5635008c-b025-445c-ab6f-4e265f1f4d12',
                navn: 'Oppfyller den sykmeldte vilkårene for å regnes som å ha vært midlertidig ute av inntektsgivende arbeid?',
                variant: 'RADIO',
                alternativer: [
                    {
                        kode: 'c4b9abbc-60d6-4fca-82c7-6d64ec0232f5',
                        navn: 'Ja, og den sykmeldte er fremdeles ute av arbeid (bokstav a)',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'dde65df8-f81d-47c3-9a88-b5f4412f0b07',
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'UTE_AV_ARBEID_SISTE_JOBB',
                                        navn: 'Den sykmeldte har vært ute av inntektsgivende arbeid i mindre enn en måned og har tidligere opptjening etter § 8-2',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: '71e8fe8b-363d-4099-ae5d-6c40ebe27c15',
                                        navn: 'Den sykmeldte har vært i aktivitet likestilt med arbeid, har vært ute av inntektsgivende arbeid i mindre enn en måned og har tidligere opptjening etter § 8-2',
                                        harUnderspørsmål: true,
                                        underspørsmål: [
                                            {
                                                kode: 'f3200d4a-c147-4bda-a8d6-080df5dfe9f3',
                                                navn: null,
                                                variant: 'RADIO',
                                                alternativer: [
                                                    {
                                                        kode: 'UTE_AV_ARBEID_ANNEN_YTELSE',
                                                        navn: 'Mottatt en ytelse til livsopphold etter kapitlene 4, 8, 9 eller 14',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_MLTJ',
                                                        navn: 'Utført militærtjeneste',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_SKIP_FRITID',
                                                        navn: 'Arbeidstaker på skip i utenriksfart som har avspasert opparbeidet fritid',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_FERIE',
                                                        navn: 'Har hatt lovbestemt ferie',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_PERMISJON_AVTALE',
                                                        navn: 'Har hatt lovbestemt permisjon etter arbeidsmiljøloven §§ 12-1 til 12-5 dersom vedkommende har avtale om å gjenoppta arbeidet etter permisjonen',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        kode: 'b9c870ef-e657-4d20-9b00-6d1ce8796609',
                                        navn: 'Den sykmeldte har utvidet frist på grunn av sluttvederlag, etterlønn eller utdanningspermisjon',
                                        harUnderspørsmål: true,
                                        underspørsmål: [
                                            {
                                                kode: '6e60eb69-f714-44c5-855e-2570371f61a2',
                                                navn: null,
                                                variant: 'RADIO',
                                                alternativer: [
                                                    {
                                                        kode: 'UTE_AV_ARBEID_SLUTTVEDERLAG_ETTERLONN',
                                                        navn: 'Den sykmeldte mottar eller har mottatt sluttvederlag eller etterlønn (frist seks måneder)',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_UTDANNINGSPERMISJON',
                                                        navn: 'Den sykmeldte var i utdanningspermisjon på sykmeldingstidspunktet og utdanningen ble avbrutt på grunn av sykdom (frist 12 måneder)',
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
                        kode: '5ba0ae0a-c4c0-41e5-b633-03bd038c6e17',
                        navn: 'Ja, og er i arbeid uten å oppfylle vilkåret i § 8-2 om fire ukers opptjeningstid (bokstav b)',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: '0948f74e-cbeb-48fb-be28-706573c88994',
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'I_ARBEID_UTEN_OPPTJENNING',
                                        navn: 'Den sykmeldte har vært ute av inntektsgivende arbeid i mindre enn en måned, er i arbeid uten å oppfylle vilkåret i § 8-2 om fire ukers opptjening og har tidligere opptjening etter § 8-2',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'ade941e1-6ab9-4ed8-b53e-4c65cbbcee4f',
                                        navn: 'Den sykmeldte har vært i aktivitet likestilt med arbeid, har vært ute av inntektsgivende arbeid i mindre enn en måned og har tidligere opptjening etter § 8-2',
                                        harUnderspørsmål: true,
                                        underspørsmål: [
                                            {
                                                kode: '1bcfd5b7-fb14-4b9b-8434-f0da72748429',
                                                navn: null,
                                                variant: 'RADIO',
                                                alternativer: [
                                                    {
                                                        kode: 'UTE_AV_ARBEID_ANNEN_YTELSE',
                                                        navn: 'Mottatt en ytelse til livsopphold etter kapitlene 4, 8, 9 eller 14',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_MLTJ',
                                                        navn: 'Utført militærtjeneste',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_SKIP_FRITID',
                                                        navn: 'Arbeidstaker på skip i utenriksfart som har avspasert opparbeidet fritid',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_FERIE',
                                                        navn: 'Har hatt lovbestemt ferie',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_PERMISJON_AVTALE',
                                                        navn: 'Har hatt lovbestemt permisjon etter arbeidsmiljøloven §§ 12-1 til 12-5 dersom vedkommende har avtale om å gjenoppta arbeidet etter permisjonen',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        kode: '37c08c4e-f13e-402c-a5ae-e6be92e905a8',
                                        navn: 'Den sykmeldte har utvidet frist på grunn av sluttvederlag, etterlønn eller utdanningspermisjon',
                                        harUnderspørsmål: true,
                                        underspørsmål: [
                                            {
                                                kode: '0b2a1aeb-4464-4650-8768-b89409ef09ab',
                                                navn: null,
                                                variant: 'RADIO',
                                                alternativer: [
                                                    {
                                                        kode: 'UTE_AV_ARBEID_SLUTTVEDERLAG_ETTERLONN',
                                                        navn: 'Den sykmeldte mottar eller har mottatt sluttvederlag eller etterlønn (frist seks måneder)',
                                                        harUnderspørsmål: false,
                                                        underspørsmål: [],
                                                    },
                                                    {
                                                        kode: 'UTE_AV_ARBEID_UTDANNINGSPERMISJON',
                                                        navn: 'Den sykmeldte var i utdanningspermisjon på sykmeldingstidspunktet og utdanningen ble avbrutt på grunn av sykdom (frist 12 måneder)',
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
                        kode: '5da32ce9-7d7f-4107-adc4-00696524b18d',
                        navn: 'Nei (avslag)',
                        harUnderspørsmål: true,
                        underspørsmål: [
                            {
                                kode: 'bb329b69-780e-49ec-9167-5769c1e1bbed',
                                navn: null,
                                variant: 'RADIO',
                                alternativer: [
                                    {
                                        kode: 'UTE_AV_ARBEID_FOR_LENGE',
                                        navn: 'Den sykmeldte har vært ute av inntektsgivende arbeid i mer enn en måned',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'UTE_AV_ARBEID_MER_ENN_6MND',
                                        navn: 'Den sykmeldte har mottatt eller mottar sluttvederlag eller etterlønn, men er utenfor fristen på opptil seks måneder',
                                        harUnderspørsmål: false,
                                        underspørsmål: [],
                                    },
                                    {
                                        kode: 'UTE_AV_ARBEID_MER_ENN_1AAR',
                                        navn: 'Den sykmeldte  var i utdanningspermisjon på sykmeldingstidspunktet, men er utenfor fristen på opptil tolv måneder',
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
        sistEndretAv: 'Redacted Redactesen',
        sistEndretDato: '2025-12-10T11:32:52.904Z',
    },
]
