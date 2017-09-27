import React, { SFC } from 'react';
import { CollectionMetadata } from '../typings/timbuctoo/schema';

import CollectionTag from './CollectionTag';

interface Props {
    colKeys: CollectionMetadata[];
    datasetId: string;
    currentCollectionListId?: string;
}

const CollectionTags: SFC<Props> = ({ colKeys, currentCollectionListId, datasetId }) => {

    const renderButton = (collection: CollectionMetadata, idx: number) => {
        return (
            <CollectionTag
                key={idx}
                currentCollectionListId={currentCollectionListId}
                datasetId={datasetId}
                collection={collection}
            />
        );
    }
    
    return (
        <div>
            <ul>
                {colKeys.map((col, idx) => renderButton(col, idx))}
            </ul>
        </div>
    );
};

export default CollectionTags;