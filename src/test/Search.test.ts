import { EsValue, minifyValues } from '../reducers/search';
import { MAX_AMOUNT_RANGE_BUCKETS } from '../constants/global';

describe('Search reducer helper tests', () => {
    it('minifies values properly', () => {
        const values: EsValue[] = [
            { name: '1124', count: 12 },
            { name: '1625', count: 24 },
            { name: '1825', count: 13 },
            { name: '1875', count: 2422 },
            { name: '1899', count: 24 },
            { name: '1925', count: 2411 },
            { name: '1995', count: 24 },
            { name: '2010', count: 24 },
            { name: '2011', count: 241 },
            { name: '2013', count: 124 },
            { name: '2026', count: 214 },
            { name: '2036', count: 1124 },
            { name: '2070', count: 24 }
        ];

        const minified = minifyValues(values);

        expect(minified[5].name).toBe('1714');
        expect(minified[9].count).toBe(24);
        expect(minified.length).toBe(MAX_AMOUNT_RANGE_BUCKETS);
    });
});
