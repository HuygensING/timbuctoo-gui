import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col, FullSection } from '../layout/Grid';
import GridSection from '../layout/GridSection';
import SearchForm from '../form/SearchForm';
import Filters from '../Filters';

import SearchResultItem from '../search/SearchResultItem';

interface Props {
}

interface State {
}

interface SearchResults {
    search: string;
}

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

class Search extends Component<Props, State> {

    static renderItems (data: SearchResultProps, idx: number) {
        return <SearchResultItem key={idx} data={data} />;
    }

    static onSearch (values: SearchResults) {
        // TODO: Do a refetch for results using this key
        console.log(values.search);
    }

    static onFilter (values: any) {
        console.log(values);
    }

    render () {
        return (
            <section>
                <FullHelmet pageName="search"/>

                {/* Search functionality */}
                <Col sm={42} smOffset={3} smPaddingTop={1}>
                    <SearchForm onSubmit={Search.onSearch} />
                </Col>
                
                {/* Search Pills */}
                <Col sm={42} smOffset={3} smPaddingTop={1}>
                    <GridSection gridSize={42} cols={4} gridOffset={0} colSizeOffset={1}>
                        <Dummy text={'Dataset (1.337)'} />
                        <Dummy text={'Collection 1 (1.196)'} mvp={true} />
                        <Dummy text={'Collection 2 (120)'} mvp={true} />
                        <Dummy text={'Collection 3 (21)'} mvp={true} />
                    </GridSection>
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={12} smPaddingTop={2}>
                        <Filters />
                    </Col>

                    <Col sm={27} smOffset={3}>
                        {/* Filter functionality */}
                        <GridSection title="Results" cols={2} gridSize={27} gridOffset={0} colSizeOffset={1} gridSpacing={2}>
                            {FakeData.map(Search.renderItems)}
                        </GridSection>
                        <Dummy text={'Pagination'} height={2} marginY={2}/>
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default Search;