import getEnvVar from '../services/getEnvVar';

let API_URL = getEnvVar('REACT_APP_BACKEND_URL');
if (API_URL.endsWith('/')) {
    API_URL = API_URL.replace(/\/+$/, '');
}

export const GRAPH_URI = API_URL + '/graphql';
export const LOGIN_URL = API_URL + '/login';
export const dataSetUploadUrl = (ownerId: string, dataSetName: string) =>
    `${API_URL}/${ownerId}/${dataSetName}/upload/rdf`;
