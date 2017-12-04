import Loading from '../components/Loading';
import { branch, renderComponent } from 'recompose';

export default (dataProp: string = 'data') => branch((props: any) => props[dataProp].loading, renderComponent(Loading)); // TODO: Fix this any
