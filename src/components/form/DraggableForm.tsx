import React, { PureComponent } from 'react';

import { arrayMove } from 'react-sortable-hoc';
import DraggableList from '../DraggableList';
import { ComponentType } from '../../typings/index';
import formValuesConverter from '../../services/FormValuesConverter';
import { Fieldset } from '../../typings/Forms';
import { SubmitButton } from './FormElements';
import Accordeon from '../Accordeon';

interface Props {
    items: ComponentType[];
    form: string;
    onSend: (e: {}) => void;
}
interface State {
    fieldsets: Fieldset[];
    openedIndex: number | null;
}

class DraggableForm extends PureComponent<Props, State> {
    constructor (props: Props) {
        super(props);

        this.state = {
            fieldsets: formValuesConverter(props.items),
            openedIndex: null
        };

        this.resolveChange = this.resolveChange.bind(this);
        this.openCloseFn = this.openCloseFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd ({oldIndex, newIndex}: { oldIndex: number, newIndex: number }) {
        const fieldsets = arrayMove(this.state.fieldsets, oldIndex, newIndex);
        const openedIndex = oldIndex === this.state.openedIndex ? newIndex : this.state.openedIndex;

        this.setState({ fieldsets, openedIndex });
    }

    openCloseFn (idx: number) {

        this.setState({openedIndex: idx});
    }

    deleteFn (idx: number) {
        const openedIndex = null;

        const fieldsets = this.state.fieldsets.slice();
        fieldsets.splice(idx, 1);

        this.setState({fieldsets, openedIndex});
    }

    resolveChange (fieldset: Fieldset, idx: number) {
        const fieldsets = this.state.fieldsets.slice();
        fieldsets[idx] = fieldset;

        this.setState({fieldsets});
    }

    render () {
        const { fieldsets, openedIndex } = this.state;
        const componentProps = {
            openedIndex,
            openCloseFn: this.openCloseFn,
            onDeleteFn: this.deleteFn,
            resolveChange: this.resolveChange,
            deleteFn: this.deleteFn
        };

        return (
            <form onSubmit={this.props.onSend}>
                <div>
                    <DraggableList
                        Component={Accordeon}
                        componentProps={componentProps}

                        listItems={fieldsets}
                        onSortEnd={this.onSortEnd}
                        useDragHandle={true}
                    />
                    <SubmitButton type="submit">save</SubmitButton>
                </div>
            </form>
        );
    }
}

export default DraggableForm;