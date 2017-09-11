import { injectGlobal } from 'styled-components';
import theme from './index';

export default () => (
    injectGlobal`
        @import url('https://fonts.googleapis.com/css?family=Droid+Serif|Roboto:300,400,500');

        * {
            box-sizing: border-box;
            background: none repeat scroll 0 0 transparent;
            border: medium none;
            border-spacing: 0;
            color: ${theme.colors.shade.dark};
            font-family: 'PT Sans Narrow',sans-serif;
            font-size: 16px;
            font-weight: normal;
            line-height: 1.42rem;
            list-style: none outside none;
            margin: 0;
            padding: 0;
            text-align: left;
            text-decoration: none;
            text-indent: 0;
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
    `
);