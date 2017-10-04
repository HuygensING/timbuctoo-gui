import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Component, DataSetMetadata } from '../../typings/timbuctoo/schema';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import { COMPONENTS } from '../../constants/global';

import EntryBody from '../entry/EntryBody';
import Loading from '../Loading';

interface Props {
}

interface ApolloProps {
    data: {
        dataSetMetadata: DataSetMetadata;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;

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
        const { dataSetMetadata } = this.props.data;

        if ( !dataSetMetadata ) { return <Loading />; }
        
        const { collection } = dataSetMetadata;
        if (!collection) { return null; }
        
        const components = this.dummyComponents();
        const values: Array<string> = [];

        return (
            <EntryBody
                collectionCursor={this.props.match.params.collection}
                components={components}
                values={values}
                match={this.props.match}
            />
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
            type: COMPONENTS.title,
            value: {
                fields: [keys.name]
            }
        }, {
            type: COMPONENTS.image,
            url: { fields: [keys.image] },
            alt: { fields: [keys.image] },
            options: {
                width: '50%',
                type: 'rounded',
                ratio: 1
            }
        }, {
            type: COMPONENTS.divider,
            title: { field: 'Personal info'}
        }, {
            type: COMPONENTS.keyValue,
            key: { field: 'Name'},
            values: [{
                type: COMPONENTS.value,
                value: { fields: [keys.name] }
            }]
        }, {
            type: COMPONENTS.keyValue,
            key: { field: 'Born'},
            values: [{
                type: COMPONENTS.value,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.value,
                value: { fields: [keys.birthplace] }
            }]
        }, {
            type: COMPONENTS.keyValue,
            key: { field: 'Beroep' },
            values: [{
                type: COMPONENTS.value,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.link,
                url: { fields: [keys.url] },
                value: { fields: [keys.name]}
            }, {
                type: COMPONENTS.link,
                url: { fields: [keys.url] },
                value: { fields: [keys.name]}
            }]
        }, {
            type: COMPONENTS.divider,
            title: { field: 'More info' }
        }, {
            type: COMPONENTS.keyValue,
            key: { field: 'Description' },
            values: [{
                type: COMPONENTS.value,
                value: { fields: [keys.description] }
            }, {
                type: COMPONENTS.image,
                url: { fields: [keys.image] },
                alt: { fields: [keys.image] }
            }, {
                type: COMPONENTS.divider,
                value: { field: 'Sub-info' }
            }, {
                type: COMPONENTS.keyValue,
                key: { field: 'Cat name' },
                values: [{
                    type: COMPONENTS.value,
                    value: { fields: [keys.description] }
                }, {
                    type: COMPONENTS.image,
                    url: { fields: keys.image },
                    alt: { fields: keys.image }
                }]
            }]
        }, {
            type: COMPONENTS.divider,
            title: { field: 'Other info'}
        }, {
            type: COMPONENTS.value,
            value:  { fields: [keys.description] }
        }, {
            type: COMPONENTS.image,
            url: { fields: [keys.image] },
            alt: { fields: [keys.image] },
            options: {
                ratio: 16 / 9
            }
        }, {
            type: COMPONENTS.keyValue,
            key: { field: 'Bio' },
            values: [{
                type: COMPONENTS.value,
                value: { fields: [keys.name] }
            }, {
                type: COMPONENTS.value,
                value: { fields: [keys.birthplace] }
            }]
        }, {
            type: COMPONENTS.value,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value,
            value: { fields: [keys.description] }
        }, {
            type: COMPONENTS.value,
            value: { fields: [keys.description] }
        }];
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);