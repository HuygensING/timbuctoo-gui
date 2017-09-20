import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { DataSets, DataKeyValue, DataTable } from '../../typings/timbuctoo/schema';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

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

const VALUE_STRING: string = 'ValueString';
const DATA_TABLE: string = 'DataTable';
const DATA_KEY_VALUE: string = 'DataKeyValue';

class Entry extends PureComponent<FullProps, State> {

    static getValues(components: Array<any>): Array<string> {
        let values: Array<string> = [];
        components.forEach(component => Entry.getValue(component, values));
        return values;
    }

    static getValue(component: any, values: Array<string>) {
        switch (component.__typename) {
            case VALUE_STRING:
                if (values.indexOf(component.valueKey) < 0) { values.push(component.valueKey); }
                if (values.indexOf(component.urlKey) < 0) { values.push(component.urlKey); }
                break;

            case DATA_KEY_VALUE:
                if (component.values) {
                    component.values.forEach((_component: DataKeyValue) => Entry.getValue(_component, values));
                }
                break;

            case DATA_TABLE:
                if (component.tableColumns) {
                    component.tableColumns.forEach(column => {
                        if (column.cells) {
                            column.cells.forEach((_component: DataTable) => Entry.getValue(_component, values));
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

        const components = dataSet.metadata.collections.items[0].components.items;
        const values: Array<string> = Entry.getValues(components);

        return (
            <EntryBody
                components={components}
                values={values}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);