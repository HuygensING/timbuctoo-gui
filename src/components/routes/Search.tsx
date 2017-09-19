import React, { Component } from 'react';

import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col, FullSection } from '../layout/Grid';
import GridSection from '../layout/GridSection';
import SearchForm from '../form/SearchForm';
import Filters from '../Filters';

import { RouteComponentProps } from 'react-router';
import SearchResults from '../search/SearchResults';

interface Props {
}

interface ApolloProps {

}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;

interface State {
}

class Search extends Component<FullProps, State> {
    static onSearch (values: {search: string}) {
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
                        <SearchResults />
                        <Dummy text={'Pagination'} height={2} marginY={2}/>
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default Search;