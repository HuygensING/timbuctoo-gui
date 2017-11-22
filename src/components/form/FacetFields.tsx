import React, { FormEvent, SFC } from 'react';
import styled from '../../styled-components';
import { NormalizedFacetConfig } from '../../typings/index';
import InputField from './fields/Input';
import { FacetConfig, FacetConfigType } from '../../typings/schema';
import { modifyFacetConfig } from '../../reducers/facetconfig';
import { connect } from 'react-redux';
import Select, { OptionProps } from './fields/Select';
import { SELECT_FACET_TYPES } from '../../constants/forms';
import ReferencePathSelector from './fields/ReferencePathSelector';

interface OwnProps {
    item: NormalizedFacetConfig;
}

interface DispatchProps {
    add: (facet: FacetConfig) => void;
    modify: (config: NormalizedFacetConfig) => void;
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

const FacetFields: SFC<Props> = ({ item, modify }) => {
    const onSelectChangeHandler = (newPaths: string[][], pathIdx: number) => {
        const modifiedItem: NormalizedFacetConfig = { ...item };
        modifiedItem.referencePaths[pathIdx] = newPaths;

        modify(modifiedItem);
    };

    return (
        <Container>
            <Field>
                <Label htmlFor={`${item.id}_type`}>Type</Label>
                <Value>
                    <Select
                        name={`${item.id}_type`}
                        selected={SELECT_FACET_TYPES.find(({ value }) => value === item.type)}
                        options={SELECT_FACET_TYPES}
                        onChange={({ value }: OptionProps) => (
                            modify({ ...item, type: value as FacetConfigType })
                        )}
                    />
                </Value>
            </Field>
            <Field>
                <Label htmlFor={`${item.id}_caption`}>Caption</Label>
                <Value>
                    <InputField
                        name={`${item.id}_caption`}
                        value={item.caption!}
                        onChange={({ currentTarget: { value: caption } }: FormEvent<HTMLInputElement>) => (
                            modify({ ...item, caption })
                        )}
                    />
                </Value>
            </Field>
            <Field>
                <Label htmlFor={`${item.id}_facets`}>Facets</Label>
                <Value>
                    {
                        item.referencePaths.map((paths, pathIdx) => (
                            <ReferencePathSelector
                                onChange={newPaths => onSelectChangeHandler(newPaths, pathIdx)}
                                paths={paths}
                                key={pathIdx}
                            />
                        ))
                    }
                </Value>
            </Field>
        </Container>
    );
};

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modify: (modifiedItem: NormalizedFacetConfig) => dispatch(modifyFacetConfig(id, modifiedItem))
});

export default connect<never, DispatchProps, OwnProps>(null, mapDispatchToProps)(FacetFields);