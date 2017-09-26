import React, { SFC } from 'react';

import FormWrapper from './FormWrapper';
import Select, { OptionProps } from './fields/Select';
import styled, { withProps } from '../../styled-components';
import { Option } from '../../typings/timbuctoo/schema';

interface Props {
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    title: string;
    options?: Option[];
}

interface SectionProps {
    fill?: boolean;
}

const Section = withProps<SectionProps>(styled.section)`
    position: relative;
    display: block;
    float: left;
    width: ${props => props.fill ? '100%' : '200px'};
    margin-bottom: 3.75rem;
`;

const TempData: OptionProps[] = [];
const randomStrings = ['Lorem ipsum', 'Dolor set', 'Amit'];
for (let i = 0, limit = 10; i < limit; i++) {
    TempData.push({
        key: `${randomStrings[Math.floor(Math.random() * randomStrings.length)]} ${i}`,
        value: `value-${i}`
    });
}

const DropdownForm: SFC<Props> = ({title}) => {

    const onSubmit = (e) => {
        console.log('selected value', title, e[title]);
    };

    return (
        <Section fill={false}>
            <FormWrapper form={'filter'} onChange={onSubmit}>
                <Select name={title} options={TempData} onChange={onSubmit} />
            </FormWrapper>
        </Section>
    );
};

export default DropdownForm;