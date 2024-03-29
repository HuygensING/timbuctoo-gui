import React, { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { CollectionMetadata } from '../../typings/schema';
import FullHelmet from '../FullHelmet';
import Hero from '../hero/Hero';
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
import QUERY_DATASET, { Props as DataSetProps } from '../../graphql/queries/DataSet';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import { RootState } from '../../reducers/rootReducer';
import verifyResponse from '../../services/verifyResponse';
import Upload from '../Upload';

interface StateProps {
    loggedIn: boolean;
}

type Props = MetaDataProps & StateProps & DataSetProps;

class DataSet extends PureComponent<Props> {
    render() {
        const { dataSetId, dataSetName, ownerId, title, description, imageUrl, collectionList, owner, contact } = this
            .props.metadata.dataSetMetadata!;

        const collectionItems: CollectionMetadata[] =
            collectionList && collectionList.items ? collectionList.items : [];

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${getValue(title)}`} />

                <Hero
                    title={getValue(title)}
                    content={getValue(description)}
                    imgUrl={getValue(imageUrl)}
                    searchPath={null}
                    buttonText={null}
                    // searchPath={
                    //     collectionItems.length
                    //         ? `/${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionItems[0].collectionId)}`
                    //         : ''
                    // }
                    // buttonText={'Search this dataset'}
                />

                <Col sm={42} smOffset={3} smPaddingBottom={0.5}>
                    <CollectionTags colKeys={reorderUnknownsInList(collectionItems)} dataSetId={dataSetId} />
                </Col>

                {this.props.loggedIn && (
                    <Col sm={42} smOffset={3} smPaddingBottom={0.5}>
                        <section>
                            <Title>Collection</Title>
                            <ul>
                                {collectionItems.filter(isKnown).map((collection, idx) => (
                                    <li key={idx}>
                                        <EditCollectionBar key={idx} collection={collection} dataSetId={dataSetId} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </Col>
                )}

                {this.renderProvenanceInfo()}
                {this.props.loggedIn && (
                    <Upload
                        dataSetName={dataSetName}
                        ownerId={ownerId}
                        onCompletion={() => this.props.metadata.refetch()}
                    />
                )}

                <Col sm={48}>
                    <GridSection tag={'div'} gridSize={48} gridOffset={0} cols={2} colSizeOffset={2} gridSpacing={2}>
                        <Colophon owner={owner} contact={contact} />
                        <Dummy text={'Partners'} height={10} />
                    </GridSection>
                </Col>
            </section>
        );
    }

    private renderProvenanceInfo() {
        const { provenanceInfo } = this.props.metadata.dataSetMetadata!;

        if (!provenanceInfo) {
            return null;
        }

        const title = getValue(provenanceInfo.title);
        const body = getValue(provenanceInfo.body);
        const bodyType = provenanceInfo.body ? provenanceInfo.body.type : '';

        if (!title || !body) {
            return null;
        }

        const isMarkDown =
            bodyType.startsWith('http://spec.commonmark.org/') ||
            bodyType === 'https://daringfireball.net/projects/markdown/syntax';
        return <About title={title} body={body} isMarkDown={isMarkDown} />;
    }
}

const mapStateToProps = (state: RootState) => ({
    loggedIn: state.user.loggedIn
});

export default compose<ComponentType<{}>>(
    withRouter,
    metaDataResolver(QUERY_DATASET),
    renderLoader('metadata'),
    verifyResponse<Props, 'metadata'>('metadata', 'dataSetMetadata'),
    connect(mapStateToProps)
)(DataSet);
