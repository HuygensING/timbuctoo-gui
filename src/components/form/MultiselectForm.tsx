import React, { PureComponent, SFC } from 'react';

import { sortBy, partition } from 'lodash';

import { connect, Dispatch } from 'react-redux';

import { Subtitle } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { Dummy } from '../Dummy';
import translate from '../../services/translate';
import MultiselectFormOption from './MultiselectFormOption';
import { EsFilter, EsValue, toggleFilter } from '../../reducers/search';
import { RootState } from '../../reducers/rootReducer';
import { Button as ButtonBase } from '../layout/Button';
import { compose } from 'redux';

interface Props {
    filter: EsFilter;
    index: number;
}

interface StateProps {
    filters: EsFilter[];
    updateField: (index: number, value: string, filters: EsFilter[]) => void;
}

type FullProps = Props & StateProps;

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

const Button = ButtonBase.extend`
    margin: 1rem 0.5rem 0 0;
`;

class MultiSelectForm extends PureComponent<FullProps, State> {
    static showStep = 5;
    state = { amountShown: MultiSelectForm.showStep };

    static sortGroup = (group: EsValue[]): EsValue[] => {
        let array: EsValue[] = [];

        const splitGroups = partition(group, val => val.selected);

        splitGroups.forEach(splitGroup => {
            const sortedSplitGroup = sortBy(splitGroup, val => val.count).reverse();
            array = array.concat(sortedSplitGroup);
        });

        return array;
    };

    public toggleField = (val: string) => {
        this.props.updateField(this.props.index, val, this.props.filters);
    };

    render() {
        const { caption, values } = this.props.filter;
        const { amountShown } = this.state;

        const selection = MultiSelectForm.sortGroup(values);

        const isFiltering = values.length > MultiSelectForm.showStep;
        const shownOptions = isFiltering ? selection.slice(0, amountShown) : selection;

        const couldDoLess = shownOptions.length - MultiSelectForm.showStep > 0;
        const couldDoMore = shownOptions.length < values.length;

        return (
            <Section>
                <Sub>{caption}</Sub>
                <Dummy absolute={true} height={'1.5rem'} width={'3.5rem'} text={'toggle'} />
                <ul>
                    {shownOptions.map((option, idx) => (
                        <MultiselectFormOption key={idx} option={option} onToggle={this.toggleField} />
                    ))}
                </ul>
                {isFiltering &&
                    couldDoLess && (
                        <Button data-small={true} onClick={this.showLess}>
                            {translate('search.less')}
                        </Button>
                    )}
                {isFiltering &&
                    couldDoMore && (
                        <Button data-small={true} onClick={this.showMore}>
                            {translate('search.more')}
                        </Button>
                    )}
            </Section>
        );
    }

    private showMore = () => {
        this.setState((prevState: State) => ({ amountShown: prevState.amountShown + MultiSelectForm.showStep }));
    };

    private showLess = () => {
        this.setState((prevState: State) => ({ amountShown: prevState.amountShown - MultiSelectForm.showStep }));
    };
}

const mapStateToProps = (state: RootState) => ({
    filters: state.search.filters
});

const mapDispatchToProps = (dispatch: Dispatch<Props>) => ({
    updateField: (index: number, value: string, filters: EsFilter[]) => dispatch(toggleFilter(index, value, filters))
});

export default compose<SFC<Props>>(connect(mapStateToProps, mapDispatchToProps))(MultiSelectForm);
