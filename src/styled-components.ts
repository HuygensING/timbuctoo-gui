import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { ThemeProps } from './typings/layout';

type StyledFunction<T> = styledComponents.ThemedStyledFunction<T, ThemeProps>;

function withProps<T, U extends HTMLElement = HTMLElement>(
    styledFunction: StyledFunction<React.HTMLProps<U>>,
): StyledFunction<T & React.HTMLProps<U>> {
    return styledFunction;
}

const {
    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeProps>;

export { css, injectGlobal, keyframes, ThemeProvider, withProps };

export default styled;