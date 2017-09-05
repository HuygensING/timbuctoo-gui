import { injectGlobal } from 'styled-components';

export default () =>  {
    injectGlobal`
        * {
            box-sizing: border-box;
        }
        html {
            overflow-y: scroll;
        }
        body {
            overflow-y: hidden;
        }
        html, body {
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
`;
}