import { EsFilter, FullTextSearch } from '../reducers/search';
import { createEsQueryString } from '../services/EsQueryStringCreator';
import { FACET_TYPE } from '../constants/forms';

describe('Elasticsearch string creator', () => {
    const FullText: FullTextSearch = {
        collection: '',
        dataset: '',
        filter: ''
    };

    it('handles null', () => {
        const filters: Readonly<EsFilter[]> = [];
        expect(createEsQueryString(filters, FullText)).toBe(null);
    });

    it('creates the string accordingly', () => {
        const filters: EsFilter[] = [
            {
                type: FACET_TYPE.multiSelect,
                caption: 'example multiselect',
                paths: [
                    'collectionList||firstValue.otherCollection||secondValue.Value||value',
                    'collectionList||thirdValue.ITEMS||items.otherCollection||fourthValue.VALUE||value'
                ],
                values: [
                    {
                        name: 'value 1',
                        count: 4,
                        selected: true
                    },
                    {
                        name: 'value 2',
                        count: 2
                    }
                ]
            },
            {
                type: FACET_TYPE.dateRange,
                caption: 'example dateRange',
                paths: [
                    'collectionList||firstValue.otherCollection||secondValue.VALUE||value',
                    'collectionList||sixthValue.VALUE||value'
                ],
                range: {
                    lt: 3,
                    gt: 0,
                    all: false
                },
                values: [
                    {
                        name: '1',
                        count: 3,
                        selected: true
                    },
                    {
                        name: '2',
                        count: 3,
                        selected: false
                    },
                    {
                        name: '3',
                        count: 16,
                        selected: true
                    }
                ]
            }
        ];
        const expectation =
            '{"bool":{"must":[{"bool":{"should":[{"match":{"firstValue.secondValue.value.raw":"value 1"}},{"match":{"thirdValue.items.fourthValue.value.raw":"value 1"}}]}},{"bool":{"should":[{"range":{"firstValue.secondValue.value.raw":{"lt":"4","gt":"1"},"sixthValue.value.raw":{"lt":"4","gt":"1"}}}]}}]}}';
        expect(createEsQueryString(filters, FullText)).toBe(expectation);
    });
});
