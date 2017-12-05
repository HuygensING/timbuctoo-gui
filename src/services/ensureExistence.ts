import { branch, compose, createSink, renderComponent, shouldUpdate } from 'recompose';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { setError } from '../reducers/error';

/**
 * a HoC that checks whether a path is present in the response, if not, will seize rendering and dispatch an error.
 */

interface SinkProps {
    notFound: () => void;
}

export default <TProps>(
    path: string | ((props: TProps) => string),
    dataProp: keyof TProps = 'data' as keyof TProps
) => {
    const getPath = (props: TProps) => (typeof path === 'string' ? path : path(props));

    const enhance = compose<TProps, TProps & SinkProps>(
        connect(null, (dispatch, ownProps: TProps) => ({
            notFound: () =>
                dispatch(
                    setError([new Error(`Not found (path '${getPath(ownProps)}' did not yield any results)`)], 404)
                )
        })),
        // never updates (to prevent multiple errors needlessly being dispatched)
        shouldUpdate(() => false)
    );

    const sink = enhance(createSink(({ notFound }: SinkProps) => notFound()));

    return branch<TProps>((props: TProps) => !get(props[dataProp], getPath(props)), renderComponent(sink));
};
