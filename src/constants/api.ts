import getEnvVar from '../services/getEnvVar';

let API_URL = getEnvVar('REACT_APP_BACKEND_URL');
if (API_URL.endsWith('/')) {
    API_URL = API_URL.replace(/\/+$/, '');
}

export const GRAPH_URI = API_URL + '/v5/graphql';
export const LOGIN_URL = getEnvVar('REACT_APP_LOGIN_URL');
export const dataSetUploadUrl = (ownerId: string, dataSetName: string) =>
    `${API_URL}/v5/${ownerId}/${dataSetName}/upload/rdf`;
