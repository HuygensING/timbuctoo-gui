import React, { SFC } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';
import { SummaryProperties } from '../../typings/timbuctoo/schema';
import getValue from '../../services/getValue';

interface Props {
    dataSetId: string;
    collectionId: string;
    properties: SummaryProperties;
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

const SearchResults: SFC<Props> = ({ results, properties, collectionId, dataSetId }) => {

    const renderEntries = (result: any, idx: number) => {
        const imageUrl = getValue(properties.image);
        const title = getValue(properties.title);
        const description = getValue(properties.description);

        return  (
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