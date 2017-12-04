import Loading from '../components/Loading';
import { branch, renderComponent } from 'recompose';

export default <T>(dataProp: string = 'data') => branch<T>(props => props[dataProp].loading, renderComponent(Loading));
