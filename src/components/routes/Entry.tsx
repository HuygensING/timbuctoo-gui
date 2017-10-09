import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Component, ComponentType, DataSetMetadata } from '../../typings/timbuctoo/schema';

import { COMPONENTS } from '../../constants/global';

import Loading from '../Loading';
import FullHelmet from '../FullHelmet';
import { Col, Grid } from '../layout/Grid';
import ComponentLoader from '../../services/ComponentLoader';
import { getCollectionValues } from '../../services/GetDataSetValues';
import MetadataResolver from '../MetadataResolver';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';
import QUERY_ENTRY_VALUES from '../../graphql/queries/EntryValues';

interface ApolloProps {
    metadata: {
        dataSetMetadata: DataSetMetadata;
    };
    data: {
        dataSets: any;
    };
    loading: boolean;
}

type FullProps = ApolloProps & RouteComponentProps<any>;

interface State {}

class Entry extends PureComponent<FullProps, State> {

    static addUnique(value: string, values: Array<string>) {
        if (value && values.indexOf(value) < 0) {
            values.push( value );
        }
    }

    static getValues(components: Array<any>): Array<string> {
        let values: Array<string> = [];
        components.forEach(component => Entry.getValue(component, values));
        return values;
    }

    static getValue(component: any, values: Array<string>) {
        switch (component.type) {
            case COMPONENTS.value:
            case COMPONENTS.image:
            case COMPONENTS.link:
                Entry.addUnique(component.valueKey, values);
                Entry.addUnique(component.urlKey, values);
                Entry.addUnique(component.altKey, values);
                break;

            case COMPONENTS.keyValue:
                if (component.values) {
                    component.values.forEach((_component: Component) => Entry.getValue(_component, values));
                }
                break;
            default:
                break;
        }
    }

    render () {
        if ( this.props.loading ) { return <Loading />; }
        
        const { collection } = this.props.metadata.dataSetMetadata;
        if (!collection) { return null; }
        
        const components = this.dummyComponents(); // TODO: These will be coming from dataSetMetadata.collection.component
        const currentCollection = getCollectionValues(this.props, this.props.match.params.dataSet, this.props.match.params.collection);

        return (
            <section>
                <FullHelmet pageName={`Entry - ${this.props.match.params.entry}`} />
                <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
                    <Col xs={36} sm={24}>
                        {components && components.map(
                            (component: any, index: number) =>
                                <ComponentLoader key={index} component={component} data={currentCollection} />
                            )
                        }
                    </Col>
                </Grid>
            </section>
        );
    }

    private dummyComponents () {
        const keys = {
            name: 'schema_org_name',
            description: 'schema_org_description',
            image: 'schema_org_imageUrl',
            birthplace: 'schema_org_birthPlace',
            url: 'schema_org_url'
        };
        return [{
            type: COMPONENTS.title as ComponentType,
            value: {
                fields: [keys.name]
            }
        }, {
            type: COMPONENTS.image as ComponentType,
            url: { fields: [keys.image] },
            alt: { fields: [keys.image] },
            options: {
                width: '50%',
                type: 'rounded',
                ratio: 1
            }
        }, {
            type: COMPONENTS.divider as ComponentType,
            title: { field: 'Personal info'}
        }, {
            type: COMPONENTS.keyValue as ComponentType,
            key: { field: 'Name'},
            values: [{
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.name] }
            }]
        }, {
            type: COMPONENTS.keyValue as ComponentType,
            key: { field: 'Born'},
            values: [{
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.birthplace] }
            }]
        }, {
            type: COMPONENTS.keyValue as ComponentType,
            key: { field: 'Beroep' },
            values: [{
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.link as ComponentType,
                url: { fields: [keys.url] },
                value: { fields: [keys.name]}
            }, {
                type: COMPONENTS.link as ComponentType,
                url: { fields: [keys.url] },
                value: { fields: [keys.name]}
            }]
        }, {
            type: COMPONENTS.divider as ComponentType,
            title: { field: 'More information' }
        }, {
            type: COMPONENTS.keyValue as ComponentType,
            key: { field: 'Description' },
            values: [{
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.description] }
            }, {
                type: COMPONENTS.image as ComponentType,
                url: { fields: [keys.image] },
                alt: { fields: [keys.image] }
            }, {
                type: COMPONENTS.divider as ComponentType,
                value: { field: 'Sub-info' }
            }, {
                type: COMPONENTS.keyValue as ComponentType,
                key: { field: 'Name' },
                values: [{
                    type: COMPONENTS.value as ComponentType,
                    value: { fields: [keys.description] }
                }, {
                    type: COMPONENTS.image as ComponentType,
                    url: { fields: keys.image },
                    alt: { fields: keys.image }
                }]
            }]
        }, {
            type: COMPONENTS.divider as ComponentType,
            title: { field: 'Relatives'}
        }, {
            type: COMPONENTS.value as ComponentType,
            value:  { fields: [keys.description] }
        }, {
            type: COMPONENTS.image as ComponentType,
            url: { fields: [keys.image] },
            alt: { fields: [keys.image] },
            options: {
                ratio: 16 / 9
            }
        }, {
            type: COMPONENTS.keyValue as ComponentType,
            key: { field: 'Biography' },
            values: [{
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.value as ComponentType,
                value: { fields: [keys.birthplace] }
            }]
        }, {
            type: COMPONENTS.value as ComponentType,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value as ComponentType,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value as ComponentType,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value as ComponentType,
            value: { fields: [keys.description] }
        }];
    }
}

export default MetadataResolver(QUERY_ENTRY_PROPERTIES, QUERY_ENTRY_VALUES)(Entry);