import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { ComponentConfig } from '../../typings/schema';
import Loading from '../Loading';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { setTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { lifecycle } from 'recompose';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';

interface DispatchProps {
    setTree: (components: ComponentConfig[]) => void;
}

type FullProps = MetaDataProps & DispatchProps & RouteComponentProps<any> & FormWrapperProps;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const exampleData: ComponentConfig[] = [
    {
        type: 'TITLE',
        formatter: [],
        subComponents: [
            {
                type: 'LITERAL',
                formatter: [],
                value: 'Dit is mijn titel'
            }
        ]
    },
    {
        type: 'PATH',
        formatter: [],
        value: ''
    },
    {
        type: 'KEYVALUE',
        formatter: [],
        value: 'from',
        subComponents: [
            {
                type: 'KEYVALUE',
                formatter: [],
                value: 'from',
                subComponents: [
                    {
                        type: 'KEYVALUE',
                        formatter: [],
                        value: 'from',
                        subComponents: [
                            {
                                type: 'PATH',
                                formatter: [],
                                value: ''
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 'KEYVALUE',
        formatter: [],
        subComponents: [
            {
                type: 'PATH',
                formatter: [],
                value: ''
            }
        ]
    }
];

const ViewConfig: SFC<FullProps> = (props: FullProps) => {
    if (props.metadata.loading) {
        return <Loading/>;
    }
    // const { collection } = this.props.metadata.dataSetMetadata;
    return (
        <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
            <Section>
                <FullHelmet pageName="View screen"/>
                <Title>View screen</Title>
                <DraggableForm
                    id={0}
                    configType="view"
                    onSend={() => alert('NOTIMPL!')}
                />
            </Section>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => ({
    setTree: (components: ComponentConfig[]) => dispatch(setTree(components))
});

export default compose<SFC<{}>>(
    connect(null, mapDispatchToProps),
    withRouter,
    metaDataResolver(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    lifecycle({
        // todo remove this & add graphToState here once real data is returned by graph
        componentWillMount (nextProps: FullProps) {
            this.props.setTree(exampleData);
        }
    })
)(ViewConfig);
