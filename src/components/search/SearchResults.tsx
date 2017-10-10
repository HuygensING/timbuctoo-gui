import React, { SFC } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';
import { SummaryProperties } from '../../typings/timbuctoo/schema';
import { getValue } from '../../services/getValue';

interface Props {
    dataSetId: string;
    collectionId: string;
    properties: SummaryProperties;
    fields: {[name: string]: string | null};
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

const SearchResults: SFC<Props> = ({ results, properties, collectionId, dataSetId, fields }) => {

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
        <GridSection title={Translations.translate('globals.results')} cols={1} gridSize={27} gridOffset={0} colSizeOffset={1}>
            {results.map(renderEntries)}
        </GridSection>
    );
};

export default SearchResults;