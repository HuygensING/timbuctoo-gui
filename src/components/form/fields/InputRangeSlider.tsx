import React, { SFC } from 'react';
import { compose } from 'redux';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import { withHandlers, withState } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { EsFilter, EsRangeIndex, EsRangeIndexProps, toggleRange } from '../../../reducers/search';
import { injectGlobal } from 'styled-components';
import theme from '../../../theme/index';

interface OwnProps {
    maxValue: number;
    filters: EsFilter[];
    index: number;
}

interface DispatchProps {
    updateField: (values: EsRangeIndex) => void;
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

// Needed for styling of range slider
(() => injectGlobal`  
  .input-range__track {
    background: ${theme.colors.shade.medium};
  }
  .input-range__slider, .input-range__track--active { 
    background: ${theme.colors.black}; 
  }
  
  .input-range__slider {
    border-color: ${theme.colors.black};
  }
`)();

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
    updateField: (values: EsRangeIndex) => dispatch(toggleRange(index, values, filters))
});

export default compose<SFC<OwnProps>>(
    connect(null, mapDispatchToProps),
    withState('rangeState', 'setRangeState', ({ filters, index }: OwnProps & StateProps): RangeState => ({
        min: filters[index].range!.gt,
        max: filters[index].range!.lt
    })),
    withHandlers({
        changeState: ({ setRangeState }) => (newRange: EsRangeIndexProps) => setRangeState(newRange)
    })
)(InputRangeSlider);
