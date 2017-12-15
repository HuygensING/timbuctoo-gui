import { BUTTON_VARIANT } from '../../../constants/global';
import { Button, setBackgroundColor, setColor } from '../../layout/Button';
import styled from '../../../styled-components';

const ResetButton = styled.button`
    font: ${props => props.theme.fonts.body};
    padding: 0.5rem 1rem;
`;

const SubmitButton = Button.extend`
    background-color: ${props => setBackgroundColor(props, BUTTON_VARIANT.normal)};
    color: ${props => setColor(props, BUTTON_VARIANT.normal)};
    margin: 0;
    width: auto;
    margin-left: 1rem;
    height: 100%;
`;

export { ResetButton, SubmitButton };
