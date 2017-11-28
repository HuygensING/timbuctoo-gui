import { compose } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, shallowEqual } from 'recompose';
import { graphToState } from '../reducers/rootReducer';

/**
 * A simple HoC that can be bound around a component that's wrapped with `react-apollo`'s `graphql`.
 * This will a) allow us to keep using functional components and b) cut down on boilerplate code like connecting the reducer, and dispatching data to the state once it's ready.
 * It also sets a global uniform way to move data from the graph to the state.
 * @param {string} key Reducer key under which reducer the graph data should be stored. Reducers are themselves responsible for correctly handling this key.
 * @param {string} dataProp Prop that will be dispatched to reducer. By default it's data, but this option can be used in case it got remapped to something else (e.g. 'metadata')
 * @param {string} prop Connects the reducer key to the component. Defaults to `key` name, so pass this argument if you need a different name.
 */

export default (key: string, dataProp: string = 'data', prop: string = key) => (
    compose(
        connect(
            state => ({ [key]: state[key] }),
            dispatch => ({ graphToState: (payload: any) => dispatch(graphToState(key, payload)) })
        ),
        lifecycle({
            componentWillReceiveProps (nextProps: any) {
                if (!shallowEqual(nextProps[dataProp], this.props[dataProp])) {
                    this.props.graphToState(nextProps[dataProp]);
                }
            }
        })
    )
);