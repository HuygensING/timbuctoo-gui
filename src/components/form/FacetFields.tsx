import React, { FormEvent, SFC } from 'react';
import { NormalizedFacetConfig } from '../../typings/index';
import InputField from './fields/Input';
import { FacetConfig, FacetConfigType } from '../../typings/schema';
import { modifyFacetConfig } from '../../reducers/facetconfig';
import { connect } from 'react-redux';
import Select, { OptionProps } from './fields/Select';
import { SELECT_FACET_TYPES } from '../../constants/forms';
import ReferencePathSelector from './fields/ReferencePathSelector';
import { ButtonAdd } from '../layout/Button';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Field, FieldContainer, FieldLabel, FieldValue } from './fields/StyledField';

interface OwnProps {
    item: NormalizedFacetConfig;
}

interface DispatchProps {
    add: (facet: FacetConfig) => void;
    modify: (config: NormalizedFacetConfig) => void;
}

type Props = OwnProps & DispatchProps & RouteComponentProps<{ collection: string }>;

const FacetField = Field.extend`
    margin-top: 2rem;
    padding-top: 2.5rem;
    border-top: 1px solid ${props => props.theme.colors.shade.light};
`;

const FacetFields: SFC<Props> = ({ item, modify, match }) => {
    const onSelectChangeHandler = (newPaths: string[][], pathIdx: number) => {
        const modifiedItem: NormalizedFacetConfig = { ...item };
        modifiedItem.referencePaths[pathIdx] = newPaths;

        modify(modifiedItem);
    };

    const addPathHandler = () =>
        modify({ ...item, referencePaths: [...item.referencePaths, [[match.params.collection]]] });

    return (
        <FieldContainer>
            <Field>
                <FieldLabel htmlFor={`${item.id}_type`}>Type</FieldLabel>
                <FieldValue>
                    <Select
                        name={`${item.id}_type`}
                        selected={SELECT_FACET_TYPES.find(({ value }) => value === item.type)}
                        options={SELECT_FACET_TYPES}
                        onChange={({ value }: OptionProps) => modify({ ...item, type: value as FacetConfigType })}
                    />
                </FieldValue>
            </Field>
            <Field>
                <FieldLabel htmlFor={`${item.id}_caption`}>Caption</FieldLabel>
                <FieldValue>
                    <InputField
                        name={`${item.id}_caption`}
                        value={item.caption!}
                        onChange={({ currentTarget: { value: caption } }: FormEvent<HTMLInputElement>) =>
                            modify({ ...item, caption })
                        }
                    />
                </FieldValue>
            </Field>
            <FacetField>
                <FieldLabel htmlFor={`${item.id}_facets`}>Facets</FieldLabel>
                <FieldValue>
                    {item.referencePaths.map((paths, pathIdx) => (
                        <ReferencePathSelector
                            onChange={newPaths => onSelectChangeHandler(newPaths, pathIdx)}
                            paths={paths}
                            key={pathIdx}
                        />
                    ))}
                    <ButtonAdd type={'button'} onClick={addPathHandler}>
                        Add a path
                    </ButtonAdd>
                </FieldValue>
            </FacetField>
        </FieldContainer>
    );
};

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modify: (modifiedItem: NormalizedFacetConfig) => dispatch(modifyFacetConfig(id, modifiedItem))
});

export default compose<SFC<OwnProps>>(withRouter, connect(null, mapDispatchToProps))(FacetFields);
