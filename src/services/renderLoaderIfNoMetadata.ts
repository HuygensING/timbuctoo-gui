import Loading from '../components/Loading';
import { branch, renderComponent } from 'recompose';

export default branch(
    props => props.metadata.loading || !props.metadata.dataSetMetadata,
    renderComponent(Loading)
);