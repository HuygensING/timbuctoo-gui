import React, { ChangeEvent, ComponentType, PureComponent } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { EsFilter, EsValue, toggleRange } from '../../reducers/search';
import styled, { withProps as withStyledProps } from '../../styled-components';
import InputOptionField from './fields/InputOptionField';
import { injectGlobal } from 'styled-components';
import theme from '../../theme/index';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { Subtitle } from '../layout/StyledCopy';
import { withProps } from 'recompose';

interface OwnProps {
    filter: EsFilter;
    index: number;
}

interface StateProps {
    filters: EsFilter[];
}

interface MergeProps {
    range: [number, number];
}

interface DispatchProps {
    updateField: (values: [number, number], filters: EsFilter[]) => void;
}

type Props = OwnProps & StateProps & DispatchProps & MergeProps;

const InputContainer = styled.div`
    position: relative;
    z-index: 2;
`;

const BucketList = styled.ul`
    width: 100%;
    max-height: 10rem;
    position: relative;
    bottom: -0.5rem;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
`;

const Bucket = withStyledProps<{ selected: boolean }>(styled.li)`
  border: 1px solid ${props => props.theme.colors.white};
  cursor: pointer;
  text-align: center;
  transition: background .2s ease;
  font: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.white};
  background: ${props => (props.selected ? props.theme.colors.shade.medium : props.theme.colors.shade.light)};
  
  &:hover { 
      z-index: 1;   
      background: ${props => props.theme.colors.shade.dark};
   }
`;

const RangeContainer = styled.section`
    width: 100%;
    display: inline-block;
`;

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

class DateRange extends PureComponent<Props, {}> {
    changeSingleValue = (isMin: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
        const [min, max] = this.props.range;
        const val = this.closestValue(Number(e.currentTarget.value), this.props.filter.values.map(value => value.name));

        if ((isMin && val > max) || (!isMin && val < min)) {
            return;
        }

        const newRange = [...this.props.range];
        newRange.splice(isMin ? 0 : 1, 1, val);

        this.props.updateField(newRange as [number, number], this.props.filters);
    };

    onToggleBucket = (idx: number, selected: boolean) => () => {
        const [min, max] = this.props.range;
        let isMin: boolean = false;
        let value = [...this.props.range];

        // select
        if (!selected) {
            isMin = idx < min;

            // deselect
        } else {
            if (idx > min && idx < max) {
                return this.props.updateField([idx, idx], this.props.filters);
            }

            isMin = this.closestValue(idx, [min, max]) === min;
            idx = isMin ? idx + 1 : idx - 1;
        }

        // fix wrong overflow
        if ((isMin && idx > max) || (!isMin && idx < min)) {
            value = [max, min];
            isMin = !isMin;
        }

        value.splice(isMin ? 0 : 1, 1, idx);

        this.props.updateField(value as [number, number], this.props.filters);
    };

    onChangeSlider = (value: { min: number; max: number }) => {
        this.props.updateField([value.min, value.max], this.props.filters);
    };

    render() {
        const { values, caption } = this.props.filter;
        const [min, max] = this.props.range;
        const bucketWidth = 100 / values.length;
        const totalCount = values.map(val => val.count).reduce((next, curr) => next + curr);

        if (!values || values.length < 2) {
            return null;
        }

        console.log(this.props.range);

        return (
            <RangeContainer>
                <Subtitle>{caption}</Subtitle>
                <BucketList>
                    {values.map((value, idx) => {
                        const selected: boolean = idx <= max && idx >= min;
                        return (
                            <Bucket
                                style={{ width: `${bucketWidth}%`, height: `${value.count / totalCount * 10}rem` }}
                                key={idx}
                                selected={selected}
                                onClick={this.onToggleBucket(idx, selected)}
                            >
                                {value.count}
                            </Bucket>
                        );
                    })}
                </BucketList>
                <InputContainer style={{ width: `${100 - bucketWidth}%`, left: `${bucketWidth / 2}%` }}>
                    <InputRange
                        minValue={0}
                        maxValue={values.length - 1}
                        value={{ min, max }}
                        formatLabel={() => ''}
                        onChange={this.onChangeSlider}
                    />
                </InputContainer>
                <InputOptionField value={values[min].name} onChange={this.changeSingleValue(true)} />
                <InputOptionField value={values[max].name} onChange={this.changeSingleValue(false)} />
            </RangeContainer>
        );
    }

    private closestValue = (input: number, arr: Array<number | string>): number => {
        let value: number = 0;
        let lastDelta: number;

        arr.some((step: number | string, index: number) => {
            const delta = Math.abs(input - Number(step));
            if (delta >= lastDelta) {
                return true;
            }
            value = index;
            lastDelta = delta;
            return false;
        });

        return value;
    };
}

const getOutline = (arr: EsValue[]): [number, number] => {
    let first = 0;
    let last = arr.length - 1;
    for (const [idx, val] of arr.entries()) {
        if (val.selected) {
            if (first === 0) {
                first = idx;
            } else {
                last = idx;
            }
        }
    }

    return [first, last];
};

const mapStateToProps = (state: RootState) => ({
    filters: state.search.filters
});

const mapDispatchToProps = (dispatch: Dispatch<Props>, props: OwnProps & StateProps) => ({
    updateField: (values: [number, number], filters: EsFilter[]) => dispatch(toggleRange(props.index, values, filters))
});

export default compose<ComponentType<OwnProps>>(
    withProps((props: OwnProps) => ({
        range: getOutline(props.filter.values)
    })),
    connect(mapStateToProps, mapDispatchToProps)
)(DateRange);
