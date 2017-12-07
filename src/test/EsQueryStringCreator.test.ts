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
        const filters: Readonly<EsFilter[]> = [
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
                values: [
                    {
                        name: 'bucket 1',
                        count: 3,
                        selected: true
                    },
                    {
                        name: 'bucket 2',
                        count: 3,
                        selected: false
                    },
                    {
                        name: 'bucket 3',
                        count: 16,
                        selected: true
                    }
                ]
            }
        ];
        const expectation =
            '{"bool":{"must":[{"bool":{"should":[{"match":{"firstValue.secondValue.value.raw":"value 1"}},{"match":{"thirdValue.items.fourthValue.value.raw":"value 1"}}]}},{"bool":{"should":[{"range":{"firstValue.secondValue.value.raw":{"gt":"0","lt":"2"},"sixthValue.value.raw":{"gt":"0","lt":"2"}}}]}}]}}';

        expect(createEsQueryString(filters, FullText)).toBe(expectation);
    });
});
