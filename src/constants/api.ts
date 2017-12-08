import getEnvVar from '../services/getEnvVar';

export const GRAPH_URI = getEnvVar('REACT_APP_API_URL');
export const LOGIN_URL = getEnvVar('REACT_APP_LOGIN_URL');
