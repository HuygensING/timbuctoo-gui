import { BUTTON_TYPES } from '../../../constants/global';
import { Button, setBackgroundColor, setColor } from '../../layout/Button';
import styled from '../../../styled-components';

const ResetButton = styled.button`
    font: ${props => props.theme.fonts.body};
    position: absolute;
    right: 0;
    padding: .5rem 1rem;
    z-index: 2;
`;

const SubmitButton = Button.extend`
    background-color: ${props => setBackgroundColor(props, BUTTON_TYPES.normal)};
    color: ${props => setColor(props, BUTTON_TYPES.normal)};
    margin: 0;
    width: 100%;
    height: 100%;
`;

export { ResetButton, SubmitButton };