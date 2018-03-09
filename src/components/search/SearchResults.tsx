import React, { SFC } from 'react';
import translate from '../../services/translate';

import GridSection from '../layout/GridSection';
import SearchResultEntry from './SearchResultEntry';
import { SummaryProperties, Property } from '../../typings/schema';
import { walkPath, ReferencePath } from '../../services/propertyPath';
import { ITEMS } from '../../constants/global';

interface Props {
    dataSetId: string;
    collectionId: string | null;
    properties: SummaryProperties | null;
    propertyMetadata: Property[];
    fields: { [name: string]: string | null };
    results: any[]; // Object with uri and the three variable fields for title, image and description
}

function getValue(path: string | null, result: any): string | null {
    const value = walkPath(path, [], result);
    if (value === null) {
        return value;
    } else if (Array.isArray(value)) {
        const first = value[0] || null;
        if (typeof first === 'string' || first === null) {
            return first;
        } else {
            return first.uri;
        }
    } else if (typeof value === 'string') {
        return value;
    } else {
        return value.uri;
    }
}

const SearchResults: SFC<Props> = ({ results, properties, propertyMetadata, collectionId, dataSetId, fields }) => {
    if (!properties || !collectionId) {
        return null;
    }

    const renderEntries = (result: any, idx: number) => {
        const imageUrl = getValue(fields.image, result);
        const description = getValue(fields.description, result);
        let defaultTitle: ReferencePath | undefined = undefined;
        if (propertyMetadata.some(x => x.name === 'rdfs_label')) {
            defaultTitle = [[collectionId, 'rdfs_label'], ['Value', 'value']];
        } else if (propertyMetadata.some(x => x.name === 'rdfs_labelList')) {
            defaultTitle = [[collectionId, 'rdfs_labelList'], [ITEMS, 'items'], ['Value', 'value']];
        }

        const title = getValue(fields.title || JSON.stringify(defaultTitle), result);

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
