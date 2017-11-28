import { css } from '../../styled-components';

export const MenuButtonStyle = css`
    padding: 0.25rem 1rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
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
