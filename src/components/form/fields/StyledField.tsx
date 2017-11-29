import styled from '../../../styled-components';
import { BREAKPOINT } from '../../layout/Grid';

export const FieldContainer = styled.div`
    width: 100%;
`;

export const FieldValue = styled.div`
    flex: 2;
`;

export const FieldLabel = styled.label`
    flex: 2;
    max-width: 30%;

    @media (min-width: ${BREAKPOINT.MOBILE}) {
        max-width: 20%;
    }
`;

export const Field = styled.div`
    display: Flex;
    margin: 1rem 0;
`;
