import {
    branch,
    ComponentEnhancer,
    compose,
    createSink,
    renderComponent,
    renderNothing,
    shouldUpdate
} from 'recompose';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { setError } from '../reducers/error';
import { QueryProps } from 'react-apollo';

/**
 * a HoC that checks whether a path is present in the response, if not, will seize rendering and dispatch an error.
 */

interface SinkProps {
    notFound: () => void;
}

type DataProps<TProps, K extends keyof TProps> = { [P in K]: QueryProps };

export const handleError = <TProps extends DataProps<TProps, K>, K = keyof TProps>(dataProp: K) =>
    branch<TProps>((props: any) => !!props[dataProp].error, renderNothing);

const ensureExistence = <TProps>(path: string | ((props: TProps) => string), dataProp: keyof TProps) => {
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

const verifyResponse = <TProps extends DataProps<TProps, K>, K extends keyof TProps>(
    dataProp: K,
    path: string | ((props: TProps) => string)
): ComponentEnhancer<TProps, TProps> => compose<TProps, TProps>(handleError(dataProp), ensureExistence(path, dataProp));

export default verifyResponse;
