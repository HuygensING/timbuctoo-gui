import { injectGlobal } from 'styled-components';

export default () => (
    injectGlobal`
        @import url('https://fonts.googleapis.com/css?family=Droid+Serif|Roboto:300,400,500');

        * {
            box-sizing: border-box;
        }
        // html {
        //     overflow-y: scroll;
        // }
        // body {
        //     overflow-y: hidden;
        // }
        html, body {
            // overflow-x: hidden;
            // -webkit-overflow-scrolling: touch;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;

            font-size: 1rem;
            font-family: 'Roboto', sans-serif;
        }
    `
);