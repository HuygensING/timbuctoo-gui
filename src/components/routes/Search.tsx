import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col, FullSection } from '../layout/Grid';
import GridSection from '../layout/GridSection';

interface Props {
}

interface State {
}

class Search extends Component<Props, State> {

    static renderItems (_: any, i: number) {
        return (<Dummy text={'result'} height={4}/>);
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
                        <Dummy text={'filter hierarchy'} height={2} marginY={.5}/>
                        <Dummy text={'filter multiselect'} mvp={true} height={5} marginY={.5}/>
                        <Dummy text={'filter hierarchy'} height={5} marginY={.5}/>
                        <Dummy text={'filter range'} height={5} marginY={.5}/>
                    </Col>

                    <Col sm={28}>
                        {/* Filter functionality */}
                        <GridSection title="test" cols={2} gridSize={27} gridOffset={1}>
                            {[1, 2, 3].map(Search.renderItems)}
                        </GridSection>
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default Search;