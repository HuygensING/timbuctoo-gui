import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col, FullSection } from '../layout/Grid';
import GridSection from '../layout/GridSection';
import { Title } from '../layout/StyledCopy';

interface Props {
}

interface State {
}

class Search extends Component<Props, State> {

    static renderItems (_: any, idx: number) {
        return (<Dummy key={idx} mvp={true} text={'result'} height={4}/>);
    }

    render () {
        return (
            <section>
                <FullHelmet pageName="search"/>

                {/* Search functionality */}
                <Col sm={48}>
                    <Dummy text={'Search'} height={5}/>
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={14} smPaddingTop={2}>
                        <Title>Filters</Title>
                        <Dummy text={'filter hierarchy'} height={2} marginY={.5}/>
                        <Dummy text={'filter multiselect'} mvp={true} height={5} marginY={.5}/>
                        <Dummy text={'filter hierarchy'} height={5} marginY={.5}/>
                        <Dummy text={'filter range'} height={5} marginY={.5}/>
                    </Col>

                    <Col sm={27} smOffset={1}>
                        {/* Filter functionality */}
                        <GridSection title="test" cols={2} gridSize={27} gridOffset={0} colSizeOffset={1} gridSpacing={2}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(Search.renderItems)}
                        </GridSection>
                        <Dummy text={'Pagination'} height={2} marginY={2}/>
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default Search;