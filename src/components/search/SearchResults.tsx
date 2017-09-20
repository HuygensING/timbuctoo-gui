import React, { PureComponent } from 'react';
import Translations from '../../services/Translations';

import GridSection from '../layout/GridSection';
import SearchResultDataset, { ResultDataSetMetadata } from './SearchResultDataset';
import SearchResultEntry from './SearchResultEntry';

const FakeDataEntries: Array<any> = [{
    imageUrl: 'http://lorempixel.com/400/400/people',
    title: 'Barack Obama',
    description: 'Lorem ipsum dolor sit amet, Michelle Obama.',
    collections: {
        items: [{
            name: 'Leader'
        }, {
            name: 'Birthplace'
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/400/400/people',
    title: 'Barack Obama',
    description: 'Lorem ipsum dolor sit amet, Michelle Obama.',
    collections: {
        items: [{
            name: 'Leader'
        }, {
            name: 'Birthplace'
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/400/400/people',
    title: 'Barack Obama',
    description: 'Lorem ipsum dolor sit amet, Michelle Obama.',
    collections: {
        items: [{
            name: 'Leader'
        }, {
            name: 'Birthplace'
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/400/400/people',
    title: 'Barack Obama',
    description: 'Lorem ipsum dolor sit amet, Michelle Obama.',
    collections: {
        items: [{
            name: 'Leader'
        }, {
            name: 'Birthplace'
        }]
    }
}];

const FakeDataDatasets: Array<any> = [{
    imageUrl: 'http://lorempixel.com/400/200/people',
    title: 'World leaders',
    licence: {
        uri: 'licence:uri'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id.',
    collections: {
        items: [{
            name: 'Leader',
            properties: {
                items: [{
                    name: 'property name',
                    density: 50
                }, {
                    name: 'property name 2',
                    density: 25
                }, {
                    name: 'property name 3',
                    density: 70
                }]
            }
        }, {
            name: 'Birthplace',
            properties: {
                items: [{
                    name: 'property name',
                    density: 50
                }, {
                    name: 'property name 2',
                    density: 25
                }]
            }
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/300/city',
    title: 'Countries',
    licence: {
        uri: 'licence:uri'
    },
    description: 'Lorem ipsum dolor sit amet.',
    collections: {
        items: [{
            name: 'Leader',
            properties: {
                items: [{
                    name: 'property name',
                    density: 50
                }, {
                    name: 'property name 2',
                    density: 25
                }]
            }
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/500/city',
    title: 'States',
    licence: {
        uri: 'licence:uri'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend fringilla.',
    collections: {
        items: [{
            name: 'Leader',
            properties: {
                items: [{
                    name: 'property name',
                    density: 50
                }, {
                    name: 'property name 2',
                    density: 25
                }, {
                    name: 'property name 3',
                    density: 70
                }]
            }
        }]
    }
}];

interface Props {}
interface State {}

class SearchResults extends PureComponent<Props, State> {
    static renderDatasets (data: ResultDataSetMetadata, idx: number) {
        return <SearchResultDataset key={idx} {...data} />;
    }
    
    static renderEntries (data: any, idx: number) {
        return <SearchResultEntry key={idx} {...data} />;
    }

    render () {
        return (
            <GridSection title={Translations.translate('globals.results')} cols={1} gridSize={27} gridOffset={0} colSizeOffset={1} gridSpacing={2}>
                {FakeDataEntries.map(SearchResults.renderEntries)}
                {FakeDataDatasets.map(SearchResults.renderDatasets)}
            </GridSection>
        );
    }
}

export default SearchResults;