import styled from 'styled-components';
import CreateElementWithTag from '../../services/CreateElementWithTag';
import {Color, Colors, Fonts, ThemeProps} from '../../typings/layout';

const setColor = props => props.colors[props.color].medium || props.color || props.colors.shade.dark;
const setCaps = props => props.isCaps ? 'uppercase' : 'initial';
const setLetterSpacing = props => props.isCapse ? '0.13em' : '0';

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title tag='h1' size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Title = styled((props:ThemeProps) =>  CreateElementWithTag(props, 'h1'))`
    margin: 1.1vw 0;
    font: ${(props: ThemeProps) => props.fonts.heading};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`
;

/*
* Subtitle
* Available props: TextProps
*
* Usage:
* <Subtitle tag='h2' size='m' weight='light' color='quarts' isCaps={true}>This is a subtitle</Subtitle>
*/
export const Subtitle = styled((props: ThemeProps) => CreateElementWithTag(props, 'h2'))`
    margin: 1.1vw 0;
    font: ${(props: ThemeProps) => props.fonts.title};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
* Content
* Available props: TextProps
*
* Usage:
* <Content tag='p' size='m' weight='medium' color='quarts' isCaps={false}>This is some content</Content>
*/
export const Content = styled((props: ThemeProps) => CreateElementWithTag(props, 'p'))`
    margin: 0;
    font: ${(props: ThemeProps) => props.fonts.body};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
 * Label
 * Available props: TextProps
 *
 * Usage:
 * <Label tag='span' size='xl' weight='semibold' color='quarts' isCaps={false}>This is a label</Label>
 */
export const Label = styled((props: ThemeProps) => CreateElementWithTag(props, 'span'))`
    margin: 0;
    font: ${(props: ThemeProps) => props.fonts.small};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
 `;

/*
 * Link
 * Available props: LinkProps
 *
 * Usage:
 * <Link to="/route" >
 */

interface LinkProps {
    /*
     * React Router specific
     */
    to: string | Object;
    exact: boolean;
    replace: boolean;

    /*
     * StyledCopy specific
     */
    children: any;
    tag: string;
    size: string;
    color: Color;
    colors: Colors;
    fonts: Fonts;
    hoverColor: 'primary' | 'shade' | string;
    weight: string;
    isCaps: boolean;
}

export const Link = styled((props: LinkProps) => CreateElementWithTag(props, 'Link'))`
    margin: 0;
    
    font: ${(props: LinkProps) => props.fonts.body};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};

    text-decoration: none;
    
    line-height: 1.6;

    &:hover {
        color: ${(props: LinkProps) => props.colors[props.hoverColor].medium || props.hoverColor || props.colors.shade.dark};
    }
`;