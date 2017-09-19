import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullHelmet from '../FullHelmet';

import { graphql, gql } from 'react-apollo';

import { Col, Grid } from '../layout/Grid';
import { UserReducer } from '../../typings/store';

import Hero from '../hero/Hero';
import ListContent from '../lists/ListContent';
import GridSection from '../layout/GridSection';
import FeaturedContentBlock from '../featured/FeaturedContentBlock';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import About from '../About';
import { AboutMe, DataSetMetadata } from '../../typings/timbuctoo/schema';

import Translations from '../../services/Translations';

interface ApolloProps {
    data: {
      promotedDataSets: DataSetMetadata[];
      aboutMe: AboutMe;
    };
}

interface Props {
    user: UserReducer;
}

interface State {
}

class Home extends Component<Props & ApolloProps, State> {
    static defaultProps = {
      data: {
          promotedDataSets: [],
          aboutMe: {
              name:  null,
              personalInfo: null
          }
      }
    };

    renderFeatured (promoted: DataSetMetadata[]) {
        return (
            <GridSection title={Translations.translate('home.featured.title')} cols={5} colSizeOffset={2}>
                {this.renderFeaturedItems(promoted)}
            </GridSection>
        );
    }

    renderFeaturedItems (promoted: DataSetMetadata[]) {
        if (!promoted.length) { return <div>Loading</div>; }
        return promoted.map( (props, idx: number) => <FeaturedContentBlock key={idx} {...props} {...this.props.user} /> );
    }

    render () {
        const {promotedDataSets, aboutMe} = this.props.data;

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
                    {aboutMe && <About title={aboutMe ? aboutMe.name : null} body={aboutMe ? aboutMe.personalInfo : null} />}
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
        aboutMe {
            name
            personalInfo
        }
    }
`;

const mapStateToProps = (state) => ({
    user: state.user
});

export default graphql(query)(
    connect(mapStateToProps)(Home)
);