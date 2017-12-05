import { branch, renderNothing } from 'recompose';

// error handling is handled by the top level App component, so this will prevent further rendering if errors occur.

export default <T>(dataProp: string = 'data') => branch<T>((props: any) => props[dataProp].error, renderNothing);
