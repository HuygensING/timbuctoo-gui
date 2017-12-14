import React, { ChangeEvent, ComponentType, SFC } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { closestValue, EsFilter, EsRangeNumbers, toggleRange } from '../../reducers/search';
import styled, { withProps as withStyledProps } from '../../styled-components';
import InputOptionField from './fields/InputOptionField';
import { injectGlobal } from 'styled-components';
import theme from '../../theme/index';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { Subtitle } from '../layout/StyledCopy';
import { withHandlers, withState } from 'recompose';
import { lighten, darken } from 'polished';
import translate from '../../services/translate';

interface OwnProps {
    filter: EsFilter;
    index: number;
}

interface StateProps {
    filters: EsFilter[];
}

interface DispatchProps {
    updateField: (values: EsRangeNumbers, filters: EsFilter[]) => void;
}

interface MergedStateProps {
    rangeState: RangeState;
    setRangeState: (newRange: RangeState) => void;
}

type Props = OwnProps & StateProps & DispatchProps & MergedStateProps;

interface RangeState {
    min: number;
    max: number;
}

const InputContainer = styled.div`
    position: relative;
    z-index: 2;
    margin-top: -0.75rem;
`;

const BucketList = styled.ul`
    width: 100%;
    max-height: 10rem;
    position: relative;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
`;

const Fill = withStyledProps<{ selected: boolean }>(styled.div)`
    width: 100%;
    max-height: 100%;
    align-self: flex-end;
    transition: opacity .2s ease;
    background: ${props => props.theme.colors.shade.medium};
    opacity: ${props => (props.selected ? 1 : 0.5)};
`;

const Bucket = withStyledProps<{ selected: boolean }>(styled.li)`
  border: 1px solid ${props => props.theme.colors.white};
  display: flex;
  cursor: pointer;
  text-align: center;
  transition: background .2s ease;
  font: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.white};
  background: ${props => lighten(0.05, props.theme.colors.shade.light)};
  
  &:hover { 
      z-index: 1;   
      background: ${props => props.theme.colors.shade.light};
      
      > ${Fill} {
        background: ${props => darken(0.05, props.theme.colors.shade.medium)}
      }
   }
`;

const RangeContainer = styled.section`
    width: 100%;
    display: inline-block;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.shade.light};
`;

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

const DateRange: SFC<Props> = ({
    filter: { range, values, caption },
    filters,
    updateField,
    rangeState,
    setRangeState
}) => {
    const { gt, lt } = range!;
    const bucketWidth = 100 / values.length;
    const totalCount = values.map(val => val.count).reduce((next, curr) => next + curr);

    if (!values || values.length < 2) {
        return null;
    }

    const changeSingleValueHandler = (isMin: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
        const idx = closestValue(Number(e.currentTarget.value), values.map(val => val.name));

        if ((isMin && idx > lt) || (!isMin && idx < gt)) {
            return;
        }

        let value = { gt, lt };
        value[isMin ? 'gt' : 'lt'] = idx;
        updateField(value, filters);
    };

    const toggleBucketHandler = (idx: number, selected: boolean) => () => {
        let isMin: boolean = false;
        let value = { gt, lt };

        // selected
        if (!selected) {
            isMin = idx < gt;
            console.log(value);
            console.log('selecting');

            // deselected
        } else {
            // single out bucket
            if (idx > gt && idx < lt) {
                return updateField({ gt: idx, lt: idx }, filters);
            }

            isMin = closestValue(idx, [gt, lt]) === gt;

            idx = isMin ? idx + 1 : idx - 1;
        }

        // fix wrong overflow
        if ((isMin && idx > lt) || (!isMin && idx < gt)) {
            value = { gt: lt, lt: gt };
            isMin = !isMin;
        }

        value[isMin ? 'gt' : 'lt'] = idx;

        console.log('updated value', value);
        updateField(value, filters);
    };

    const changeSliderHandler = (value: { min: number; max: number }) => {
        updateField({ gt: value.min, lt: value.max }, filters);
    };

    return (
        <RangeContainer>
            <Subtitle>{caption}</Subtitle>
            <BucketList>
                {values.map((value, idx) => {
                    const selected: boolean = idx <= lt && idx >= gt;
                    return (
                        <Bucket
                            title={`Year ${value.name}, ${value.count} results`}
                            style={{ width: `${bucketWidth}%`, height: '10rem' }}
                            key={idx}
                            selected={selected}
                            onClick={toggleBucketHandler(idx, selected)}
                        >
                            <Fill
                                selected={selected}
                                style={{ width: '100%', height: `${value.count / totalCount * 100}%` }}
                            />
                        </Bucket>
                    );
                })}
            </BucketList>
            <InputContainer style={{ width: `${100 - bucketWidth}%`, left: `${bucketWidth / 2}%` }}>
                <InputRange
                    minValue={0}
                    maxValue={values.length - 1}
                    value={rangeState}
                    formatLabel={() => ''}
                    onChange={(newRange: RangeState) => setRangeState(newRange)}
                    onChangeComplete={changeSliderHandler}
                />
            </InputContainer>
            <InputOptionField
                title={translate('search.from')}
                value={values[gt].name}
                onChange={changeSingleValueHandler(true)}
            />
            <InputOptionField
                title={translate('search.to')}
                value={values[lt].name}
                onChange={changeSingleValueHandler(false)}
            />
        </RangeContainer>
    );
};

const mapStateToProps = (state: RootState) => ({
    filters: state.search.filters
});

const mapDispatchToProps = (dispatch: Dispatch<Props>, props: OwnProps & StateProps) => ({
    updateField: (values: EsRangeNumbers, filters: EsFilter[]) => dispatch(toggleRange(props.index, values, filters))
});

export default compose<ComponentType<OwnProps>>(
    connect(mapStateToProps, mapDispatchToProps),
    withState('rangeState', 'setRangeState', ({ filter: { range, values } }: OwnProps): RangeState => {
        return {
            min: range!.gt,
            max: range!.lt
        };
    }),
    withHandlers({
        changeState: ({ setRangeState }) => (newRange: EsRangeNumbers) => setRangeState(newRange)
    })
)(DateRange);
