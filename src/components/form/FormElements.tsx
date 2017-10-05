import styled, { css } from '../../styled-components';
import { BaseButtonStyling, setBackgroundColor, setColor } from '../layout/Button';

const checkMark = require('../../assets/icons/checkmark.svg');

import SelectField from './fields/Select';
import { srOnly } from '../layout/StyledCopy';
import { BUTTON_TYPES } from '../../constants/global';

/**
 * Base styling of fields
 */
const StandardStyledFormElements = css`
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

/**
 * Checkbox
 */
const HiddenField = styled.input`
    ${srOnly}
    ~ label {
        font: ${props => props.theme.fonts.body};  
        color: ${props => props.theme.colors.black};
        cursor: pointer;
        width: 100%;      
        padding: .25rem 0 .25rem 2rem;
        position: relative;
        display: block;
        &:before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            display: block;
            width: 1rem;
            height: 1rem;
            border: 1px  solid ${props => props.theme.colors.shade.medium};
            border-radius: .125rem;
        }
    }
    &:checked ~ label:before {
        border-color: ${props => props.theme.colors.black};
        background-image: url(${checkMark});
        background-size: 1rem 1rem;
        background-repeat: no-repeat;
        background-color: ${props => props.theme.colors.shade.dark};
    }
`;

/**
 * Reset button
 *
 */
const ResetButton = styled.button`
    font: ${props => props.theme.fonts.body};
    position: absolute;
    right: 0;
    padding: .5rem 1rem;
    z-index: 2;
`;

/**
 * Submit button
 */
const SubmitButton = styled.button`
    ${BaseButtonStyling};
    background-color: ${props => setBackgroundColor(props, BUTTON_TYPES.normal)};
    color: ${props => setColor(props, BUTTON_TYPES.normal)};
    margin: 0;
    width: 100%;
    height: 100%;
`;

export { StandardStyledFormElements, InputField, HiddenField, SelectField, SubmitButton, ResetButton };