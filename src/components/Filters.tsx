import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Translations from '../services/Translations';
import MultiSelectForm from './form/MultiselectForm';
import styled from '../styled-components';
import { Title } from './layout/StyledCopy';
import { Dummy } from './Dummy';
import { Facet } from '../typings/timbuctoo/schema';

interface Props {
    facets: Facet[];
    filter: {
        values?: string;
    };
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

    static renderFilter (facet: Facet, idx: number) {
        return <MultiSelectForm key={idx} title={facet.caption} options={facet.options} />;
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
            <form onChange={() => this.onSubmit}>
                <SpecialDiv>
                    <Title>{Translations.translate('globals.filters')}</Title>
                    <Dummy text={'search-filter'} height={1} marginY={.5}/>
                    {this.props.facets && this.renderFilters()}
                    <MultiSelectForm title={'fakey'} options={[{ name: 'one', count: 4 }, { name: 'two', count: 5 }]}/>
                    <Dummy text={'filter hierarchy'} height={2} marginY={.5}/>
                    <Dummy text={'filter range'} height={5} marginY={.5}/>
                </SpecialDiv>
            </form>
        );
    }

    private renderFilters () {
        return this.props.facets.map(Filters.renderFilter);
    }
}

const mapStateToProps = state => ({
    filter: state.form.filter
});

export default connect(mapStateToProps, {})(Filters);