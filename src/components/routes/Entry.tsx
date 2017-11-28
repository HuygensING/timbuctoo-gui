import React, { SFC } from 'react';

import { ComponentConfig, DataSetMetadata } from '../../typings/schema';
import FullHelmet from '../FullHelmet';
import { Col, Grid } from '../layout/Grid';
import { ComponentLoader } from '../../services/ComponentLoader';
import { Props as EntryPropertiesProps, QUERY_ENTRY_PROPERTIES } from '../../graphql/queries/EntryProperties';
import {
    makeDefaultViewConfig,
    Props as EntryValuesProps,
    QUERY_ENTRY_VALUES
} from '../../graphql/queries/EntryValues';
import NotFound from './NotFound';
import { safeGet } from '../../services/GetDataSetValues';
import metaDataResolver from '../../services/metaDataResolver';
import { compose } from 'redux';
import graphqlWithProps from '../../services/graphqlWithProps';
import { withRouter } from 'react-router';
import renderLoader from '../../services/renderLoader';
import { ChildProps } from 'react-apollo';

type FullProps = ChildProps<EntryPropertiesProps & EntryValuesProps, { dataSets: DataSetMetadata }>;

const Entry: SFC<FullProps> = (props: FullProps) => {
    if (!props.metadata.dataSetMetadata) {
        return <NotFound />;
    }
    const { collection, collectionList } = props.metadata.dataSetMetadata;
    if (!collection) {
        return <NotFound />;
    }

    const idPerUri: { [key: string]: string | undefined } = {};
    collectionList.items.map(coll => (idPerUri[coll.itemType] = coll.collectionId));
    const componentConfigs =
        collection.viewConfig.length > 0
            ? collection.viewConfig
            : makeDefaultViewConfig(collection.properties.items, collection.summaryProperties, collectionList.items);

    const entry = safeGet(safeGet(props.data!.dataSets, props.match.params.dataSet), props.match.params.collection);
    if (!entry) {
        return <NotFound />;
    }

    return (
        <section>
            <FullHelmet pageName={`Entry - ${props.match.params.entry}`} />
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
};

const dataResolver = compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_ENTRY_PROPERTIES),
    renderLoader('metadata'),
    graphqlWithProps<FullProps>(QUERY_ENTRY_VALUES),
    renderLoader()
);

export default dataResolver(Entry);
