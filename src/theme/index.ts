import { lighten, darken } from 'polished/lib';
import { ThemeProps } from '../typings/layout';

const COLORS = {
    timbuctooGreen: '#269075',
    white: '#FFFFFF',
    grey: '#B8B8B8',
    darkGrey: '#2A292A'
};

const theme: ThemeProps = {
    colors: {
        primary: {
            light: lighten(0.1, COLORS.timbuctooGreen),
            medium: COLORS.timbuctooGreen,
            dark: darken(0.1, COLORS.timbuctooGreen)
        },
        shade: {
            light: COLORS.white,
            medium: COLORS.grey,
            dark: COLORS.darkGrey
        }
    },
    fonts: {
        heading: '400 2.5rem/1.2 Roboto, sans-serif',
        title: '400 1.5rem/1.2 Roboto, sans-serif',
        subTitle: '400 1.25rem/1.2 Roboto, sans-serif',
        body: '400 1rem/1.6 Roboto, sans-serif',
        small: '400 .75rem/1.6 Roboto, sans-serif'
    },
};

export default theme;