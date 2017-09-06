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
            medium: COLORS.timbuctooGreen
        },
        shade: {
            light: COLORS.white,
            medium: COLORS.grey,
            dark: COLORS.darkGrey
        }
    },
    fonts: {
        heading: '400 2.5rem/1.2 Droid serif, sans-serif',
        title: '400 1.5rem/1.2 Droid serif, sans-serif',
        subTitle: '400 1.25rem/1.2 Droid serif, sans-serif',
        body: '400 1rem/1.6 Roboto, sans-serif',
        small: '400 .75rem/1.6 Roboto, sans-serif'
    },
};

export default theme;