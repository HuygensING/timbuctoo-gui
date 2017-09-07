import { css } from '../../styled-components';

export const MenuButtonStyle = css`
    padding: .25rem 1rem;
    border: 1px solid #fff;
    border-radius: .25rem;
    position: absolute;
    background: transparent;
    font: ${props => props.theme.fonts.body};
    right: 1rem;
    top: 50%;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transform: translateY(-50%);
`;