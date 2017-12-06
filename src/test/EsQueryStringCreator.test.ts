import { EsFilter, FullTextSearch } from '../reducers/search';
import { createEsQueryString } from '../services/EsQueryStringCreator';
import { FACET_TYPE } from '../constants/forms';

describe('Elastic search string creators', () => {
    it('handles null', () => {
        const filters: Readonly<EsFilter[]> = [];
        const expectation = null;
        const FullText: FullTextSearch = {
            collection: '',
            dataset: '',
            filter: ''
        };
        expect(createEsQueryString(filters, FullText)).toBe(expectation);
    });

    it('creates the string accordingly', () => {
        const filters: Readonly<EsFilter[]> = [
            {
                type: FACET_TYPE.multiSelect,
                caption: 'example multiselect',
                paths: ['path1', 'path2'],
                values: [
                    {
                        name: 'path1',
                        count: 4,
                        selected: true
                    },
                    {
                        name: 'path2',
                        count: 2
                    }
                ]
            },
            {
                type: FACET_TYPE.dateRange,
                caption: 'example dateRange',
                paths: ['path2', 'path3'],
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
            '{"bool":{"must":[{"bool":{"should":[{"match":{"path1.raw":"path1"}},{"match":{"path2.raw":"path1"}}]}},{"bool":{"should":[{"range":{"path2.raw":{"gt":"0","lt":"2"},"path3.raw":{"gt":"0","lt":"2"}}}]}}]}}';
        const FullText: FullTextSearch = {
            collection: '',
            dataset: '',
            filter: ''
        };
        expect(createEsQueryString(filters, FullText)).toBe(expectation);
    });
});
