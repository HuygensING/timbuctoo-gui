import React, { PureComponent } from 'react';
import { CollectionMetadata } from '../typings/schema';

import CollectionTag from './CollectionTag';

interface Props {
    colKeys: CollectionMetadata[];
    dataSetId: string;
    currentCollectionListId?: string | null;
    replace?: boolean;
}

interface State {
    isOpen: number | null;
}

class CollectionTags extends PureComponent<Props, State> {
    state = { isOpen: null };

    toggleOpen = (idx: number | null) => {
        this.setState({ isOpen: idx });
    };

    renderButton(collection: CollectionMetadata, idx: number) {
        const { currentCollectionListId, dataSetId, replace } = this.props;

        return (
            <CollectionTag
                key={idx}
                index={idx}
                toggleOpen={this.toggleOpen}
                isOpen={this.state.isOpen === idx}
                currentCollectionListId={currentCollectionListId}
                dataSetId={dataSetId}
                collection={collection}
                replace={replace}
            />
        );
    }

    render() {
        const { colKeys } = this.props;
        return (
            <div>
                <ul>{colKeys.map((col, idx) => this.renderButton(col, idx))}</ul>
            </div>
        );
    }
}

export default CollectionTags;
