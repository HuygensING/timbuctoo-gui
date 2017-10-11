import React, { PureComponent } from 'react';

import { Subtitle } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';
import { FacetOption } from '../../typings/schema';
import HiddenField from './fields/HiddenField';

interface Props {
    title: string;
    options: FacetOption[];
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

class MultiSelectForm extends PureComponent<Props> {
    render () {
        const { title, options } = this.props;
        return (
            <Section>
                <Sub>{title}</Sub>
                <Dummy absolute={true} height={'1.5rem'} width={'3.5rem'} text={'toggle'}/>
                <ul>
                    {options.map(this.renderCheckBox)}
                </ul>
            </Section>
        );
    }

    private renderCheckBox (option: FacetOption) {
        return (
            <li key={option.name}>
                <fieldset>
                    <HiddenField
                        name={option.name}
                        id={option.name}
                        value={option.name}
                        type={'checkbox'}
                    />
                    <label htmlFor={option.name}>
                        {option.name}
                        <Amount>{option.count}</Amount>
                    </label>
                </fieldset>
            </li>
        );
    }
}

export default MultiSelectForm;