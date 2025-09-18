import { type Beregningsregelverk } from '@/schemas/beregningsregler'

export const lokalUtviklingBeregningsregler: Beregningsregelverk = [
    {
        kode: 'ARBEIDSTAKER_100',
        beskrivelse: 'Til arbeidstakere ytes det sykepenger med 100 prosent av sykepengegrunnlaget',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1997-05-01',
            kapittel: '8',
            paragraf: '16',
            ledd: '1',
            setning: null,
            bokstav: null,
        },
    },
    {
        kode: 'FRILANSER_100',
        beskrivelse: 'Til en frilanser ytes det sykepenger med 100 prosent av sykepengegrunnlaget',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1997-05-01',
            kapittel: '8',
            paragraf: '38',
            ledd: '1',
            setning: '1',
            bokstav: null,
        },
    },
    {
        kode: 'ORDINAER_SELVSTENDIG_80',
        beskrivelse: 'Til en selvstendig næringsdrivende ytes det sykepenger med 80 prosent av sykepengegrunnlaget',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1997-05-01',
            kapittel: '8',
            paragraf: '35',
            ledd: '1',
            setning: '',
            bokstav: null,
        },
    },
    {
        kode: 'ORDINAER_SELVSTENDIG_NAVFORSIKRING_100',
        beskrivelse:
            'En selvstendig næringsdrivende kan mot særskilt premie tegne forsikring som kan omfatte sykepenger med 100 prosent av sykepengegrunnlaget fra 17. sykedag eller sykepenger med 100 prosent av sykepengegrunnlaget fra første sykedag',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1999-10-01',
            kapittel: '8',
            paragraf: '36',
            ledd: '1',
            setning: null,
            bokstav: 'b-c',
        },
    },
    {
        kode: 'SELVSTENDIG_KOLLEKTIVFORSIKRING_100',
        beskrivelse: 'Spesielle yrkesgrupper kan tegne kollektiv forsikring (jordbruker, reindriftsutøver og fisker)',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '1999-10-01',
            kapittel: '8',
            paragraf: '36',
            ledd: '4',
            setning: null,
            bokstav: null,
        },
    },
    {
        kode: 'INAKTIV_65',
        beskrivelse:
            'For yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid og som fremdeles er ute av inntektsgivende arbeid utgjør sykepengene 65 prosent av sykepengegrunnlaget',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2020-01-01',
            kapittel: '8',
            paragraf: '47',
            ledd: '6',
            setning: '2',
            bokstav: null,
        },
    },
    {
        kode: 'INAKTIV_100',
        beskrivelse:
            'For yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid og som er i arbeid uten å fylle vilkåret i § 8-2 om fire ukers opptjeningstid utgjør sykepengene 100 prosent av sykepengegrunnlaget',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2020-01-01',
            kapittel: '8',
            paragraf: '47',
            ledd: '6',
            setning: '3',
            bokstav: null,
        },
    },
    {
        kode: 'DAGPENGEMOTTAKER_100',
        beskrivelse: 'Medlemmer med dagpenger under arbeidsløshet eller ventelønn m.m',
        vilkårshjemmel: {
            lovverk: 'Folketrygdloven',
            lovverksversjon: '2024-12-20',
            kapittel: '8',
            paragraf: '49',
            ledd: '3',
            setning: '1',
            bokstav: null,
        },
    },
]
