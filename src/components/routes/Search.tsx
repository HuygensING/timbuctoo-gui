import React, { PureComponent } from 'react';
import { CollectionMetadata } from '../../typings/schema';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import SearchForm from '../form/SearchForm';
import CollectionTags from '../CollectionTags';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
import Filters from '../Filters';
import SearchResults from '../search/SearchResults';
import { getValuesFromObject } from '../../services/getValue';
import { getCollectionValues } from '../../services/GetDataSetValues';
import MetadataResolver, { ResolvedApolloProps } from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import Pagination from '../search/Pagination';
import Loading from '../Loading';

type FullProps = ResolvedApolloProps;

class Search extends PureComponent<FullProps> {

    render() {
        if (!this.props.metadata || !this.props.metadata.dataSetMetadata || !this.props.data) {
            return <Loading />;
        }

        const { collectionList, dataSetId, collection } = this.props.metadata.dataSetMetadata;

        const collectionValues = getCollectionValues(this.props.data.dataSets, dataSetId, collection!.collectionListId);
        const fields = getValuesFromObject(collection!.summaryProperties);

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <section>
                <FullHelmet pageName={`search: dataSetId`}/>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                    {/* TODO: Connect the fulltext search as well */}
                    <SearchForm type={'collection'}/>
                </Col>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionItems)}
                        dataSetId={dataSetId}
                        currentCollectionListId={collection!.collectionListId}
                        replace={true}
                    />
                </Col>

                <FullSection>

                    <Col sm={12} smPaddingY={1}>
                        <Filters
                            loading={this.props.loading}
                            currentCollectionListId={collection!.collectionListId}
                            collection={collectionValues}
                            facetConfigs={collection!.indexConfig.facet}
                        />
                    </Col>

                    <Col sm={27} smOffset={3} smPaddingY={1}>

                        {collectionValues && (
                            <SearchResults
                                dataSetId={dataSetId}
                                collectionId={collection!.collectionId}
                                properties={collection!.summaryProperties}
                                results={collectionValues.items}
                                fields={fields}
                            />
                        )}

                        <Pagination nextCursor={collectionValues && collectionValues.nextCursor} prevCursor={collectionValues && collectionValues.prevCursor} />
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default MetadataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES, QUERY_COLLECTION_VALUES)(Search);