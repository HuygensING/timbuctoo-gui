import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CollectionMetadata } from '../../typings/schema';
import Loading from '../Loading';
import FullHelmet from '../FullHelmet';
import Hero from '../hero/Hero';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';
import { Col } from '../layout/Grid';
import { isKnown, reorderUnknownsInList } from '../../services/HandleUnknowns';
import GridSection from '../layout/GridSection';
import Colophon from '../Colophon';
import { Dummy } from '../Dummy';
import { getValue } from '../../services/getValue';
import CollectionTags from '../CollectionTags';
import About from '../About';
import { Title } from '../layout/StyledCopy';
import EditCollectionBar from '../dataSet/EditCollectionBar';
import MetadataResolver, { ResolvedApolloProps } from '../MetadataResolver';
import QUERY_DATASET from '../../graphql/queries/DataSet';

interface StateProps {
    loggedIn: boolean;
}

type FullProps = ResolvedApolloProps & StateProps;

class DataSet extends PureComponent<FullProps> {

    static renderCollectionBar (collection: CollectionMetadata, idx: number, dataSetId: string) {
        return (
            <li key={idx}>
                <EditCollectionBar key={idx} collection={collection} dataSetId={dataSetId}/>
            </li>
        );
    }

    render () {
        if (this.props.loading) {
            return <Loading />; 
        }

        const { dataSetMetadata } = this.props.metadata;
        const { dataSetId, title, description, imageUrl, collectionList, owner, contact } = dataSetMetadata;

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${title}`}/>

                <Hero
                    title={getValue(title)}
                    content={getValue(description)}
                    imgUrl={getValue(imageUrl)}
                    searchPath={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionItems[0].collectionId)}`}
                    buttonText={'Search this dataset'}
                />

                <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionItems)}
                        dataSetId={dataSetId}
                    />
                </Col>

                {this.renderEditCollections(collectionItems, dataSetId)}

                <Col sm={48}>
                    <GridSection tag={'div'} gridSize={48} gridOffset={0} cols={2} colSizeOffset={2} gridSpacing={2}>
                        <Colophon owner={owner} contact={contact} />
                        <Dummy text={'Partners'} height={10}/>
                    </GridSection>
                </Col>

                {this.renderProvenanceInfo()}
            </section>
        );
    }

    private renderProvenanceInfo () {
        const { provenanceInfo } = this.props.metadata.dataSetMetadata;

        if (!provenanceInfo) {
            return null;
        }

        const title = getValue(provenanceInfo.title);
        const body = getValue(provenanceInfo.body);

        if (!title || !body) {
            return null;
        }

        return <About title={title} body={body}/>;
    }

    private renderEditCollections (collectionItems: CollectionMetadata[], dataSetId: string) {
        const { loggedIn } = this.props;

        if (!loggedIn) {
            return false;
        }

        return (
            <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                <section>
                    <Title>Collection</Title>
                    <ul>
                        {collectionItems
                            .filter(isKnown)
                            .map((collection, idx) =>
                                DataSet.renderCollectionBar(collection , idx, dataSetId)
                            )
                        }
                    </ul>
                </section>
            </Col>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn
});

export default MetadataResolver(QUERY_DATASET)(
    connect(mapStateToProps)(DataSet)
);