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
    imageUrl: 'http://lorempixel.com/300/300/people',
    title: 'Donal Trump',
    licence: 'licence:uri',
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
    imageUrl: 'http://lorempixel.com/300/500/people',
    title: 'George Bush',
    licence: 'licence:uri',
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
}, {
    imageUrl: 'http://lorempixel.com/400/200/people',
    title: 'Barack Obama',
    licence: 'licence:uri',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in enim id lectus eleifend.',
    collections: {
        items: [{
            name: 'Leader',
            properties: {
                items: [{
                    name: 'property name',
                    density: 50
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
    imageUrl: 'http://lorempixel.com/300/300/people',
    title: 'Donal Trump',
    licence: 'licence:uri',
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
                }, {
                    name: 'property name 3',
                    density: 70
                }]
            }
        }]
    }
}, {
    imageUrl: 'http://lorempixel.com/300/500/people',
    title: 'George Bush',
    licence: 'licence:uri',
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