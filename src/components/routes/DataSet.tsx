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
import { CollectionMetadata, DataSetMetadata, DataSets } from '../../typings/timbuctoo/schema';
import CollectionTags from '../CollectionTags';

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

        const { datasetId, title, description, imageUrl, collections }: DataSetMetadata = dataSets[dataSet].metadata;

        const collectionKeys: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${title}`}/>

                <Hero
                    title={title}
                    content={description}
                    imgUrl={imageUrl}
                    searchPath={`${ROUTE_PATHS.search}/${datasetId}`}
                    buttonText={'Search this dataset'}
                />

                <Col sm={48} smPaddingBottom={.5}>
                    {collectionKeys.length > 0 && <CollectionTags colKeys={collectionKeys} datasetId={datasetId}/>}
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
