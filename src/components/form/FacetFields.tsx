import React, { FormEvent, SFC } from 'react';
import styled from '../../styled-components';
import { NormalizedFacetConfig } from '../../typings/index';
import InputField from './fields/Input';
import { FacetConfig, FacetConfigType } from '../../typings/schema';
import { denormalizeFacetConfig, modifyFacetConfig } from '../../reducers/facetconfig';
import { connect } from 'react-redux';
import Select, { OptionProps } from './fields/Select';
import { SELECT_FACET_TYPES } from '../../constants/forms';

interface OwnProps {
    item: NormalizedFacetConfig;
}

interface DispatchProps {
    modify: (config: FacetConfig) => void;
}

type Props = OwnProps & DispatchProps;

const Container = styled.div`
    width: 100%;
`;

const Field = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;
`;

const Label = styled.label`
    flex: 2;
`;

const Value = styled.div`
    flex: 2;
`;

const FacetFields: SFC<Props> = ({ item, modify }) => (
    <Container>
        <Field>
            <Label htmlFor={`${item.id}_caption`}>Caption</Label>
            <Value>
                <InputField
                    name={`${item.id}_caption`}
                    value={item.caption!}
                    onChange={({ currentTarget: { value: caption } }: FormEvent<HTMLInputElement>) => (
                        modify(denormalizeFacetConfig({ ...item, caption }))
                    )}
                />
            </Value>
        </Field>
        <Field>
            <Label htmlFor={`${item.id}_type`}>Type</Label>
            <Value>
                <Select
                    name={`${item.id}_type`}
                    selected={SELECT_FACET_TYPES.find(({ value }) => value === item.type)}
                    options={SELECT_FACET_TYPES}
                    onChange={({ value }: OptionProps) => (
                        modify(denormalizeFacetConfig({ ...item, type: value as FacetConfigType }))
                    )}
                />
            </Value>
        </Field>
    </Container>
);

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modify: (modifiedItem: FacetConfig) => dispatch(modifyFacetConfig(id, modifiedItem))
});

export default connect(null, mapDispatchToProps)(FacetFields);