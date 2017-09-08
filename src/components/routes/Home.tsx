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

class Home extends Component<Props, State> {
    static defaultSets = {promoted: [], all: []};

    static renderFeatured (promoted: DataSet[]) {
        return (
            <GridSection title="test" cols={promoted.length} colSizeOffset={2}>
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

    render () {
        const {dataSets = Home.defaultSets} = this.props.data;

        return (
            <Grid>
                <FullHelmet pageName="home"/>
                <Hero search={true}/>

                {dataSets.promoted.length > 2 && Home.renderFeatured(dataSets.promoted)}

                <ListContent smOffset={3} sm={20} smPaddingY={1} title="Recently modified" data={dataSets.all}/>
                <ListContent smOffset={2} sm={20} smPaddingY={1} title="Most Popular" data={dataSets.promoted}/>

                <Col sm={48}>
                    <Dummy text={'About Huygens'} height={10}/>
                </Col>
            </Grid>
        );
    }
}

const query = gql`
    query {
        dataSets {
            promoted {
                caption
                description
                imageUrl
            }
            all {
                caption
                description
                imageUrl
            }
        }
    }
`;

// const query = gql`
//     query {
//         clusius_Persons(uri: "http://timbuctoo.huygens.knaw.nl/datasets/clusius/Persons_PE00004638") {
//             tim_hasDeathPlace{
//                 tim_name{value}
//                 tim_country{value}
//             }
//             tim_deathDate {value}
//             tim_gender {value}
//         }
//     }
// `;

// const query = gql`
//     query {
//         clusius_Places(uri:"http://timbuctoo.huygens.knaw.nl/datasets/clusius/Place_PL00000001") {
//             tim_name{value}
//         }
//     }
// `;

export default graphql(query)(Home);