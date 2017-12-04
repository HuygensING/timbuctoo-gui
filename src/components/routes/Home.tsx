import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import FullHelmet from '../FullHelmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Col, Grid } from '../layout/Grid';
import Hero from '../hero/Hero';
import ListContent from '../lists/ListContent';
import GridSection from '../layout/GridSection';
import FeaturedContentBlock from '../featured/FeaturedContentBlock';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import About from '../About';
import { AboutMe, DataSetMetadata } from '../../typings/schema';
import translate from '../../services/translate';
import { getValue } from '../../services/getValue';
import { UserReducer } from '../../reducers/user';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import handleError from '../../services/handleError';

interface ApolloProps {
    data: {
        promotedDataSets: DataSetMetadata[];
        aboutMe: AboutMe;
    };
}

interface StateProps {
    user: UserReducer;
}

interface State {}

type FullProps = StateProps & ApolloProps;

class Home extends Component<FullProps, State> {
    renderFeatured(promoted: DataSetMetadata[]) {
        return (
            <GridSection title={translate('home.featured.title')} cols={5} colSizeOffset={2}>
                {this.renderFeaturedItems(promoted)}
            </GridSection>
        );
    }

    renderFeaturedItems(promoted: DataSetMetadata[]) {
        if (!promoted.length) {
            return <div>Loading</div>;
        }
        return promoted.map((props, idx: number) => <FeaturedContentBlock key={idx} {...props} {...this.props.user} />);
    }

    render() {
        const { promotedDataSets, aboutMe } = this.props.data;

        const heroDataSetPath: string | null = this.selectFirstSet();
        return (
            <Grid>
                <FullHelmet pageName="home" />
                <Hero
                    title={translate('home.hero.title')}
                    content={translate('home.hero.content')}
                    searchPath={heroDataSetPath}
                    buttonText={translate('home.hero.button')}
                    imgUrl={null}
                />

                {promotedDataSets && this.renderFeatured(promotedDataSets)}

                <ListContent
                    smOffset={3}
                    sm={20}
                    smPaddingY={1}
                    title={translate('home.recently_modified.title')}
                    data={promotedDataSets}
                />
                <ListContent
                    smOffset={2}
                    sm={20}
                    smPaddingY={1}
                    title={translate('home.most_popular.title')}
                    data={promotedDataSets}
                />

                <Col sm={48}>
                    {aboutMe && (
                        <About
                            title={aboutMe ? getValue(aboutMe.name) : null}
                            body={aboutMe ? getValue(aboutMe.personalInfo) : null}
                        />
                    )}
                </Col>
            </Grid>
        );
    }

    private selectFirstSet() {
        const { promotedDataSets } = this.props.data;

        if (promotedDataSets && promotedDataSets.length > 0) {
            const set = promotedDataSets[0];

            if (set.collectionList && set.collectionList.items.length > 0) {
                const collection = set.collectionList.items[0];
                return `${ROUTE_PATHS.search}/${set.dataSetId}/${collection.collectionId}`;
            }
        }

        return null;
    }
}

const query = gql`
    query Home {
        promotedDataSets {
            imageUrl {
                value
            }
            title {
                value
            }
            description {
                value
            }
            dataSetId
        }
        aboutMe {
            id
            name
            personalInfo
        }
    }
`;

const mapStateToProps = state => ({
    user: state.user
});

export default compose<ComponentType<{}>>(graphql(query), renderLoader(), handleError(), connect(mapStateToProps))(
    Home
);
