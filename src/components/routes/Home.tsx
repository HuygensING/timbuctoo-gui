import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullHelmet from '../FullHelmet';

import { graphql, gql } from 'react-apollo';

import { Col, Grid } from '../layout/Grid';
import { DataSetProps } from '../../typings';
import { UserReducer } from '../../typings/store';

import Hero from '../hero/Hero';
import ListContent from '../lists/ListContent';
import { Dummy } from '../Dummy';
import GridSection from '../layout/GridSection';
import FeaturedContentBlock from '../featured/FeaturedContentBlock';
import { ROUTE_PATHS } from '../../constants/routeNaming';

import Translations from '../../services/Translations';

interface DataSets {
    promotedDataSets: DataSetProps[];
}

interface Props {
    user: UserReducer;
    data?: any;
    dataSets: DataSets;
}

interface State {
}

class Home extends Component<Props, State> {
    static defaults = {
        promotedDataSets: [],
        persons: {
            items: []
        }

    };

    renderFeatured (promoted: DataSetProps[]) {
        return (
            <GridSection title={Translations.translate('home.featured.title')} cols={5} colSizeOffset={2}>
                {this.renderFeaturedItems(promoted)}
            </GridSection>
        );
    }

    renderFeaturedItems (promoted: DataSetProps[]) {
        if (!promoted.length) { return <div>Loading</div>; }
        return promoted.map( (props, idx: number) => <FeaturedContentBlock key={idx} {...props} {...this.props.user} /> );
    }

    render () {
        const {promotedDataSets = Home.defaults.promotedDataSets} = this.props.data;

        return (
            <Grid>
                <FullHelmet pageName="home"/>
                <Hero
                    title={Translations.translate('home.hero.title')}
                    content={Translations.translate('home.hero.content')}
                    searchPath={ROUTE_PATHS.search}
                    buttonText={Translations.translate('home.hero.button')}
                />

                {promotedDataSets && this.renderFeatured(promotedDataSets)}

                <ListContent smOffset={3} sm={20} smPaddingY={1} title={Translations.translate('home.recently_modified.title')} data={promotedDataSets}/>
                <ListContent smOffset={2} sm={20} smPaddingY={1} title={Translations.translate('home.most_popular.title')} data={promotedDataSets}/>
                <Col sm={48}>
                    <Dummy text={'About Huygens'} height={10}/>
                </Col>
            </Grid>
        );
    }
}

const query = gql`
    query {
        promotedDataSets {
            imageUrl
            title
            description
            datasetId
        }
    }
`;

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(
    graphql(query)(Home)
);