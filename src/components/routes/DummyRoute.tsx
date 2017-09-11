import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import { Col, Grid } from '../layout/Grid';

import { Dummy } from '../Dummy';
import GridSection from '../layout/GridSection';
import { RouteProps } from 'react-router';

interface Props {
}

interface State {
}

class DummyRoute extends Component<Props & RouteProps, State> {
    render () {
        const { location } = this.props;

        const path = location && location.pathname ? location.pathname : 'unknown page';

        return (
            <Grid>
                <FullHelmet pageName="Dummy"/>
                <Col sm={48}>
                    <Dummy text={`Header hero for ${path}`} height={10}/>
                </Col>

                <Col sm={48}>
                    <GridSection title={`Dummy content for ${path}`} gridSpacing={2} colSizeOffset={1}>
                        <Dummy text={'content'} height={8}/>
                        <Dummy text={'content'} height={8}/>
                        <Dummy text={'content'} height={8}/>
                        <Dummy text={'content'} height={8}/>
                        <Dummy text={'content'} height={8}/>
                        <Dummy text={'content'} height={8}/>
                    </GridSection>
                </Col>
            </Grid>
        );
    }
}

export default DummyRoute;