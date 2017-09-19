import React, { PureComponent } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultDataset, { ResultDataSetMetadata } from './SearchResultDataset';
import SearchResultEntry from './SearchResultEntry';

const DataType: string = 'dataset';
const FakeData: Array<any> = [{
    imageUrl: 'http://lorempixel.com/400/200/people',
    title: 'Barack Obama',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1612
        }, {
            type: 'Birthplace',
            total: 717
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/300/people',
    title: 'Donal Trump',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1012
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/500/people',
    title: 'George Bush',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend fringilla.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1012
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/400/200/people',
    title: 'Barack Obama',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1612
        }, {
            type: 'Birthplace',
            total: 717
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/300/people',
    title: 'Donal Trump',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1012
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/500/people',
    title: 'George Bush',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend fringilla.',
    collections: {
        items: [{
            type: 'Leader',
            total: 1012
        }]
    }
}];

interface Props {}
interface State {}

// interface SearchResultProps {
//     imageUrl: string;
//     title: string;
//     licence: string;
//     description: string;
//     collections: CollectionMetadataList;
// }

class SearchResults extends PureComponent<Props, State> {
    static renderItems (data: ResultDataSetMetadata, idx: number) {
        switch (DataType) {
            case 'entry':
                return <SearchResultEntry key={idx} data={data} />;

            default:
                return <SearchResultDataset key={idx} {...data} />;
        }
    }
    render () {
        return (
            <GridSection title={Translations.translate('globals.results')} cols={2} gridSize={27} gridOffset={0} colSizeOffset={1} gridSpacing={2}>
                {FakeData.map(SearchResults.renderItems)}
            </GridSection>
        );
    }
}

export default SearchResults;