import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
import { UserReducer } from '../../typings/store';
import EditCollectionBar from './EditCollectionBar';
import { Title } from '../layout/StyledCopy';
import getValue from '../../services/getValue';

interface Props {
    title: string;
    description: string;
    imageUrl: string;
    dataSetId: string;
    collectionKeys: CollectionMetadata[];
    match: match<any>;
    user: UserReducer;
}

type FullProps = Props;

interface State {}

class DataSetBody extends PureComponent<FullProps, State> {
    constructor(props: FullProps) {
        super(props);
        
        this.renderCollectionBar = this.renderCollectionBar.bind(this);
    }

    render () {
        const { title, description, imageUrl, dataSetId, collectionKeys, user } = this.props;
        const highlightKey = getValue(collectionKeys[0].title);

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${title}`}/>

                <Hero
                    title={title}
                    content={description}
                    imgUrl={imageUrl}
                    searchPath={highlightKey ? `${ROUTE_PATHS.details}/${dataSetId}/${encode(highlightKey)}` : highlightKey}
                    buttonText={'Search this dataset'}
                />

                <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                    {this.renderCollectionTags(collectionKeys, dataSetId)}
                </Col>

                {
                    user.loggedIn &&
                    <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                        <section>
                            <Title>Collection</Title>
                            <ul>
                                {collectionKeys.map(this.renderCollectionBar)}
                            </ul>
                        </section>
                    </Col>
                }

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

    private reOrderCollection (collections: CollectionMetadata[], reOrderKey: string) {
        const collectionsCopy: CollectionMetadata[] = collections.slice();
        const invalidCollections: any[] = [];
        let col;
        for (let i = 0, limit = collectionsCopy.length; i < limit; i++) {
            col = collectionsCopy[i];
            if (col && col.collectionId.indexOf(reOrderKey) !== -1) {
                invalidCollections.push( collectionsCopy.splice(i, 1)[0] );
            }
        }
        return collectionsCopy.concat(invalidCollections);
    }

    private renderCollectionTags (collections: CollectionMetadata[], dataSetId: string) {
        const reorderedCollections = this.reOrderCollection(collections, 'vocabulary_unknown');
        return <CollectionTags colKeys={reorderedCollections} dataSetId={dataSetId} />;
    }

    private renderCollectionBar (collection: CollectionMetadata, idx: number) {
        return (
            <li key={idx}>
                <EditCollectionBar key={idx} collection={collection} dataSetId={this.props.dataSetId} />
            </li>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(DataSetBody);