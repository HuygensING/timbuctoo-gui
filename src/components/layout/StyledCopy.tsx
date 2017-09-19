import styled, { css } from '../../styled-components';
import CreateElementWithTag from '../../services/CreateElementWithTag';
import { ElementProps, LinkProps } from '../../typings/layout';
import { keyframes } from '../../styled-components';
import { lighten } from 'polished';

const setColor = props => (props.theme.colors[props.color] && props.theme.colors[props.color].medium)
    || props.color
    || props.theme.colors.shade.dark;
const setCaps = props => props.isCaps ? 'uppercase' : 'initial';
const setLetterSpacing = props => props.isCaps ? '0.13em' : '0';
const setAlignment = props => props.align ? props.align : 'left';

const anim = keyframes`
    from {
        transform: translateX(-100%);
    }
    
    to {
        transform: translateX(100%);
    }
`;

const EmptyStyle = css`
    &:empty {
        width: 100%;
        display: block;
        background: ${props => lighten(.2, props.theme.colors.shade.light)};
        height: 1.5rem;
        
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1.5rem;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 100%);           
            animation: ${anim} 1.7s infinite;
            opacity: .5;
        }
    }
`;

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title tag='h1' size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Heading = styled((props: ElementProps) => CreateElementWithTag(props, 'h1'))`
    margin: 1.1vw 0;
    font: ${props => props.theme.fonts.heading};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title tag='h1' size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Title = styled((props: ElementProps) => CreateElementWithTag(props, 'h1'))`
    margin: 1.1vw 0;
    font: ${props => props.theme.fonts.title};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
    
    ${EmptyStyle}
`;

/*
* Subtitle
* Available props: TextProps
*
* Usage:
* <Subtitle tag='h2' size='m' weight='light' color='quarts' isCaps={true}>This is a subtitle</Subtitle>
*/
export const Subtitle = styled((props: ElementProps) => CreateElementWithTag(props, 'h2'))`
    margin: 1.1vw 0;
    font: ${(props) => props.theme.fonts.subTitle};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
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
export const Content = styled((props: ElementProps) => CreateElementWithTag(props, 'p'))`
    margin: 0;
    font: ${(props) => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
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
export const Label = styled((props: ElementProps) => CreateElementWithTag(props, 'span'))`
    margin: 0;
    font: ${(props) => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
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

export const Link = styled((props: ElementProps & LinkProps) => CreateElementWithTag(props, 'Link'))`
    margin: 0;
    font: ${(props) => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};

    text-decoration: none;
    
    &:hover {
        color: ${(props) => 
        (props.hoverColor && props.theme.colors[props.hoverColor] && props.theme.colors[props.hoverColor].medium ) 
        || props.hoverColor 
        || props.theme.colors.shade.dark};
    }
`;

export const srOnly = css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
`;