import React, { SFC } from 'react';

import { Subtitle } from '../layout/StyledCopy';
import { HiddenField } from './FormElements';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';
import { Option } from '../../typings/timbuctoo/schema';

interface Props {
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    title: string;
    options: Option[];
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

const MultiSelectForm: SFC<Props> = ({title, options}) => {
    const renderCheckBox = (option: Option) => {
        return (
            <li key={option.name}>
                <fieldset>
                    <HiddenField
                        name={option.name}
                        id={option.name}
                        component={'input'}
                        type={'checkbox'}
                    />
                    <label htmlFor={option.name}>{option.name}<Amount>{option.count}</Amount></label>
                </fieldset>
            </li>
        );
    };

    return (
        <Section>
            <Sub>{title}</Sub>
            <Dummy absolute={true} height={'1.5rem'} width={'3.5rem'} text={'toggle'}/>
            <ul>
                {options.map(renderCheckBox)}
            </ul>
        </Section>
    );
};

export default MultiSelectForm;