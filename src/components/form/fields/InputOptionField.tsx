import React, { SFC } from 'react';
import { compose } from 'redux';
import { withHandlers, withState } from 'recompose';
import { ChangeEvent } from 'react';
import styled, { css } from '../../../styled-components';

const InputStyling = css`
    border: 1px solid transparent;
    position: relative;
    cursor: pointer;
    font: ${props => props.theme.fonts.body};
    padding: 0.25rem;
    border-radius: 0.25rem;
    width: auto;
    max-width: 4rem;
    float: left;
    transition: all 0.2s ease;

    &:not(:last-child) {
        left: -1rem;
    }

    &:last-child {
        float: right;
        right: -1rem;
    }
`;

const Button = styled.button`
    ${InputStyling};
`;

const Input = styled.input`
    ${InputStyling};
    border-color: ${props => props.theme.colors.shade.light};

    &:focus {
        outline: 0;
        border-color: ${props => props.theme.colors.shade.medium};
    }
`;

interface OwnProps {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface StateProps {
    isActive: boolean;
    toggleState: () => void;
}

type Props = OwnProps & StateProps;

const InputOptionField: SFC<Props> = ({ isActive, onChange, toggleState, value }) =>
    isActive ? (
        <Input
            type="number"
            defaultValue={String(value)}
            onChange={onChange}
            onBlur={toggleState}
            onMouseOut={toggleState}
        />
    ) : (
        <Button type={'button'} onClick={toggleState}>
            {String(value)}
        </Button>
    );

export default compose<SFC<OwnProps>>(
    withState('isActive', 'toggleActive', false),
    withHandlers({
        toggleState: ({ toggleActive, isActive }) => () => toggleActive(!isActive)
    })
)(InputOptionField);
