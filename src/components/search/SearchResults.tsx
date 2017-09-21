import React, { SFC } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';

interface Props {
    datasetId: string;
    collectionId: string;
    properties: {
        title: string;
        description: string | null;
        image: string | null;
    };
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

const SearchResults: SFC<Props> = ({ results, properties, collectionId, datasetId }) => {

    const renderEntries = (result: any, idx: number) => {
        const imageUrl = properties.image && result[properties.image].value;
        const title = result[properties.title].value;
        const description = properties.description && result[properties.description].value;

        return  (
            <SearchResultEntry
                key={idx}
                imageUrl={imageUrl}
                title={title}
                uri={result.uri}
                description={description}
                collectionId={collectionId}
                datasetId={datasetId}
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