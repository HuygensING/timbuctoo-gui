import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { ComponentConfig } from '../../typings/schema';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { denormalizeTree, setTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { lifecycle } from 'recompose';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import { RootState } from '../../reducers/rootReducer';

interface StateProps {
    denormalizeTree: () => ComponentConfig[];
}

interface DispatchProps {
    setTree: (components: ComponentConfig[]) => void;
}

type FullProps = MetaDataProps & StateProps & DispatchProps & RouteComponentProps<any> & FormWrapperProps;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const exampleData: ComponentConfig[] = [];

const ViewConfig: SFC<FullProps> = props => {
    const onSubmit = () => {
        const tree = props.denormalizeTree();
        console.log(tree);
    };

    return (
        <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
            <Section>
                <FullHelmet pageName="View screen" />
                <Title>View screen</Title>
                <DraggableForm id={0} configType="view" onSend={onSubmit} />
            </Section>
        </Grid>
    );
};

const mapStateToProps = (state: RootState) => ({
    denormalizeTree: () => denormalizeTree(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { match }: RouteComponentProps<{ collection: string }>) => ({
    setTree: (components: ComponentConfig[]) => dispatch(setTree(components, match.params.collection))
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        // todo remove this & add graphToState here once real data is returned by graph
        componentWillMount() {
            this.props.setTree(exampleData);
        }
    })
)(ViewConfig);
