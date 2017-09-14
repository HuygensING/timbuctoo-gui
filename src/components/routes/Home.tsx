import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Col, Grid } from '../layout/Grid';
import { DataSetProps } from '../../typings';

import Hero from '../hero/Hero';
import ListContent from '../lists/ListContent';
import { Dummy } from '../Dummy';
import GridSection from '../layout/GridSection';
import FeaturedContentBlock from '../featured/FeaturedContentBlock';
import { ROUTE_PATHS } from '../../constants/routeNaming';

import NameParser from '../../services/TimbuctooNamesParser';

interface DataSets {
    promotedDataSets: DataSetProps[];
}

interface Props {
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

    static renderFeatured (promoted: DataSetProps[]) {
        return (
            <GridSection title="Featured datasets" cols={promoted.length} colSizeOffset={2}>
                {Home.renderFeaturedItems(promoted)}
            </GridSection>
        );
    }

    static renderFeaturedItems (promoted: DataSetProps[]) {
        if (!promoted.length) {
            return <div>Loading</div>;
        }

        return promoted.map(
            (set, idx: number) => <FeaturedContentBlock key={idx} {...set} />
        );
    }

    static renderName( items: Array<any> ) {
        const persons = items.map( (person, index) => {
            const fullName = NameParser.getFullName( person.tim_names );
            if (fullName) {
                return <p key={index}>{`${fullName.firstName && fullName.firstName || ''} ${fullName.middleName && fullName.middleName || ''} ${fullName.lastName && fullName.lastName || ''}`}</p>;
            } else {
                return null;
            }
        });
        return persons;
    }

    render () {
        const {promotedDataSets = Home.defaults.promotedDataSets} = this.props.data;
        const {clusius_PersonsList = Home.defaults.persons} = this.props.data;

        return (
            <Grid>
                <FullHelmet pageName="home"/>
                <Hero
                    title={'We care for your data'}
                    content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur cumque dolorem doloribus esse exercitationem fugit molestias possimus recusandae vitae?'}
                    searchPath={ROUTE_PATHS.search}
                    buttonText={'Search datasets'}
                />

                {promotedDataSets.length > 2 && Home.renderFeatured(promotedDataSets)}

                <ListContent smOffset={3} sm={20} smPaddingY={1} title="Recently modified" data={promotedDataSets}/>
                <ListContent smOffset={2} sm={20} smPaddingY={1} title="Most Popular" data={promotedDataSets}/>
                    
                {clusius_PersonsList.items.length > 0 && (
                    <Col>
                        {Home.renderName(clusius_PersonsList.items)}
                    </Col>
                )}

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

export default graphql(query)(Home);