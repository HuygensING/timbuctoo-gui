import { EmPlaces } from '.';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import { query } from './query';
import React, { SFC } from 'react';
import graphqlWithProps from '../../services/graphqlWithProps';

class EmplacesWithData extends React.Component<
    { data: any; match: { params: { dataSet: string; collection: string } } },
    { hierarchy: { range: number; type: string } }
> {
    constructor(props: { data: any; match: { params: { dataSet: string; collection: string } } }) {
        super(props);
        this.state = { hierarchy: { range: 0, type: '' } };
    }

    render() {
        // console.log(this.props, this.props.data.dataSets, this.props.match.params.dataSet, this.props.match.params.collection)
        return (
            <EmPlaces
                place={this.props.data.dataSets[this.props.match.params.dataSet][this.props.match.params.collection]}
                onSwitchHierarchyClick={(type, range) => this.setState({ hierarchy: { range, type } })}
                selectedHierarchy={this.state.hierarchy}
            />
        );
    }
}

export default compose<SFC<{}>>(
    withRouter,
    graphqlWithProps(
        (props: { match: { params: { dataSet: string; collection: string; entry: string } } }) =>
            query(props.match.params.dataSet, props.match.params.collection),
        undefined,
        props => ({ uri: decodeURIComponent(props.match.params.entry) })
    ),
    renderLoader()
)(EmplacesWithData);
