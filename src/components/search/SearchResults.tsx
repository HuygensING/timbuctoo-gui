import React, { PureComponent } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultItem from './SearchResultItem';

const FakeData = [{
    imageUrl: 'http://lorempixel.com/400/200/people',
    name: 'Barack Obama',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id.',
    collections: [{
        type: 'Leader',
        total: 1612
    }, {
        type: 'Birthplace',
        total: 717
    }]
}, {
    imageUrl: 'http://lorempixel.com/300/300/people',
    name: 'Donal Trump',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet.',
    collections: [{
        type: 'Leader',
        total: 1012
    }]
}, {
    imageUrl: 'http://lorempixel.com/300/500/people',
    name: 'George Bush',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend fringilla.',
    collections: [{
        type: 'Leader',
        total: 1012
    }]
}, {
    imageUrl: 'http://lorempixel.com/400/200/people',
    name: 'Barack Obama',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend.',
    collections: [{
        type: 'Leader',
        total: 1612
    }, {
        type: 'Birthplace',
        total: 717
    }]
}, {
    imageUrl: 'http://lorempixel.com/300/300/people',
    name: 'Donal Trump',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet.',
    collections: [{
        type: 'Leader',
        total: 1012
    }]
}, {
    imageUrl: 'http://lorempixel.com/300/500/people',
    name: 'George Bush',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend fringilla.',
    collections: [{
        type: 'Leader',
        total: 1012
    }]
}];

interface Props {}
interface State {}

interface CollectionProps {
    type: string;
    total: Number;
}

interface SearchResultProps {
    imageUrl: string;
    name: string;
    licence: string;
    description: string;
    collections: CollectionProps[];
}

class SearchResults extends PureComponent<Props, State> {
    static renderItems (data: SearchResultProps, idx: number) {
        return <SearchResultItem key={idx} data={data} />;
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