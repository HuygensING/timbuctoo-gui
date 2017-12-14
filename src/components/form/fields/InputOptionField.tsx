import React, { SFC } from 'react';
import { compose } from 'redux';
import { withHandlers, withState } from 'recompose';
import { ChangeEvent } from 'react';
import styled, { css } from '../../../styled-components';

const InputStyling = css`
    border: 1px solid transparent;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    width: auto;
    max-width: 4rem;
    margin-left: 0.5rem;
`;

const Button = styled.button`
    ${InputStyling};
`;

const OptionField = styled.div`
    position: relative;
    cursor: pointer;
    font: ${props => props.theme.fonts.body};
    width: auto;
    max-width: 50%;
    float: left;
    transition: all 0.2s ease;

    &:not(:last-child) {
        left: -0.25rem;
    }

    &:last-child {
        float: right;
        right: -0.25rem;
    }
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
    title: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface StateProps {
    isActive: boolean;
    toggleState: () => void;
}

const Small = styled.span`
    color: ${props => props.theme.colors.shade.medium};
`;

type Props = OwnProps & StateProps;

const InputOptionField: SFC<Props> = ({ isActive, onChange, title, toggleState, value }) => (
    <OptionField>
        <Small>{title}</Small>
        {isActive ? (
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
        )}
    </OptionField>
);

export default compose<SFC<OwnProps>>(
    withState('isActive', 'toggleActive', false),
    withHandlers({
        toggleState: ({ toggleActive, isActive }) => () => toggleActive(!isActive)
    })
)(InputOptionField);
