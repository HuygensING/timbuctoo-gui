import Loading from '../components/Loading';
import { branch, renderComponent, renderNothing, compose } from 'recompose';

export default <T>(dataProp: string = 'data') =>
    compose(
        // error handling is handled by the top level App component, so prevent further rendering if errors occur.
        branch<T>(props => props[dataProp].error, renderNothing),

        branch<T>(props => props[dataProp].loading, renderComponent(Loading))
    );
