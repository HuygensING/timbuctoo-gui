import React, { SFC } from 'react';
import { compose } from 'redux';
import InputRange from 'react-input-range';
import { withHandlers, withState } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { EsFilter, EsRangeIndexProps, toggleRange } from '../../../reducers/search';

interface OwnProps {
    maxValue: number;
    filters: EsFilter[];
    index: number;
}

interface DispatchProps {
    updateField: (values: { gt: number; lt: number }) => void;
}

interface RangeState {
    min: number;
    max: number;
}

interface StateProps {
    rangeState: RangeState;
    setRangeState: (newRange: RangeState) => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const InputRangeSlider: SFC<Props> = ({ maxValue, updateField, rangeState, setRangeState }) => {
    const changeSliderHandler = (value: { min: number; max: number }) => {
        updateField({ gt: value.min, lt: value.max });
    };

    return (
        <InputRange
            minValue={0}
            maxValue={maxValue}
            value={rangeState}
            formatLabel={() => ''}
            onChange={(newRange: RangeState) => setRangeState(newRange)}
            onChangeComplete={changeSliderHandler}
        />
    );
};

const mapDispatchToProps = (dispatch: Dispatch<Props>, { index, filters }: OwnProps) => ({
    updateField: (values: { gt: number; lt: number }) => dispatch(toggleRange(index, values, filters))
});

export default compose<SFC<OwnProps>>(
    connect(null, mapDispatchToProps),
    withState('rangeState', 'setRangeState', ({ filters, index }: OwnProps & StateProps): RangeState => {
        return {
            min: filters[index].range!.gt,
            max: filters[index].range!.lt
        };
    }),
    withHandlers({
        changeState: ({ setRangeState }) => (newRange: EsRangeIndexProps) => setRangeState(newRange)
    })
)(InputRangeSlider);
