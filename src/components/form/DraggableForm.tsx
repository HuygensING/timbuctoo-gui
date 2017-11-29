import React, { PureComponent, SFC } from 'react';

import DraggableList from '../DraggableList';
import { ConfigurableItem, NormalizedComponentConfig } from '../../typings/index';
import styled from '../../styled-components';
import { COMPONENTS, DRAGGABLE_COMPONENTS, EMPTY_FACET_CONFIG } from '../../constants/global';
import { ComponentConfig, FacetConfig } from '../../typings/schema';
import { SubmitButton } from './fields/Buttons';
import { addViewConfigNode, getNodeById, lastId, sortViewConfigChild } from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import { EMPTY_LEAF_COMPONENT } from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import { addFacetConfigItem, sortFacetConfigItem } from '../../reducers/facetconfig';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';

interface StateProps {
    items: ConfigurableItem[];
    lastId: number;
}

interface DispatchProps {
    addItem: (item: ComponentConfig | FacetConfig) => void;
    addChild: (childIndex: number) => void;
    sortItem: (oldIndex: number, newIndex: number) => void;
    removeItem: (id: number) => void;
}

interface OwnProps {
    onSend?: () => void;
    id: number;
    noForm?: boolean;
    maxItems?: number;
    configType: 'facet' | 'view';
}

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps<{ collection: string }>;

interface State {
    openedIndex: number | null;
}

const AddListButton = styled.button`
    width: 100%;
    border: 1px dashed ${props => props.theme.colors.shade.light};
    padding: 1rem 1.75rem;
    margin-bottom: 1.5rem;
    font: ${props => props.theme.fonts.title};
    text-align: right;
    cursor: pointer;
    border-radius: 0.25rem;

    &:hover {
        color: ${props => props.theme.colors.primary.medium};
        border-color: ${props => props.theme.colors.primary.light};
    }
`;

const StyledSubmitButton = SubmitButton.extend`
    max-width: 15rem;
    float: right;
`;

class DraggableForm extends PureComponent<Props, State> {
    state = {
        openedIndex: null
    };

    render() {
        return this.props.noForm ? this.renderContent() : <form onSubmit={this.onSubmit}>{this.renderContent()}</form>;
    }

    private openCloseFn = (idx: number) => {
        this.setState({ openedIndex: idx });
    };

    private renderContent() {
        const { openedIndex } = this.state;
        const { items, maxItems, configType } = this.props;
        const addIsAllowed = !maxItems || items.filter(item => !!item).length < maxItems;
        const componentProps = {
            openedIndex,
            openCloseFn: this.openCloseFn
        };

        return (
            <div>
                <DraggableList
                    componentType={DRAGGABLE_COMPONENTS.accordeon}
                    componentProps={componentProps}
                    listItems={items}
                    configType={configType}
                    useDragHandle={true}
                    onSortEnd={this.onSortEnd}
                />
                {addIsAllowed && (
                    <AddListButton type={'button'} onClick={this.addListItem}>
                        +
                    </AddListButton>
                )}
                {!this.props.noForm && <StyledSubmitButton type="submit">save</StyledSubmitButton>}
            </div>
        );
    }

    private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        this.setState(state => ({
            openedIndex: oldIndex === state.openedIndex ? newIndex : state.openedIndex
        }));
        this.props.sortItem(oldIndex, newIndex);
    };

    private addListItem = () => {
        const newItem = this.props.configType === 'view' ? EMPTY_LEAF_COMPONENT[COMPONENTS.path] : EMPTY_FACET_CONFIG;
        this.props.addItem(newItem);
    };

    private onSubmit = (e: any) => {
        e.preventDefault();

        if (this.props.onSend) {
            this.props.onSend();
        }
    };
}

const mapDispatchToProps = (dispatch, { id, configType, match }: Props) => {
    if (configType === 'view') {
        return {
            sortItem: (oldIndex: number, newIndex: number) => dispatch(sortViewConfigChild(id, oldIndex, newIndex)),
            addItem: (component: ComponentConfig) => dispatch(addViewConfigNode(component, match.params.collection, id))
        };
    } else {
        return {
            addItem: (facetConfig: FacetConfig, collectionId: string) =>
                dispatch(addFacetConfigItem(facetConfig, match.params.collection)),
            sortItem: (oldIndex: number, newIndex: number) => dispatch(sortFacetConfigItem(oldIndex, newIndex))
        };
    }
};

const mapStateToProps = (state: RootState, { id, configType }: Props) => {
    let items: ConfigurableItem[];
    if (configType === 'view') {
        const myNode: NormalizedComponentConfig = getNodeById(id, state.viewconfig)!;
        items = myNode.childIds.map(childId => getNodeById(childId, state.viewconfig)!);
    } else {
        items = state.facetconfig;
    }

    return {
        items,
        lastId: lastId(state.viewconfig)
    };
};

export default compose<SFC<OwnProps>>(withRouter, connect(mapStateToProps, mapDispatchToProps))(DraggableForm);
