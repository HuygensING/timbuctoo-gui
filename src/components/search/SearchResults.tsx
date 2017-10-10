import React, { SFC } from 'react';
import translate from '../../services/translate';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';
import { SummaryProperties } from '../../typings/schema';
import { getValue } from '../../services/getValue';

interface Props {
    dataSetId: string;
    collectionId: string | null;
    properties: SummaryProperties | null;
    fields: {[name: string]: string | null};
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

const SearchResults: SFC<Props> = ({ results, properties, collectionId, dataSetId, fields }) => {

    if (!properties || !collectionId) {
        return null;
    }

    const setValue = (val: string | null, result: any): string | null => {
        if (val && result && result[val]) {
            const valueObj = result[val];
            return getValue(valueObj);
        }

        return null;
    };

    const renderEntries = (result: any, idx: number) => {
        const imageUrl = setValue(fields.image, result);
        const description = setValue(fields.description, result);
        const title = setValue(fields.title, result);

        return (
            <SearchResultEntry
                key={idx}
                imageUrl={imageUrl}
                title={title}
                uri={result.uri}
                description={description}
                collectionId={collectionId}
                dataSetId={dataSetId}
            />
        );
    };

    return (
        <GridSection title={translate('globals.results')} cols={1} gridSize={27} gridOffset={0} colSizeOffset={1}>
            {results.map(renderEntries)}
        </GridSection>
    );
};

export default SearchResults;