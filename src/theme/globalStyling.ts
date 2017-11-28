import { injectGlobal } from 'styled-components';

export default () =>
    injectGlobal`
        @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            border: 0;
            font: inherit;
            vertical-align: baseline;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        button {
          background: none;
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

            font-size: 1rem;
            font-family: 'Roboto', sans-serif;
        }
        button::-moz-focus-inner,
        input::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
    `;
