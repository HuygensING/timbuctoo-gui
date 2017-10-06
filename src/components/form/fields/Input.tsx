/**
 * Base styling of fields
 */
import styled from '../../../styled-components';
import { css } from 'styled-components';

export const StandardStyledFormElements = css`
    background: #fff;
    border-radius: .25rem;
    padding: .5rem 1rem;
    width: 100%;
    font: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.shade.dark};
    border: 1px solid ${props => props.theme.colors.shade.medium};
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary.medium};
    }
`;

/**
 * text field
 */
const InputField = styled.input`
    ${StandardStyledFormElements}
`;

export default InputField;