import React, { SFC } from 'react';
import translate from '../../services/translate';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';
import { Property } from '../../typings/schema';

interface Props {
    dataSetId: string;
    collectionId: string | null;
    propertyMetadata: Property[];
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

const SearchResults: SFC<Props> = ({ results, propertyMetadata, collectionId, dataSetId }) => {
    if (!collectionId) {
        return null;
    }

    const renderEntries = (result: any, idx: number) => {
        return (
            <SearchResultEntry
                key={idx}
                image={result.image ? result.image.value : null}
                title={result.title ? result.title.value : null}
                description={result.description ? result.description.value : null}
                uri={result.uri}
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
