import { z } from 'zod'

// Basert på Maybe<T> = T | null | undefined
const maybeString = z.string().nullable().optional()

export const vilkårshjemmelSchema = z.object({
    lovverk: z.string(),
    lovverksversjon: z.string(), // evt. valider som datoformat om ønskelig
    paragraf: z.string(),
    ledd: maybeString,
    setning: maybeString,
    bokstav: maybeString,
})

export const årsakSchema = z.object({
    kode: z.string(),
    beskrivelse: z.string(),
    vilkårshjemmel: vilkårshjemmelSchema.optional(), // noen Årsak-er har dette
})
export type Årsak = z.infer<typeof årsakSchema>

export const vilkårSchema = z.object({
    vilkårshjemmel: vilkårshjemmelSchema,
    vilkårskode: z.string(),
    beskrivelse: z.string(),
    mulige_resultater: z.object({
        OPPFYLT: z.array(årsakSchema),
        IKKE_OPPFYLT: z.array(årsakSchema),
        IKKE_RELEVANT: z.array(årsakSchema).optional(),
    }),
})

export type Vilkår = z.infer<typeof vilkårSchema>
export type Vilkårshjemmel = z.infer<typeof vilkårshjemmelSchema>

// Hele kodeverket
export const kodeverkSchema = z.array(vilkårSchema)
export type Kodeverk = z.infer<typeof kodeverkSchema>

export const kodeverk: Kodeverk = [
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
        beskrivelse: 'En ytelse gis for opptil tre måneder før den måneden da kravet ble satt fram',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'INNEN_TRE_MÅNEDER',
                    beskrivelse: 'Søknad fremsatt i tide',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'IKKE_INNEN_TRE_MÅNEDER',
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
        beskrivelse: 'Personer som er bosatt i Norge, er pliktige medlemmer i folketrygden',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'en_kode',
                    beskrivelse: 'Er medlem i folketrygden',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'en_annen_kode',
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
        beskrivelse: 'Arbeidsufør',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'en_kode',
                    beskrivelse: 'Er arbeidsufør',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'en_annen_kode',
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
        beskrivelse: 'Opptjeningstid',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'hovedregel',
                    beskrivelse: 'Har arbeidet i 28 dager før arbeidsuførhet inntreffer',
                },
                {
                    kode: 'annen ytelse',
                    beskrivelse:
                        'Har mottatt dagpenger, omsorgspenger, pleiepenger, opplæringspenger, svangerskapspenger eller foreldrepenger',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'ikke arbeidet',
                    beskrivelse: 'Har ikke arbeidet i 28 dager før arbeidsuførhet inntreffer',
                },

                {
                    kode: 'aap før foreldrepenger',
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
                    kode: 'fisk',
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
                    kode: 'mil',
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
                    kode: 'yrk',
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
        beskrivelse: 'Har opparbeidet minste inntekt (1/2G) - inntektsgrunnlaget',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'en_kode',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'en_annen_kode',
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
        beskrivelse: 'Har tapt pensjonsgivende inntekt på grunn av arbeidsuførhet',
        mulige_resultater: {
            OPPFYLT: [
                {
                    kode: 'en_kode',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
            IKKE_OPPFYLT: [
                {
                    kode: 'en_annen_kode',
                    beskrivelse: 'Her må det stå noe',
                },
            ],
        },
    },
]
