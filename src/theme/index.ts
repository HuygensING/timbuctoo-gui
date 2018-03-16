import { lighten, darken } from 'polished/lib';
import { ThemeProps } from '../typings/layout';
import getEnvVar from '../services/getEnvVar';

const COLORS = {
    theme: getEnvVar('REACT_APP_PRIMARY_COLOR'),
    white: '#FFFFFF' /* white */,
    lightGrey: '#EBEBEB' /* Ash grey */,
    grey: '#888888' /* Taupe gray */,
    darkGrey: '#5C5C5C' /* Davy's grey */,
    black: '#323232' /* Olive Drab #7 */,
    red: '#D0021B'
};

const theme: ThemeProps = {
    colors: {
        primary: {
            light: lighten(0.1, COLORS.theme),
            medium: COLORS.theme,
            dark: darken(0.1, COLORS.theme)
        },
        shade: {
            light: COLORS.lightGrey,
            medium: COLORS.grey,
            dark: COLORS.darkGrey
        },
        error: COLORS.red,
        white: COLORS.white,
        black: COLORS.black
    },
    fonts: {
        heading: '500 2.5rem/1.2 Roboto, sans-serif',
        heroTitle: '500 4.5rem/1.2 Roboto, sans-serif',
        title: '500 1.5rem/1.2 Roboto, sans-serif',
        subTitle: '500 1rem/1.2 Roboto, sans-serif',
        body: '400 .875rem/1.6 Roboto, sans-serif'
    }
};

export default theme;
