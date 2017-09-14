import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import FormWrapper from './form/FormWrapper';
import MultiSelectForm from './form/MultiselectForm';
import styled from '../styled-components';
import { Title } from './layout/StyledCopy';
import { Dummy } from './Dummy';

interface Props {
    filter: any;
}
interface State {}

const SpecialDiv = styled.div``;

class Filters extends PureComponent<Props, State> {
    static createQueryString (values: {}) {
        const queryString = JSON.stringify(values);
        console.groupCollapsed('submitting Filter');
        console.log(queryString);
        console.groupEnd();
    }

    constructor () {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit () {
        const { values } = this.props.filter;

        if (!values) { return; }

        Filters.createQueryString(values);
    }

    render() {
        return (
            <FormWrapper form={'filter'} onChange={() => setTimeout(this.onSubmit)}>
                <SpecialDiv>
                    <Title>Filters</Title>
                    <Dummy text={'search-filter'} height={2} marginY={.5}/>
                    <MultiSelectForm title={'letters'} selection={['a' , 'b' , 'c']} />
                    <MultiSelectForm title={'numbers'} selection={['1' , '2' , '3']} />
                    <Dummy text={'filter hierarchy'} height={5} marginY={.5}/>
                    <Dummy text={'filter range'} height={5} marginY={.5}/>
                </SpecialDiv>
            </FormWrapper>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.form.filter
});

export default connect(mapStateToProps, {})(Filters);