import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col } from '../layout/Grid';
import { RouteComponentProps } from 'react-router';
import GridSection from '../layout/GridSection';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import Hero from '../hero/Hero';
import buildDynamicQuery from '../../services/AddDynamicQuery';
import { DataSetMetadata, DataSets } from '../../typings/timbuctoo/schema';

interface Props {}

interface ApolloProps {
    data: {
        dataSets: DataSets;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;
interface State {}

class DataSet extends Component<FullProps, State> {
    render () {
        const { dataSet } = this.props.match.params;
        const { dataSets } = this.props.data;

        if (!dataSet || !dataSets) { return null; }
        console.log(dataSets);

        const { datasetId, title, description }: DataSetMetadata = dataSets[dataSet].metadata;

        return (
            <section>
                <FullHelmet pageName={`Dataset - ${datasetId}`}/>

                <Hero
                    title={title}
                    content={description}
                    searchPath={`${ROUTE_PATHS.search}/${datasetId}`}
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

const mapStateToProps = (state) => ({
    user: state.user
});

export default buildDynamicQuery(
    connect(mapStateToProps)(DataSet)
);
