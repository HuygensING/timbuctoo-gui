import styled from 'styled-components';
import { srOnly } from '../../layout/StyledCopy';

const checkMark = require('../../../assets/icons/checkmark.svg');

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

export default HiddenField;