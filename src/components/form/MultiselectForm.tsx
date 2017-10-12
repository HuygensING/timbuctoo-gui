import React, { PureComponent } from 'react';

import { Subtitle } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';
import { FacetOption } from '../../typings/schema';
import { BaseButtonStyling, SmallButtonStyling } from '../layout/Button';
import translate from '../../services/translate';
import MultiselectFormOption from './MultiselectFormOption';

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

const Button = styled.button`
  ${BaseButtonStyling};
  ${SmallButtonStyling};
  margin: 1rem .5rem 0 0;
`;

class MultiSelectForm extends PureComponent<Props, State> {
    static showStep = 5;

    state = { amountShown: MultiSelectForm.showStep };

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
                    {
                        shownOptions.map((option, idx) => (
                            <MultiselectFormOption key={idx} option={option}/>
                        ))
                    }
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

    private showMore = () => {
        this.setState(
            (prevState: State) => ({ amountShown: prevState.amountShown + MultiSelectForm.showStep })
        );
    }

    private showLess = () => {
        this.setState(
            (prevState: State) => ({ amountShown: prevState.amountShown - MultiSelectForm.showStep })
        );
    }
}

export default MultiSelectForm;