import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { DataSets, KeyValueComponent, TableComponent } from '../../typings/timbuctoo/schema';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import { COMPONENTS } from '../../constants/global';

import { getDataSet } from '../../services/GetDataSet';
import EntryBody from '../entry/EntryBody';
import Loading from '../Loading';

interface Props {
}

interface ApolloProps {
    data: {
        dataSets: DataSets;
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
        switch (component.__typename) {
            case COMPONENTS.value:
            case COMPONENTS.image:
            case COMPONENTS.link:
                Entry.addUnique(component.valueKey, values);
                Entry.addUnique(component.urlKey, values);
                Entry.addUnique(component.altKey, values);
                break;

            case COMPONENTS.keyValue:
                if (component.values) {
                    component.values.forEach((_component: KeyValueComponent) => Entry.getValue(_component, values));
                }
                break;

            case COMPONENTS.table:
                if (component.tableColumns) {
                    component.tableColumns.forEach(column => {
                        if (column.cells) {
                            column.cells.forEach((_component: TableComponent) => Entry.getValue(_component, values));
                        }
                    });
                }
                break;
            
            default:
                break;
        }
    }

    render () {
        const dataSet = getDataSet(this.props);
        if ( !dataSet ) { return <Loading />; }
        
        const collections = dataSet.metadata.collections.items;
        if (!collections.length) { return null; }
        
        const components = collections[0].components.items || this.dummyComponents();

        const values: Array<string> = Entry.getValues(components);

        return (
            <EntryBody
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
            __typename: COMPONENTS.title,
            valueKey: keys.name
        }, {
            __typename: COMPONENTS.image,
            urlKey: keys.image,
            altKey: keys.image,
            options: {
                width: '50%',
                type: 'rounded',
                ratio: 1
            }
        }, {
            __typename: COMPONENTS.divider,
            title: 'Personal info'
        }, {
            __typename: COMPONENTS.keyValue,
            key: 'Name',
            values: [{
                __typename: COMPONENTS.value,
                valueKey: keys.name
            }]
        }, {
            __typename: COMPONENTS.keyValue,
            key: 'Born',
            values: [{
                __typename: COMPONENTS.value,
                valueKey: keys.name
            }, {
                __typename: COMPONENTS.value,
                valueKey: keys.birthplace
            }]
        }, {
            __typename: COMPONENTS.keyValue,
            key: 'Beroep',
            values: [{
                __typename: COMPONENTS.value,
                valueKey: keys.name
            }, {
                __typename: COMPONENTS.link,
                valueKey: keys.url
            }, {
                __typename: COMPONENTS.link,
                valueKey: keys.url
            }]
        }, {
            __typename: COMPONENTS.divider,
            title: 'More info'
        }, {
            __typename: COMPONENTS.keyValue,
            key: 'Description',
            values: [{
                __typename: COMPONENTS.value,
                valueKey: keys.description
            }, {
                __typename: COMPONENTS.image,
                urlKey: keys.image,
                altKey: keys.image
            }, {
                __typename: COMPONENTS.divider,
                valueKey: 'Sub-info'
            }, {
                __typename: COMPONENTS.keyValue,
                key: 'Cat name',
                values: [{
                    __typename: COMPONENTS.value,
                    valueKey: keys.description
                }, {
                    __typename: COMPONENTS.image,
                    urlKey: keys.image,
                    altKey: keys.image
                }]
            }]
        }, {
            __typename: COMPONENTS.divider,
            title: 'Other info'
        }, {
            __typename: COMPONENTS.value,
            valueKey: keys.description
        }, {
            __typename: COMPONENTS.image,
            urlKey: keys.image,
            altKey: keys.image,
            options: {
                ratio: 16 / 9
            }
        }, {
            __typename: COMPONENTS.keyValue,
            key: 'Bio',
            values: [{
                __typename: COMPONENTS.value,
                valueKey: keys.name
            }, {
                __typename: COMPONENTS.value,
                valueKey: keys.birthplace
            }]
        }, {
            __typename: COMPONENTS.value,
            valueKey: keys.description
        }, {
            __typename: COMPONENTS.value,
            valueKey: keys.description
        }, {
            __typename: COMPONENTS.value,
            valueKey: keys.description
        }, {
            __typename: COMPONENTS.value,
            valueKey: keys.description
        }];
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);