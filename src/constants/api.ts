declare global {
    interface Window {
        // added in public/dynamic_env.js
        dynamicEnv: {
            REACT_APP_API_URL: string;
            REACT_APP_LOGIN_URL: string;
        };
    }
}

const { REACT_APP_API_URL, REACT_APP_LOGIN_URL } = Object.assign({}, process.env, window.dynamicEnv);

if (!REACT_APP_API_URL) {
    console.error('You forgot to add the API URL (REACT_APP_API_URL) in the .env file');
}
if (!REACT_APP_LOGIN_URL) {
    console.error('You forgot to add the LOGIN URL (REACT_APP_LOGIN_URL) in the .env file');
}

export const GRAPH_URI: string = REACT_APP_API_URL ? REACT_APP_API_URL : 'http://localhost:8080/v5/';
export const LOGIN_URL: string = `${REACT_APP_LOGIN_URL ? REACT_APP_LOGIN_URL : 'http://example.com'}`;
