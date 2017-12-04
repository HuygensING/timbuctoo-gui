import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { lifecycle, shallowEqual } from 'recompose';
import { graphToState, GraphToStateAction } from '../reducers/rootReducer';

/**
 * A simple HoC that can be bound around a component that's wrapped with `react-apollo`'s `graphql`.
 * This will a) allow us to keep using functional components and b) cut down on boilerplate code like connecting the reducer, and dispatching data to the state once it's ready.
 * It also sets a global uniform way to move data from the graph to the state.
 * @param {string} action Action that will be dispatched whenever the data prop changes.
 * @param {string} dataProp Prop that will be dispatched to reducer. By default it's data, but this option can be used in case it got remapped to something else (e.g. 'metadata')
 * @param {boolean} dispatchOnUpdate Dispatch action also when the data in the graph changes (defaults to false)
 */
export default <Props>(action: GraphToStateAction['type'], dataProp: keyof Props, dispatchOnUpdate: boolean = false) =>
    compose(
        connect(null, (dispatch: Dispatch<Props>) => ({
            graphToState: (payload: any): any => dispatch(graphToState(action, payload))
        })),
        lifecycle<Props & { graphToState: (payload: any) => void }, {}>({
            componentWillMount() {
                this.props.graphToState(this.props[dataProp]);
            },
            ...dispatchOnUpdate
                ? {
                      componentWillReceiveProps(nextProps: Props) {
                          if (
                              dataProp in nextProps &&
                              !shallowEqual(nextProps[dataProp] as any, this.props[dataProp])
                          ) {
                              this.props.graphToState(nextProps[dataProp]);
                          }
                      }
                  }
                : null
        })
    );
