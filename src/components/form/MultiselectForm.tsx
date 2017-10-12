import React, { PureComponent } from 'react';

import { Subtitle } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';
import { FacetOption } from '../../typings/schema';
import HiddenField from './fields/HiddenField';
import { BaseButtonStyling, SmallButtonStyling } from '../layout/Button';
import translate from '../../services/translate';

interface Props {
    title: string;
    options: FacetOption[];
}

interface State {
    amountShown: number;
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

const Button = styled.button`
  ${BaseButtonStyling};
  ${SmallButtonStyling};
  margin: 1rem .5rem 0 0;
`;

class MultiSelectForm extends PureComponent<Props, State> {

    static showStep: number = 5;
    static maxAmount: number = 100;

    static renderCheckBox (option: FacetOption) {
        const name = option.name.length > MultiSelectForm.maxAmount
            ? `${option.name.substr(0, MultiSelectForm.maxAmount)}...`
            : option.name;

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
                        {name}
                        <Amount>{option.count}</Amount>
                    </label>
                </fieldset>
            </li>
        );
    }

    constructor () {
        super();

        this.state = {
            amountShown: MultiSelectForm.showStep
        };

        this.showMore = this.showMore.bind(this);
        this.showLess = this.showLess.bind(this);
    }

    render () {
        const { title, options } = this.props;
        const { amountShown } = this.state;

        const isFiltering = options.length > MultiSelectForm.showStep;
        const shownOptions = isFiltering ? options.slice(0, amountShown) : options;

        const couldDoLess = shownOptions.length - MultiSelectForm.showStep > 0;
        const couldDoMore = shownOptions.length < options.length;

        return (
            <Section>
                <Sub>{title}</Sub>
                <Dummy absolute={true} height={'1.5rem'} width={'3.5rem'} text={'toggle'}/>
                <ul>
                    {shownOptions.map(MultiSelectForm.renderCheckBox)}
                </ul>
                {
                    isFiltering && couldDoLess &&
                        <Button type={'button'} onClick={this.showLess}>{translate('search.less')}</Button>
                }
                {
                    isFiltering && couldDoMore &&
                        <Button type={'button'} onClick={this.showMore}>{translate('search.more')}</Button>
                }
            </Section>
        );
    }

    private showMore () {
        this.setState({ amountShown: this.state.amountShown + MultiSelectForm.showStep });
    }

    private showLess () {
        this.setState({ amountShown: this.state.amountShown - MultiSelectForm.showStep });

    }
}

export default MultiSelectForm;