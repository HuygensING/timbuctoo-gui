import React, { SFC } from 'react';

import { Subtitle } from '../layout/StyledCopy';
import { HiddenField } from './FormElements';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';

interface Props {
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    title: string;
    selection: string[];
}

const Section = styled.section`
    position: relative;
    display: block;
    float: left;
    width: 100%;
    margin-bottom: 3.75rem;
`;

const Sub = styled(Subtitle)`
    margin-top: 0;
`;

const Amount = styled.span`
   float: right;
`;

const MultiSelectForm: SFC<Props> = ({title, selection}) => {
    const renderCheckBox = key => {
        return (
            <li key={key}>
                <fieldset>
                    <HiddenField
                        name={key}
                        id={key}
                        component={'input'}
                        type={'checkbox'}
                    />
                    <label htmlFor={key}>{key}<Amount>10</Amount></label>
                </fieldset>
            </li>
        );
    };

    return (
        <Section>
            <Sub>{title}</Sub>
            <Dummy absolute={true} height={'1.5rem'} width={'3.5rem'} text={'toggle'}/>
            <ul>
                {selection.map(renderCheckBox)}
            </ul>
        </Section>
    );
};

export default MultiSelectForm;