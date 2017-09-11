import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col } from '../layout/Grid';
import { RouteComponentProps } from 'react-router';
import GridSection from '../layout/GridSection';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import Hero from '../hero/Hero';

interface Props {
}

interface State {
}

class DataSet extends Component<Props & RouteComponentProps<any>, State> {
    render () {
        const { dataSet } = this.props.match.params;

        if (!dataSet) { return null; }

        return (
            <section>
                <FullHelmet pageName={`Dataset - ${dataSet}`}/>

                <Hero
                    title={`Dataset: ${dataSet}`}
                    content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur cumque dolorem doloribus esse exercitationem fugit molestias possimus recusandae vitae?'}
                    searchPath={`${ROUTE_PATHS.search}/${dataSet}`}
                    buttonText={'Search this dataset'}
                />

                <Col sm={48} smPaddingBottom={2}>
                    {/*tags component*/}
                    <Dummy text={'collection tags'} height={3}/>
                </Col>

                <Col sm={48}>
                    <GridSection gridSize={48} gridOffset={0} cols={2} colSizeOffset={2} gridSpacing={2}>

                        {/*Colophon*/}
                        <Dummy text={'Colophon'} height={10} />

                        {/*Partners*/}
                        <Dummy text={'Partners'} height={10} />

                    </GridSection>
                </Col>

                <Col sm={48} smPaddingBottom={2}>
                    {/*About*/}
                    <Dummy text={'About this dataset'} height={12}/>
                </Col>

                <Col sm={48}>
                    {/*Contributors*/}
                    <Dummy text={'Contributors'} height={12}/>
                </Col>
            </section>
        );
    }
}

export default DataSet;