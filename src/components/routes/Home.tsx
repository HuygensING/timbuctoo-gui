import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Col, Grid } from '../layout/Grid';

import Hero from '../hero/Hero';
import ListContent from '../lists/ListContent';
import { Dummy } from '../Dummy';
import GridSection from '../layout/GridSection';
import FeaturedContentBlock from '../featured/FeaturedContentBlock';
import { ROUTE_PATHS } from '../../constants/routeNaming';

import NameParser from '../../services/TimbuctooNamesParser';

interface DataSet {
    caption: string;
    description?: string;
    imageUrl?: string;
    graphqlUrl: string;
}

interface DataSets {
    all: DataSet[];
    promoted: DataSet[];
}

interface Props {
    data?: any;
    dataSets: DataSets;
}

interface State {
}

interface NameProps {
    type?: string;
    value: string;
}

interface TimNames {
    items: NameProps[];
}

class Home extends Component<Props, State> {
    static defaultSets = {promoted: [], all: []};
    
    static defaultPersons = {items: []};
    static defaultPersonName: {tim_names: TimNames};

    static renderFeatured (promoted: DataSet[]) {
        return (
            <GridSection title="Featured datasets" cols={promoted.length} colSizeOffset={2}>
                {Home.renderFeaturedItems(promoted)}
            </GridSection>
        );
    }

    static renderFeaturedItems (promoted: DataSet[]) {
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
        const {dataSets = Home.defaultSets} = this.props.data;
        const {clusius_PersonsList = Home.defaultPersons} = this.props.data;

        return (
            <Grid>
                <FullHelmet pageName="home"/>
                <Hero searchPath={ROUTE_PATHS.search}/>

                {dataSets.promoted.length > 2 && Home.renderFeatured(dataSets.promoted)}

                <ListContent smOffset={3} sm={20} smPaddingY={1} title="Recently modified" data={dataSets.all}/>
                <ListContent smOffset={2} sm={20} smPaddingY={1} title="Most Popular" data={dataSets.promoted}/>
                    
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

// const query = gql`
//     query {
//         dataSets {
//             promoted {
//                 caption
//                 description
//                 imageUrl
//             }
//             all {
//                 caption
//                 description
//                 imageUrl
//             }
//         }
//     }
// `;

const query = gql`
    query {
        clusius_PersonsList {
            prevCursor
            nextCursor
            items {
                tim_gender{value}
                tim_birthDate{value}
                tim_deathDate{value}
                tim_names {
                    items {
                        value
                    }
                }
            }
        }
    }
`;

export default graphql(query)(Home);