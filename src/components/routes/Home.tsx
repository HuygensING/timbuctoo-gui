import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
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
import handleError from '../../services/handleError';
import { compose } from 'redux';
import { RootState } from '../../reducers/rootReducer';
import { withProps } from 'recompose';
import renderLoader from '../../services/renderLoader';

interface ApolloProps {
    data: {
        promotedDataSets: DataSetMetadata[];
        aboutMe: AboutMe;
    };
}

interface StateProps {
    user: UserReducer;
}

type FullProps = StateProps & ApolloProps & { firstSet: string | null } & RouteComponentProps<any>;

const Home: SFC<FullProps> = ({ data: { promotedDataSets, aboutMe }, user, firstSet }) => {
    return (
        <Grid>
            <FullHelmet pageName="home" />
            <Hero
                title={translate('home.hero.title')}
                content={translate('home.hero.content')}
                searchPath={firstSet}
                buttonText={translate('home.hero.button')}
                imgUrl={null}
            />

            {promotedDataSets && (
                <GridSection title={translate('home.featured.title')} cols={5} colSizeOffset={2}>
                    {promotedDataSets.map((props, idx: number) => (
                        <FeaturedContentBlock key={idx} {...props} {...user} />
                    ))}
                </GridSection>
            )}

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
};

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

const selectFirstSet = ({ data: { promotedDataSets } }: FullProps) => {
    let firstSet: string | null = null;

    if (promotedDataSets && promotedDataSets.length > 0) {
        const set = promotedDataSets[0];

        if (set.collectionList && set.collectionList.items.length > 0) {
            firstSet = `/${ROUTE_PATHS.search}/${set.dataSetId}/${set.collectionList.items[0].collectionId}`;
        }
    }

    return {
        firstSet: firstSet || null
    };
};

const mapStateToProps = (state: RootState) => ({
    user: state.user
});

export default compose<SFC<{}>>(
    graphql(query),
    renderLoader(),
    handleError(),
    withProps(selectFirstSet),
    connect(mapStateToProps)
)(Home);
