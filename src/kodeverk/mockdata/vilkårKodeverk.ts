import { type Kodeverk } from '@/schemas/kodeverk'

export const lokalUtviklingKodeverk: Kodeverk = [
    {
        vilkårshjemmel: {
            lovverk: 'folketrygdloven',
            lovverksversjon: '1997-02-28',
            kapittel: '8',
            paragraf: '8-2',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'OPPTJENINGSTID',
        beskrivelse: 'Opptjeningstid - Minst fire uker i arbeid umiddelbart før arbeidsuførhet',
        oppfylt: [
            {
                kode: 'OPPTJENING_HOVEDREGEL',
                beskrivelse: 'Minst fire uker i arbeid umiddelbart før arbeidsuførhet',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-2',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
            {
                kode: 'OPPTJENING_ANNEN_YTELSE',
                beskrivelse: 'Mottak av ytelse som er likestilt med arbeid',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-2',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
        ikkeOppfylt: [
            {
                kode: 'OPPTJENING_IKKE_OPPFYLT',
                beskrivelse: 'Ikke minst fire uker i arbeid umiddelbart før arbeidsuførhet',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-2',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
        sistEndretAv: 'Kari Hansen',
        sistEndretDato: '2024-01-20T14:45:00Z',
    },
    {
        vilkårshjemmel: {
            lovverk: 'folketrygdloven',
            lovverksversjon: '1997-02-28',
            kapittel: '8',
            paragraf: '8-3',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'ARBEIDSUFORHET',
        beskrivelse: 'Arbeidsuførhet - Arbeidsufør på grunn av sykdom eller skade',
        oppfylt: [
            {
                kode: 'ARBEIDSUFORHET_OPPFYLT',
                beskrivelse: 'Arbeidsufør på grunn av sykdom eller skade',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-3',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
        ikkeOppfylt: [
            {
                kode: 'ARBEIDSUFORHET_IKKE_OPPFYLT',
                beskrivelse: 'Ikke arbeidsufør på grunn av sykdom eller skade',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-3',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
        sistEndretAv: 'Per Olsen',
        sistEndretDato: '2024-01-18T09:15:00Z',
    },
    {
        vilkårshjemmel: {
            lovverk: 'folketrygdloven',
            lovverksversjon: '1997-02-28',
            kapittel: '8',
            paragraf: '8-4',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
        vilkårskode: 'INNTEKTSTAP',
        beskrivelse: 'Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
        oppfylt: [
            {
                kode: 'INNTEKTSTAP_OPPFYLT',
                beskrivelse: 'Tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-4',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
        ikkeOppfylt: [
            {
                kode: 'INNTEKTSTAP_IKKE_OPPFYLT',
                beskrivelse: 'Ikke tap av pensjonsgivende inntekt på grunn av arbeidsuførhet',
                vilkårshjemmel: {
                    lovverk: 'folketrygdloven',
                    lovverksversjon: '1997-02-28',
                    kapittel: '8',
                    paragraf: '8-4',
                    ledd: '1',
                    setning: null,
                    bokstav: null,
                },
            },
        ],
    },
]
