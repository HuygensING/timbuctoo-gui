import React, { PureComponent } from 'react';

import { ComponentConfig } from '../../typings/schema';
import Loading from '../Loading';
import FullHelmet from '../FullHelmet';
import { Col, Grid } from '../layout/Grid';

import MetadataResolver, { ResolvedApolloProps } from '../MetadataResolver';
import { ComponentLoader } from '../../services/ComponentLoader';

import { QUERY_ENTRY_PROPERTIES, QueryMetadata } from '../../graphql/queries/EntryProperties';
import { QUERY_ENTRY_VALUES, QueryValues, makeDefaultViewConfig } from '../../graphql/queries/EntryValues';
import NotFound from './NotFound';
import { safeGet } from '../../services/GetDataSetValues';

interface State {}

class Entry extends PureComponent<ResolvedApolloProps<QueryMetadata, QueryValues, any>, State> {
    render() {
        if (this.props.loading) {
            return <Loading />;
        }
        if (!this.props.metadata.dataSetMetadata) {
            return <NotFound />;
        }
        const { collection, collectionList } = this.props.metadata.dataSetMetadata;
        if (!collection) {
            return <NotFound />;
        }

        const idPerUri: { [key: string]: string | undefined } = {};
        collectionList.items.map(coll => (idPerUri[coll.itemType] = coll.collectionId));
        const componentConfigs =
            collection.viewConfig.length > 0
                ? collection.viewConfig
                : makeDefaultViewConfig(
                      collection.properties.items,
                      collection.summaryProperties,
                      collectionList.items
                  );

        const entry = safeGet(
            safeGet(this.props.data.dataSets, this.props.match.params.dataSet),
            this.props.match.params.collection
        );
        if (!entry) {
            return <NotFound />;
        }

        return (
            <section>
                <FullHelmet pageName={`Entry - ${this.props.match.params.entry}`} />
                <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
                    <Col xs={36} sm={24}>
                        {componentConfigs &&
                            componentConfigs.map((componentConfig, index) => (
                                <ComponentLoader
                                    key={index}
                                    data={entry}
                                    componentConfig={componentConfig as ComponentConfig}
                                    idPerUri={idPerUri}
                                />
                            ))}
                    </Col>
                </Grid>
            </section>
        );
    }
}

export default MetadataResolver(QUERY_ENTRY_PROPERTIES, QUERY_ENTRY_VALUES)(Entry);
