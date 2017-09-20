import { PureComponent, default as React } from 'react';
import FullHelmet from '../FullHelmet';
import Hero from '../hero/Hero';
import { Col } from '../layout/Grid';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';
import CollectionTags from '../CollectionTags';
import GridSection from '../layout/GridSection';
import { Dummy } from '../Dummy';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import { match } from 'react-router';

interface Props {
    title: string;
    description?: string;
    imageUrl?: string;
    datasetId: string;
    collectionKeys: CollectionMetadata[];
    currentCollection: CollectionMetadata;
    match: match<any>;
}

type FullProps = Props;

interface State {}

class DataSetBody extends PureComponent<FullProps, State> {
    render () {
        const { title, description, imageUrl, datasetId, collectionKeys } = this.props;

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${title}`}/>

                <Hero
                    title={title}
                    content={description}
                    imgUrl={imageUrl}
                    searchPath={`${ROUTE_PATHS.details}/${datasetId}/${encode(collectionKeys[0].title)}`}
                    buttonText={'Search this dataset'}
                />

                <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                    {collectionKeys.length > 0 && <CollectionTags colKeys={collectionKeys} datasetId={datasetId}/>}
                </Col>

                <Col sm={48}>
                    <GridSection gridSize={48} gridOffset={0} cols={2} colSizeOffset={2} gridSpacing={2}>
                        <Dummy text={'Colophon'} height={10} />
                        <Dummy text={'Partners'} height={10} />
                    </GridSection>
                </Col>

                <Col sm={48} smPaddingBottom={2}>
                    <Dummy text={'About this dataset'} height={12}/>
                </Col>

                <Col sm={48}>
                    <Dummy text={'Contributors'} height={12}/>
                </Col>
            </section>
        );
    }
}

export default DataSetBody;