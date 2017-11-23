import React, { ComponentType, PureComponent } from 'react';

import { ComponentConfig, DataSetMetadata } from '../../typings/schema';
import FullHelmet from '../FullHelmet';
import { Col, Grid } from '../layout/Grid';
import { ComponentLoader } from '../../services/ComponentLoader';
import { QUERY_ENTRY_PROPERTIES } from '../../graphql/queries/EntryProperties';
import { makeDefaultViewConfig, QUERY_ENTRY_VALUES } from '../../graphql/queries/EntryValues';
import NotFound from './NotFound';
import { safeGet } from '../../services/GetDataSetValues';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { compose } from 'redux';
import graphqlWithProps from '../../services/graphqlWithProps';
import { ChildProps } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import renderLoader from '../../services/renderLoader';

type FullProps = ChildProps<MetaDataProps & RouteComponentProps<any>, { dataSets: DataSetMetadata }>;

class Entry extends PureComponent<FullProps> {

    render () {
        if (!this.props.metadata.dataSetMetadata) {
            return <NotFound/>;
        }
        const { collection, collectionList } = this.props.metadata.dataSetMetadata;
        if (!collection) {
            return <NotFound/>;
        }

        const idPerUri: { [key: string]: string | undefined } = {};
        collectionList.items.map(coll => idPerUri[coll.itemType] = coll.collectionId);
        const componentConfigs = collection.viewConfig.length > 0 ? collection.viewConfig : makeDefaultViewConfig(collection.properties.items, collection.summaryProperties, collectionList.items);

        const entry = safeGet(safeGet(this.props.data!.dataSets, this.props.match.params.dataSet), this.props.match.params.collection);
        if (!entry) {
            return <NotFound/>;
        }

        return (
            <section>
                <FullHelmet pageName={`Entry - ${this.props.match.params.entry}`}/>
                <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
                    <Col xs={36} sm={24}>
                        {
                            componentConfigs &&
                            componentConfigs.map((componentConfig, index) =>
                                <ComponentLoader
                                    key={index}
                                    data={entry}
                                    componentConfig={componentConfig as ComponentConfig}
                                    idPerUri={idPerUri}
                                />
                            )
                        }
                    </Col>
                </Grid>
            </section>
        );
    }
}

const dataResolver = compose<ComponentType<{}>>(
    withRouter,
    metaDataResolver(QUERY_ENTRY_PROPERTIES),
    renderLoader('metadata'),
    graphqlWithProps(QUERY_ENTRY_VALUES),
    renderLoader()
);

// const dataResolver = compose<ComponentType<any>>(metaDataResolver(QUERY_ENTRY_PROPERTIES), onlyRenderWithMetadata(graphqlWithProps(QUERY_ENTRY_VALUES)));

export default dataResolver(Entry);