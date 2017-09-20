import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';
import { RouteComponentProps } from 'react-router';
import GridSection from '../layout/GridSection';

import ComponentLoader from '../../services/ComponentLoader';

import { VALUE_STRING, DATA_KEY_VALUE, DATA_TABLE } from '../../services/ComponentLoader';
import KeyValue from '../entry/KeyValue';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

interface Props {
}

interface State {
}

class Entry extends Component<Props & RouteComponentProps<any>, State> {

    static renderDataInTemplate(data, index) {
        return FakeComponents.items.map((component, index) => Entry.renderTemplate(component, index, data));
    }

    static renderTemplate(component, index, data) {
        // let value: String = '';
        // let url: String = '';
        // switch (component.) {
        //     case LINK:
        //         value = data[component.type.value];
        //         url = data[component.type.url];
        //         break;
                
        //     case STRING:
        //     default:
        //         value = data[component.type.value];
        //         break;
        // }

        console.log( 'component', component );

        return <ComponentLoader component={component} />;
    }

    render () {
        const { dataSet, entry } = this.props.match.params;

        if (!dataSet || !entry) { return null; }

        return (
            <section>
                <FullHelmet pageName={`Entry - ${entry}`}/>
                <Col sm={28} smOffset={10} smPaddingTop={2}>

                    {FakeData && FakeData.map(Entry.renderDataInTemplate)}

                    <Title>{entry}</Title>
                    <KeyValue label={'label'} value={'valueeee'} />

                    <Dummy text={`Image`} height={10} mvp={true} marginY={.5}/>
                    <Dummy text={`entry ${entry}`} mvp={true} height={2} marginY={.5}/>
                    <Dummy text={`dataset ${dataSet}`} mvp={true} height={2} marginY={.5}/>

                    <GridSection title={''} gridSize={28} gridOffset={0} colSizeOffset={.5} cols={2} gridSpacing={1}>
                        <Dummy text={'Key'} mvp={true} height={1} marginY={.5}/>
                        <Dummy text={'value'} mvp={true} height={1} marginY={.5}/>
                        <Dummy text={'Key'} mvp={true} height={1} marginY={2.5}/>
                        <Dummy text={'value'} mvp={true} height={1} marginY={2.5}/>
                    </GridSection>
                </Col>
            </section>
        );
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);

const FakeData = [{
    schema_org_name: 'Fake name',
    schema_org_description: 'Lorem ipsum dolor set amit',
    schema_org_imageUrl: 'http://lorempixel.com/400/400/cats/',
    schema_org_url: 'http://google.nl'
}, {
    schema_org_name: 'Fake name 2',
    schema_org_description: '',
    schema_org_imageUrl: 'http://lorempixel.com/200/400/cats/',
    schema_org_url: 'http://facebook.com'
}];

const STRING: string = 'STRING';
const LINK: string = 'LINK';
const randomType = () => Math.random() > 0.25 ? STRING : LINK;

const FakeValueString = {
    __typename: VALUE_STRING,
    type: randomType(),
    value: 'schema_org_name',
    url: 'schema_org_url'
};

const FakeDataKeyValue = {
    __typename: DATA_KEY_VALUE,
    key: 'schema_org_name',
    values: [FakeValueString, FakeValueString, FakeValueString]
};

const FakeColumn = {
    columnName: 'Fake column name',
    cells: [FakeValueString, FakeDataKeyValue, FakeValueString]
};

const FakeComponents = {
    items: [
        FakeValueString,
        FakeValueString,
        FakeDataKeyValue,
        {
            __typename: DATA_TABLE,
            hasHeading: true,
            tableColumns: [FakeColumn, FakeColumn, FakeColumn]
        }
    ]
};